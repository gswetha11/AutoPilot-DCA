// src/components/Dashboard.tsx
import React, { useState } from 'react';
import PredictionDisplay from './PredictionDisplay';
import ActionRecommendation from './ActionRecommendation';
import HistoryLog from './HistoryLog';
import PredictionChart from './PredictionChart';
import TokenSelector from './TokenSelector';
import DCAControls from './DCAControls';
import AutoDCASimulator from './AutoDCASimulator';
import PortfolioProjection from './PortfolioProjection';
import { usePrediction } from '../context/PredictionContext';
import { RefreshCw, Settings, Bot, LineChart } from 'lucide-react';

type TabType = 'predictions' | 'dca' | 'portfolio';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('predictions');
  const { 
    currentPrediction, 
    fetchPrediction, 
    isLoading,
    lastUpdated 
  } = usePrediction();

  const tabs = [
    { id: 'predictions', label: 'Market Predictions', icon: LineChart },
    { id: 'dca', label: 'DCA Settings', icon: Settings },
    { id: 'portfolio', label: 'Portfolio & Bot', icon: Bot },
  ] as const;

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

      <div className="border-b border-[#2a2b36]">
        <nav className="flex space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                py-4 px-1 relative font-medium text-sm
                ${activeTab === id 
                  ? 'text-purple-400 border-b-2 border-purple-400' 
                  : 'text-gray-400 hover:text-gray-300'}
              `}
            >
              <div className="flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      <TokenSelector />

      {activeTab === 'predictions' && (
        <div className="space-y-6">
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
      )}

      {activeTab === 'dca' && (
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <DCAControls />
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AutoDCASimulator />
            <PortfolioProjection />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;