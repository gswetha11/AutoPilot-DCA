import React, { useState, useCallback } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { Wallet, Loader2, AlertCircle } from 'lucide-react';
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';

const WalletConnect: React.FC = () => {
  const { account, connected, disconnect, connecting, connect, wallet } = useWallet();
  const [error, setError] = useState<string | null>(null);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleConnect = useCallback(async () => {
    try {
      setError(null);
      if (!wallet) {
        setError('Please select a wallet first');
        return;
      }
      await connect();
    } catch (err) {
      console.error('Connection error:', err);
      setError('Failed to connect wallet');
    }
  }, [wallet, connect]);

  const handleDisconnect = async () => {
    try {
      setIsDisconnecting(true);
      setError(null);
      await disconnect();
    } catch (err) {
      console.error('Disconnect error:', err);
      setError('Failed to disconnect wallet');
    } finally {
      setIsDisconnecting(false);
    }
  };

  if (connecting) {
    return (
      <div className="flex items-center space-x-2 bg-[#1a1b26] px-4 py-2 rounded-lg border border-[#2a2b36]">
        <Loader2 className="h-4 w-4 text-purple-400 animate-spin" />
        <span className="text-sm text-purple-400">Connecting...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
        <AlertCircle className="h-4 w-4 text-red-400" />
        <span className="text-sm text-red-400">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {connected && account ? (
        <>
          <div className="flex items-center space-x-2 bg-[#1a1b26] px-4 py-2 rounded-lg border border-[#2a2b36]">
            <Wallet className="h-4 w-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">
              {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </span>
          </div>
          <button
            onClick={handleDisconnect}
            disabled={isDisconnecting}
            className="text-sm text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 flex items-center space-x-1"
          >
            {isDisconnecting && <Loader2 className="h-3 w-3 animate-spin" />}
            <span>Disconnect</span>
          </button>
        </>
      ) : (
        <div className="relative">
          <WalletSelector 
            onWalletSelect={handleConnect}
            buttonClassName="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30"
          />
        </div>
      )}
    </div>
  );
};

export default WalletConnect;