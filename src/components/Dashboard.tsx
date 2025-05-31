import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import PredictionDisplay from './PredictionDisplay';
import ActionRecommendation from './ActionRecommendation';
import HistoryLog from './HistoryLog';
import PredictionChart from './PredictionChart';
import TokenSelector from './TokenSelector';
import DCAControls from './DCAControls';
import AutoDCASimulator from './AutoDCASimulator';
import PortfolioProjection from './PortfolioProjection';
import { usePrediction } from '../context/PredictionContext';
import { RefreshCw, AlertCircle, Wallet } from 'lucide-react';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';

const Dashboard: React.FC = () => {
  const { 
    currentPrediction, 
    fetchPrediction, 
    isLoading,
    lastUpdated 
  } = usePrediction();
  
  const { connected, connecting } = useWallet();

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="h-16 w-16 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Wallet className="h-8 w-8 text-purple-400" />
        </div>
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400 max-w-md">
            Please connect your Aptos wallet to access the DCA dashboard and start automating your investments.
          </p>
        </div>
        <WalletSelector 
          displayMode="button"
          buttonClassName="bg-purple-500/20 text-purple-400 px-6 py-3 rounded-lg hover:bg-purple-500/30 transition-colors border border-purple-500/30 font-medium"
        />
        {connecting && (
          <p className="text-sm text-purple-400 animate-pulse">
            Connecting to wallet...
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Market Predictions
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

export default Dashboard;