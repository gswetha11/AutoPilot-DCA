import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { Wallet } from 'lucide-react';
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';

const WalletConnect: React.FC = () => {
  const { account, connected, disconnect } = useWallet();

  if (!connected) {
    return (
      <button className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-colors border border-purple-500/30">
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 bg-[#1a1b26] px-4 py-2 rounded-lg border border-[#2a2b36]">
        <Wallet className="h-4 w-4 text-emerald-400" />
        <span className="text-sm text-emerald-400">
          {account?.address.slice(0, 6)}...{account?.address.slice(-4)}
        </span>
      </div>
      <button
        onClick={disconnect}
        className="text-sm text-red-400 hover:text-red-300 transition-colors"
      >
        Disconnect
      </button>
    </div>
  );
};

export default WalletConnect;