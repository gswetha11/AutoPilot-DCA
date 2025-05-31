import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import { Wallet } from 'lucide-react';

const WalletConnect: React.FC = () => {
  const { connected, account, disconnect } = useWallet();

  if (connected && account) {
    return (
      <button 
        onClick={() => disconnect()}
        className="flex items-center space-x-2 bg-[#1a1b26] px-4 py-2 rounded-lg border border-[#2a2b36] hover:bg-[#2a2b36] transition-colors"
      >
        <Wallet className="h-4 w-4 text-emerald-400" />
        <span className="text-sm text-emerald-400">
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </span>
      </button>
    );
  }

  return (
    <WalletSelector 
      buttonClassName="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-colors border border-purple-500/30 font-medium flex items-center space-x-2"
      displayMode="list"
      listClassName="absolute right-0 mt-2 w-56 bg-[#1a1b26] border border-[#2a2b36] rounded-lg shadow-lg overflow-hidden"
      buttonContent={
        <div className="flex items-center space-x-2">
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </div>
      }
    />
  );
};

export default WalletConnect;