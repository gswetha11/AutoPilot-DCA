import React, { useState, useEffect } from 'react';
import { useDCA } from '../context/DCAContext';
import { usePrediction } from '../context/PredictionContext';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

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
    }, 10000); // Simulate every 10 seconds

    return () => clearInterval(interval);
  }, [isLive, currentPrediction, settings]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Auto-DCA Bot</h3>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isLive}
            onChange={(e) => setIsLive(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          <span className="ml-3 text-sm font-medium text-slate-700">
            {isLive ? 'Live' : 'Paused'}
          </span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-sm text-slate-600 mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-slate-800">
            ${totalInvested.toFixed(2)}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-sm text-slate-600 mb-1">Last Trade</p>
          <p className="text-2xl font-bold text-slate-800">
            {trades[0]?.amount.toFixed(2) || '0.00'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-slate-700">Recent Bot Actions</h4>
        <div className="space-y-3">
          {trades.map((trade, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-emerald-100">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {trade.action} {trade.token}
                  </p>
                  <p className="text-xs text-slate-500">
                    Confidence: {(trade.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-700">
                ${trade.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoDCASimulator;