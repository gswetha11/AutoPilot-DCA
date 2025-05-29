import React from 'react';
import { usePrediction } from '../context/PredictionContext';
import { formatDistanceToNow } from 'date-fns';
import { TrendingUp, TrendingDown, DollarSign, Pause } from 'lucide-react';

const HistoryLog: React.FC = () => {
  const { predictionHistory } = usePrediction();

  if (predictionHistory.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Prediction History
        </h3>
        <p className="text-center py-8 text-gray-400">No prediction history available yet</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 overflow-hidden">
      <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Prediction History
      </h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-[#2a2b36]">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Prediction</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Confidence</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trend</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2b36]">
            {predictionHistory.map((entry) => (
              <tr key={entry.timestamp} className="hover:bg-[#2a2b36]/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                    {entry.predictionValue.toFixed(4)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="flex-grow max-w-[100px]">
                      <div className="h-1.5 bg-[#2a2b36] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            entry.confidence >= 0.7 ? 'bg-emerald-400' : 
                            entry.confidence >= 0.5 ? 'bg-amber-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${Math.max(entry.confidence * 100, 10)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {(entry.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {entry.trend === 'up' ? (
                    <span className="flex items-center text-emerald-400">
                      <TrendingUp className="h-4 w-4 mr-1" /> Up
                    </span>
                  ) : (
                    <span className="flex items-center text-red-400">
                      <TrendingDown className="h-4 w-4 mr-1" /> Down
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {entry.confidence >= 0.7 ? (
                    <span className="flex items-center text-emerald-400">
                      <DollarSign className="h-4 w-4 mr-1" /> Buy
                    </span>
                  ) : (
                    <span className="flex items-center text-amber-400">
                      <Pause className="h-4 w-4 mr-1" /> Hold
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLog;