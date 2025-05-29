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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-xl font-semibold mb-6">Portfolio Projection</h3>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={projectionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
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
                    fill={isSmartBuy ? '#4facfe' : '#fff'}
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

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-sm text-slate-600">Projected Value</p>
          <p className="text-2xl font-bold text-slate-800">
            ${projectionData[projectionData.length - 1]?.value.toFixed(2) || '0.00'}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4">
          <p className="text-sm text-slate-600">Total Investment</p>
          <p className="text-2xl font-bold text-slate-800">
            ${(settings.investmentAmount * 12).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioProjection;