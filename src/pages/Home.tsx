import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Brain, TrendingUp, ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Smart Crypto Trading, Automated
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          AutoPilot DCA combines AI-powered market predictions with automated dollar-cost averaging to optimize your crypto investments.
        </p>
        <Link
          to="/dashboard"
          className="inline-block px-8 py-4 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all border border-purple-500/30 font-medium"
        >
          Launch Dashboard
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6 space-y-4">
          <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Brain className="h-6 w-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            AI-Powered Predictions
          </h3>
          <p className="text-gray-400">
            Advanced machine learning algorithms analyze market trends and patterns to provide accurate price predictions.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-4">
          <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Bot className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Automated Trading
          </h3>
          <p className="text-gray-400">
            Set your investment strategy once and let AutoPilot handle the rest with smart execution timing.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-4">
          <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Market Analysis
          </h3>
          <p className="text-gray-400">
            Real-time market data and trend analysis help you make informed investment decisions.
          </p>
        </div>

        <div className="glass-card rounded-xl p-6 space-y-4">
          <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Risk Management
          </h3>
          <p className="text-gray-400">
            Built-in safeguards and confidence thresholds protect your investments during market volatility.
          </p>
        </div>
      </div>

      {/* How it Works */}
      <div className="glass-card rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          How AutoPilot DCA Works
        </h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Market Analysis</h3>
              <p className="text-gray-400">
                Our AI continuously analyzes market data, trends, and patterns to generate accurate price predictions.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Confidence Scoring</h3>
              <p className="text-gray-400">
                Each prediction receives a confidence score based on market conditions and historical accuracy.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Smart Execution</h3>
              <p className="text-gray-400">
                When confidence exceeds your threshold, AutoPilot executes trades at optimal times.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;