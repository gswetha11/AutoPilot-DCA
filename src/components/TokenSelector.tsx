import React from 'react';
import { useDCA } from '../context/DCAContext';
import { TOKENS } from '../services/api';
import { TimeFrame } from '../types';

const TokenSelector: React.FC = () => {
  const { selectedToken, setSelectedToken, settings, updateSettings } = useDCA();

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center space-x-2">
        <label htmlFor="token" className="text-sm font-medium text-gray-300">
          Select Asset:
        </label>
        <select
          id="token"
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value as keyof typeof TOKENS)}
          className="bg-[#1a1f2e] border border-[#2a324b] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent text-gray-200"
        >
          {Object.entries(TOKENS).map(([symbol, data]) => (
            <option key={symbol} value={symbol}>
              {data.name} ({symbol})
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="timeframe" className="text-sm font-medium text-gray-300">
          Timeframe:
        </label>
        <select
          id="timeframe"
          value={settings.timeframe}
          onChange={(e) => updateSettings({ timeframe: e.target.value as TimeFrame })}
          className="bg-[#1a1f2e] border border-[#2a324b] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent text-gray-200"
        >
          <option value="5m">5 Minutes</option>
          <option value="8h">8 Hours</option>
        </select>
      </div>
    </div>
  );
};

export default TokenSelector;