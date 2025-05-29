import React from 'react';
import { Prediction } from '../types';
import { DollarSign, Pause, AlertCircle } from 'lucide-react';

interface ActionRecommendationProps {
  prediction: Prediction | null;
}

const ActionRecommendation: React.FC<ActionRecommendationProps> = ({ prediction }) => {
  if (!prediction) {
    return (
      <div className="glass-card rounded-xl p-6 h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No recommendation available</p>
          <p className="text-sm mt-2">Waiting for prediction data</p>
        </div>
      </div>
    );
  }

  const { confidence } = prediction;
  const shouldBuy = confidence >= 0.7;
  
  return (
    <div className={`glass-card rounded-xl p-6 border-l-4 ${shouldBuy ? 'border-emerald-400' : 'border-amber-400'}`}>
      <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Recommended Action
      </h3>
      
      <div className="text-center py-6">
        <div className={`inline-flex items-center justify-center p-4 rounded-full ${shouldBuy ? 'bg-emerald-400/20' : 'bg-amber-400/20'} mb-4`}>
          {shouldBuy ? (
            <DollarSign className="h-10 w-10 text-emerald-400" />
          ) : (
            <Pause className="h-10 w-10 text-amber-400" />
          )}
        </div>
        
        <h4 className={`text-4xl font-bold mb-4 ${shouldBuy ? 'text-emerald-400' : 'text-amber-400'}`}>
          {shouldBuy ? 'BUY' : 'HOLD'}
        </h4>
        
        <p className="text-gray-300 mb-6">
          {shouldBuy 
            ? 'Confidence level exceeds threshold. Consider making a purchase.'
            : 'Confidence level below threshold. Wait for a better opportunity.'}
        </p>
        
        <div className="bg-[#1a1b26]/50 rounded-lg p-4 text-sm text-gray-400 space-y-1">
          <p>Current threshold: <span className="font-semibold text-gray-300">70%</span></p>
          <p>Current confidence: <span className="font-semibold text-gray-300">{(confidence * 100).toFixed(0)}%</span></p>
        </div>
      </div>
    </div>
  );
};

export default ActionRecommendation;