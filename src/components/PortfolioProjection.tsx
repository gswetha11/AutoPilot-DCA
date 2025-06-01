import React, { useMemo } from 'react';
import { useDCA } from '../context/DCAContext';
import { usePrediction } from '../context/PredictionContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const PortfolioProjection: React.FC = () => {
  const { settings } = useDCA();
  const { currentPrediction } = usePrediction();

  const projectionData = useMemo(() => {
    if (!currentPrediction) return [];

    const periods = 12;
    const data = [];
    let balance = settings.investmentAmount;
    const monthlyReturn = currentPrediction.trend === 'up' ? 0.05 : -0.02;

    for (let i = 0; i < periods; i++) {
      const smartBuy = currentPrediction.confidence >= (settings.confidenceThreshold / 100);
      const investment = smartBuy ? settings.investmentAmount : settings.investmentAmount * 0.5;
      balance = (balance + investment) * (1 + monthlyReturn);

      data.push({
        month: `Month ${i + 1}`,
        value: balance,
        investment: investment,
        isSmartBuy: smartBuy
      });
    }

    return data;
  }, [currentPrediction, settings]);

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Portfolio Projection
      </h3>
      
      <div className="h-[400px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a324b" />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#2a324b' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#2a324b' }}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1f2e',
                border: '1px solid #2a324b',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
              }}
              labelStyle={{ color: '#94a3b8' }}
              itemStyle={{ color: '#e2e8f0' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Portfolio Value']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4facfe"
              strokeWidth={2}
              dot={(props) => {
                const isSmartBuy = projectionData[props.index]?.isSmartBuy;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={isSmartBuy ? 6 : 4}
                    fill={isSmartBuy ? '#4facfe' : '#1a1f2e'}
                    stroke="#4facfe"
                    strokeWidth={2}
                    filter={isSmartBuy ? 'url(#glow)' : undefined}
                  />
                );
              }}
            />
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1a1f2e] rounded-xl p-4 border border-[#2a324b]">
          <p className="text-sm text-gray-400">Projected Value</p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            ${projectionData[projectionData.length - 1]?.value.toFixed(2) || '0.00'}
          </p>
        </div>
        <div className="bg-[#1a1f2e] rounded-xl p-4 border border-[#2a324b]">
          <p className="text-sm text-gray-400">Total Investment</p>
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            ${(settings.investmentAmount * 12).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioProjection;