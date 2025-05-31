import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { Wallet } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const { account, connected } = useWallet();

  return (
    <div className="flex items-center space-x-4">
      {connected && account ? (
        <div className="flex items-center space-x-2">
          <Wallet className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-emerald-400">
            {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </span>
        </div>
      ) : (
        <WalletSelector />
      )}
    </div>
  );
};

export default WalletConnect;