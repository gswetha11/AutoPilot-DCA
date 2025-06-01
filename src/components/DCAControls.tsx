import React from 'react';
import { useDCA } from '../context/DCAContext';

const DCAControls: React.FC = () => {
  const { settings, updateSettings, isAutoMode, toggleAutoMode } = useDCA();

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        DCA Settings
      </h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-300">
              Confidence Threshold
            </label>
            <span className="text-sm text-gray-400">{settings.confidenceThreshold}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="95"
            value={settings.confidenceThreshold}
            onChange={(e) => updateSettings({ confidenceThreshold: parseInt(e.target.value) })}
            className="w-full h-2 bg-[#2a324b] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Risk Level
          </label>
          <select
            value={settings.riskLevel}
            onChange={(e) => updateSettings({ riskLevel: e.target.value as 'conservative' | 'moderate' | 'aggressive' })}
            className="w-full bg-[#1a1f2e] border border-[#2a324b] rounded-xl px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent"
          >
            <option value="conservative">Conservative (20% max per token)</option>
            <option value="moderate">Moderate (35% max per token)</option>
            <option value="aggressive">Aggressive (50% max per token)</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">Auto DCA Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAutoMode}
              onChange={toggleAutoMode}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#2a324b] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-success/25 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success/20 peer-checked:after:bg-success"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Investment Frequency
          </label>
          <select
            value={settings.frequency}
            onChange={(e) => updateSettings({ frequency: e.target.value as 'hourly' | 'daily' | 'weekly' })}
            className="w-full bg-[#1a1f2e] border border-[#2a324b] rounded-xl px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Investment Amount (USD)
          </label>
          <input
            type="number"
            min="1"
            value={settings.investmentAmount}
            onChange={(e) => updateSettings({ investmentAmount: parseInt(e.target.value) })}
            className="w-full bg-[#1a1f2e] border border-[#2a324b] rounded-xl px-4 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-success focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            USDC Fallback
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="usdcFallback"
              checked={settings.usdcFallback}
              onChange={(e) => updateSettings({ usdcFallback: e.target.checked })}
              className="h-4 w-4 bg-[#1a1f2e] border-[#2a324b] rounded text-success focus:ring-success/25"
            />
            <label htmlFor="usdcFallback" className="text-sm text-gray-400">
              Park funds in USDC when confidence is low
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Portfolio Rebalancing
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoRebalance"
                checked={settings.autoRebalance}
                onChange={(e) => updateSettings({ autoRebalance: e.target.checked })}
                className="h-4 w-4 bg-[#1a1f2e] border-[#2a324b] rounded text-success focus:ring-success/25"
              />
              <label htmlFor="autoRebalance" className="text-sm text-gray-400">
                Auto-rebalance portfolio based on confidence scores
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="stakeIdle"
                checked={settings.stakeIdle}
                onChange={(e) => updateSettings({ stakeIdle: e.target.checked })}
                className="h-4 w-4 bg-[#1a1f2e] border-[#2a324b] rounded text-success focus:ring-success/25"
              />
              <label htmlFor="stakeIdle" className="text-sm text-gray-400">
                Stake idle funds in stAPT/USDC farming
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DCAControls;