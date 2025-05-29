import React from 'react';
import PredictionDisplay from './PredictionDisplay';
import ActionRecommendation from './ActionRecommendation';
import HistoryLog from './HistoryLog';
import PredictionChart from './PredictionChart';
import TokenSelector from './TokenSelector';
import DCAControls from './DCAControls';
import AutoDCASimulator from './AutoDCASimulator';
import PortfolioProjection from './PortfolioProjection';
import { usePrediction } from '../context/PredictionContext';
import { RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { 
    currentPrediction, 
    fetchPrediction, 
    isLoading,
    lastUpdated 
  } = usePrediction();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Dashboard
        </h2>
        <button 
          onClick={() => fetchPrediction()}
          disabled={isLoading}
          className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg hover:bg-purple-500/30 transition-colors disabled:opacity-50 border border-purple-500/30"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>
      
      {lastUpdated && (
        <p className="text-sm text-gray-400">
          Last updated: {new Date(lastUpdated).toLocaleTimeString()}
        </p>
      )}

      <TokenSelector />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PredictionDisplay prediction={currentPrediction} />
        <ActionRecommendation prediction={currentPrediction} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AutoDCASimulator />
        <DCAControls />
      </div>

      <PortfolioProjection />

      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Prediction History
        </h3>
        <PredictionChart />
      </div>

      <HistoryLog />
    </div>
  );
};

export default Dashboard