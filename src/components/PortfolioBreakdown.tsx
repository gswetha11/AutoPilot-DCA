import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PortfolioStats } from '../types';

interface PortfolioBreakdownProps {
  stats: PortfolioStats;
}

const COLORS = {
  ETH: '#627EEA',
  BTC: '#F7931A',
  SOL: '#00FFA3',
  APT: '#2DD6A0',
  stAPT: '#00FFA3',
  USDC: '#2775CA'
};

const PortfolioBreakdown: React.FC<PortfolioBreakdownProps> = ({ stats }) => {
  const data = Object.entries(stats.allocations).map(([token, value]) => ({
    name: token,
    value,
    color: COLORS[token as keyof typeof COLORS]
  }));

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Portfolio Breakdown
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#1a1b26] rounded-lg p-4">
          <p className="text-sm text-gray-400">Total Value</p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            ${stats.currentValue.toFixed(2)}
          </p>
        </div>
        <div className="bg-[#1a1b26] rounded-lg p-4">
          <p className="text-sm text-gray-400">24h Change</p>
          <p className={`text-2xl font-bold ${
            stats.percentageChange >= 0 ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {stats.percentageChange >= 0 ? '+' : ''}
            {stats.percentageChange.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 27, 38, 0.9)',
                border: '1px solid #2a2b36',
                borderRadius: '0.5rem',
                padding: '0.5rem',
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-300">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioBreakdown;