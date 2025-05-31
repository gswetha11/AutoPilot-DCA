import React from 'react';
import { Token, Prediction } from '../types';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import ConfidenceGauge from './ConfidenceGauge';

interface TokenCardProps {
  token: Token;
  prediction: Prediction | null;
  lastAction?: {
    type: 'buy' | 'hold' | 'stake';
    timestamp: string;
    amount?: number;
  };
}

const TokenCard: React.FC<TokenCardProps> = ({ token, prediction, lastAction }) => {
  if (!prediction) {
    return (
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{token}</h3>
          <AlertCircle className="h-5 w-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-400">No prediction available</p>
      </div>
    );
  }

  const { marketSentiment, confidence, logReturn } = prediction;
  const isPositive = marketSentiment === 'bullish';
  
  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          {token}
        </h3>
        <div className={`p-2 rounded-full ${
          marketSentiment === 'bullish' ? 'bg-emerald-400/20 text-emerald-400' :
          marketSentiment === 'bearish' ? 'bg-red-400/20 text-red-400' :
          'bg-amber-400/20 text-amber-400'
        }`}>
          {marketSentiment === 'bullish' ? <TrendingUp className="h-5 w-5" /> : 
           marketSentiment === 'bearish' ? <TrendingDown className="h-5 w-5" /> :
           <AlertCircle className="h-5 w-5" />}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">Log Return</p>
          <p className={`text-lg font-semibold ${
            logReturn && logReturn > 0 ? 'text-emerald-400' :
            logReturn && logReturn < 0 ? 'text-red-400' : 'text-gray-300'
          }`}>
            {logReturn ? `${(logReturn * 100).toFixed(2)}%` : 'N/A'}
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <p className="text-sm text-gray-400">Confidence</p>
            <p className="text-sm font-medium text-gray-300">
              {(confidence * 100).toFixed(0)}%
            </p>
          </div>
          <ConfidenceGauge confidence={confidence} />
        </div>

        {lastAction && (
          <div className="pt-4 border-t border-[#2a2b36]">
            <p className="text-sm text-gray-400">Last Action</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm font-medium text-gray-300">
                {lastAction.type.toUpperCase()}
                {lastAction.amount && ` • $${lastAction.amount}`}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(lastAction.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenCard;