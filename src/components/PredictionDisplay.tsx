import React from 'react';
import { Prediction } from '../types';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import ConfidenceGauge from './ConfidenceGauge';

interface PredictionDisplayProps {
  prediction: Prediction | null;
}

const PredictionDisplay: React.FC<PredictionDisplayProps> = ({ prediction }) => {
  if (!prediction) {
    return (
      <div className="glass-card rounded-xl p-6 h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <HelpCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No prediction data available yet</p>
          <p className="text-sm mt-2">Click refresh to fetch the latest prediction</p>
        </div>
      </div>
    );
  }

  const { predictionValue, confidence, trend, token } = prediction;
  const isPositive = trend === 'up';
  
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Current {token} Prediction
      </h3>
      
      <div className="flex items-center mb-8">
        <div className={`p-3 rounded-full ${isPositive ? 'bg-emerald-400/20 text-emerald-400' : 'bg-red-400/20 text-red-400'} mr-4`}>
          {isPositive ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
        </div>
        <div>
          <p className="text-sm text-gray-400">Market Direction</p>
          <p className={`text-xl font-semibold ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? 'Upward' : 'Downward'} Trend
          </p>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-2">Prediction Value</p>
        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          {predictionValue.toFixed(4)}
        </p>
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <p className="text-sm text-gray-400">Confidence Score</p>
          <p className="text-sm font-medium text-gray-300">{(confidence * 100).toFixed(0)}%</p>
        </div>
        <ConfidenceGauge confidence={confidence} />
      </div>
    </div>
  );
};

export default PredictionDisplay;