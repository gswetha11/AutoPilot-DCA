import React, { useState, useEffect } from 'react';
import { useDCA } from '../context/DCAContext';
import { usePrediction } from '../context/PredictionContext';
import { DollarSign, Bot, Wallet } from 'lucide-react';

interface SimulatedTrade {
  timestamp: string;
  action: 'BUY' | 'HOLD';
  amount: number;
  confidence: number;
  token: string;
}

const AutoDCASimulator: React.FC = () => {
  const { settings } = useDCA();
  const { currentPrediction } = usePrediction();
  const [isLive, setIsLive] = useState(false);
  const [trades, setTrades] = useState<SimulatedTrade[]>([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    if (!isLive || !currentPrediction) return;

    const interval = setInterval(() => {
      const shouldBuy = currentPrediction.confidence >= (settings.confidenceThreshold / 100);
      const scaledAmount = shouldBuy
        ? settings.investmentAmount * (currentPrediction.confidence * 1.5)
        : 0;

      if (shouldBuy) {
        const trade: SimulatedTrade = {
          timestamp: new Date().toISOString(),
          action: 'BUY',
          amount: scaledAmount,
          confidence: currentPrediction.confidence,
          token: currentPrediction.token
        };

        setTrades(prev => [trade, ...prev].slice(0, 10));
        setTotalInvested(prev => prev + scaledAmount);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isLive, currentPrediction, settings]);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-success" />
          </div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Auto-DCA Bot
          </h3>
        </div>
        
        {!isWalletConnected ? (
          <button
            onClick={() => setIsWalletConnected(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#1a1f2e] text-gray-300 rounded-xl hover:bg-[#2a324b] transition-colors border border-[#2a324b]"
          >
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </button>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 text-success rounded-xl border border-success/20">
              <Wallet className="h-4 w-4" />
              <span>0x1234...5678</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isLive}
                onChange={(e) => setIsLive(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#2a324b] peer-focus:ring-2 peer-focus:ring-success/25 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success/20 peer-checked:after:bg-success"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">
                {isLive ? 'Live' : 'Paused'}
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#1a1f2e] rounded-xl p-4 border border-[#2a324b]">
          <p className="text-sm text-gray-400">Total Invested</p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            ${totalInvested.toFixed(2)}
          </p>
        </div>
        <div className="bg-[#1a1f2e] rounded-xl p-4 border border-[#2a324b]">
          <p className="text-sm text-gray-400">Last Trade</p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            ${trades[0]?.amount.toFixed(2) || '0.00'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-300">Recent Bot Actions</h4>
        <div className="space-y-3">
          {trades.map((trade, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#1a1f2e] rounded-xl border border-[#2a324b]"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-success/10">
                  <DollarSign className="h-4 w-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">
                    {trade.action} {trade.token}
                  </p>
                  <p className="text-xs text-gray-400">
                    Confidence: {(trade.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-300">
                ${trade.amount.toFixed(2)}
              </p>
            </div>
          ))}

          {trades.length === 0 && (
            <div className="text-center py-8">
              <Bot className="h-8 w-8 mx-auto mb-2 text-gray-400 opacity-50" />
              <p className="text-gray-300">No trades executed yet</p>
              <p className="text-sm text-gray-400 mt-1">
                {isWalletConnected 
                  ? 'Turn on the bot to start trading'
                  : 'Connect your wallet to start trading'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoDCASimulator;