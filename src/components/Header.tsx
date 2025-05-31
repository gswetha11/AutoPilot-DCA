import React from 'react';
import { Coins, Bell, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#1a1f2e]/80 backdrop-blur-lg border-b border-[#2a324b]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Coins className="h-8 w-8 text-success" />
          <div>
            <h1 className="text-xl font-bold text-white">
              AutoPilot DCA
            </h1>
            <p className="text-xs text-gray-400">Smart Crypto Buyer</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-xl hover:bg-[#2a324b] transition-colors">
            <Bell className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-xl hover:bg-[#2a324b] transition-colors">
            <Settings className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;