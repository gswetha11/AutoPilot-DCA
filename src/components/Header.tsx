import React from 'react';
import { Coins, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#1a1b26]/80 backdrop-blur-lg border-b border-[#2a2b36]">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Coins className="h-8 w-8 text-purple-400" />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              AutoPilot DCA
            </h1>
            <p className="text-xs text-gray-400">Smart Crypto Buyer</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-[#2a2b36] transition-colors">
          <Settings className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;