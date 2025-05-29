import React from 'react';
import { useDCA } from '../context/DCAContext';
import { TokenData } from '../types';
import { TOKENS } from '../services/aptos';

const TokenSelector: React.FC = () => {
  const { selectedToken, setSelectedToken } = useDCA();

  return (
    <div className="flex items-center space-x-4 mb-6">
      <label htmlFor="token" className="text-sm font-medium text-neon-blue">
        Select Asset:
      </label>
      <select
        id="token"
        value={selectedToken}
        onChange={(e) => setSelectedToken(e.target.value as TokenData['symbol'])}
        className="bg-black border border-neon-blue rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent text-neon-blue"
      >
        {Object.values(TOKENS).map((token) => (
          <option key={token.symbol} value={token.symbol}>
            {token.name} ({token.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default TokenSelector