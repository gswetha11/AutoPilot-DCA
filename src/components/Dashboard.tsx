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
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>
        <button 
          onClick={() => fetchPrediction()}
          disabled={isLoading}
          className="flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-xl hover:bg-success/20 transition-colors disabled:opacity-50 border border-success/20"
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

      <div className="border-b border-[#2a324b]">
        <nav className="flex space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                py-4 px-1 relative font-medium text-sm
                ${activeTab === id 
                  ? 'text-success border-b-2 border-success' 
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

          <div className="chart-card">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Prediction History
            </h3>
            <PredictionChart />
          </div>

          <HistoryLog />
        </div>
      )}

      {activeTab === 'dca' && (
        <div className="space-y-6">
          <div className="glass-card p-6">
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