import React from 'react';
import { Prediction } from '../types';
import { DollarSign, Pause, AlertCircle } from 'lucide-react';

interface ActionRecommendationProps {
  prediction: Prediction | null;
}

const ActionRecommendation: React.FC<ActionRecommendationProps> = ({ prediction }) => {
  if (!prediction) {
    return (
      <div className="glass-card p-6 h-full flex items-center justify-center">
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
    <div className={`glass-card p-6 border-l-4 ${shouldBuy ? 'border-success' : 'border-warning'}`}>
      <h3 className="text-xl font-semibold mb-6 text-white">
        Recommended Action
      </h3>
      
      <div className="text-center py-6">
        <div className={`inline-flex items-center justify-center p-4 rounded-full ${shouldBuy ? 'bg-success/10' : 'bg-warning/10'} mb-4`}>
          {shouldBuy ? (
            <DollarSign className="h-10 w-10 text-success" />
          ) : (
            <Pause className="h-10 w-10 text-warning" />
          )}
        </div>
        
        <h4 className={`text-4xl font-bold mb-4 ${shouldBuy ? 'text-success' : 'text-warning'}`}>
          {shouldBuy ? 'BUY' : 'HOLD'}
        </h4>
        
        <p className="text-gray-300 mb-6">
          {shouldBuy 
            ? 'Confidence level exceeds threshold. Consider making a purchase.'
            : 'Confidence level below threshold. Wait for a better opportunity.'}
        </p>
        
        <div className="bg-[#1a1f2e] rounded-xl p-4 text-sm text-gray-400 space-y-1">
          <p>Current threshold: <span className="font-semibold text-gray-300">70%</span></p>
          <p>Current confidence: <span className="font-semibold text-gray-300">{(confidence * 100).toFixed(0)}%</span></p>
        </div>
      </div>
    </div>
  );
};

export default ActionRecommendation;