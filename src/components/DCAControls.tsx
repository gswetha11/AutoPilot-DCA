import React from 'react';
import { useDCA } from '../context/DCAContext';

const DCAControls: React.FC = () => {
  const { settings, updateSettings } = useDCA();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">DCA Settings</h3>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Confidence Threshold</span>
            <span className="text-sm text-slate-500">{settings.confidenceThreshold}%</span>
          </label>
          <input
            type="range"
            min="50"
            max="95"
            value={settings.confidenceThreshold}
            onChange={(e) => updateSettings({ confidenceThreshold: parseInt(e.target.value) })}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Auto DCA Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoMode}
              onChange={(e) => updateSettings({ autoMode: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Investment Frequency
          </label>
          <select
            value={settings.frequency}
            onChange={(e) => updateSettings({ frequency: e.target.value as 'hourly' | 'daily' | 'weekly' })}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Investment Amount (USD)
          </label>
          <input
            type="number"
            min="1"
            value={settings.investmentAmount}
            onChange={(e) => updateSettings({ investmentAmount: parseInt(e.target.value) })}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default DCAControls