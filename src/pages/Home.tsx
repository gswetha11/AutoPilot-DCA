import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Brain, TrendingUp, ShieldCheck, ChevronRight, Coins, LineChart, Wallet } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-success/10 text-success mb-4">
          <Coins className="h-6 w-6" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Smart Crypto Trading,
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Fully Automated
          </span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          AutoPilot DCA combines AI-powered market predictions with automated dollar-cost averaging to optimize your crypto investments.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-success/20 text-success rounded-xl hover:bg-success/30 transition-all border border-success/20 font-medium group"
          >
            <span>Launch Dashboard</span>
            <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="inline-flex items-center px-8 py-4 bg-[#1a1f2e] text-gray-300 rounded-xl hover:bg-[#2a324b] transition-all border border-[#2a324b] font-medium">
            <Wallet className="h-5 w-5 mr-2" />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            $2.5M+
          </div>
          <p className="text-gray-400">Total Volume</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            1,000+
          </div>
          <p className="text-gray-400">Active Users</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            98.5%
          </div>
          <p className="text-gray-400">Success Rate</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-8 space-y-4 hover:border-success/20 transition-colors">
          <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
            <Brain className="h-6 w-6 text-success" />
          </div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            AI-Powered Predictions
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Our advanced machine learning algorithms analyze market trends, patterns, and on-chain data to provide accurate price predictions with confidence scores.
          </p>
        </div>

        <div className="glass-card p-8 space-y-4 hover:border-success/20 transition-colors">
          <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
            <Bot className="h-6 w-6 text-success" />
          </div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Automated Trading
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Set your investment strategy once and let AutoPilot handle the rest. Our smart execution engine ensures optimal entry points based on market conditions.
          </p>
        </div>

        <div className="glass-card p-8 space-y-4 hover:border-success/20 transition-colors">
          <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
            <LineChart className="h-6 w-6 text-success" />
          </div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Real-time Analytics
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Track your portfolio performance with detailed analytics, market insights, and historical trade data. Make informed decisions with our comprehensive dashboard.
          </p>
        </div>

        <div className="glass-card p-8 space-y-4 hover:border-success/20 transition-colors">
          <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-success" />
          </div>
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Risk Management
          </h3>
          <p className="text-gray-400 leading-relaxed">
            Built-in safeguards and confidence thresholds protect your investments during market volatility. Automatic USDC fallback ensures capital preservation.
          </p>
        </div>
      </div>

      {/* How it Works */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          How AutoPilot DCA Works
        </h2>
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success font-bold">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Market Analysis</h3>
              <p className="text-gray-400 leading-relaxed">
                Our AI continuously analyzes market data, trends, and patterns across multiple timeframes to generate accurate price predictions with confidence scores.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success font-bold">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Smart Execution</h3>
              <p className="text-gray-400 leading-relaxed">
                When confidence exceeds your threshold, AutoPilot executes trades at optimal times using advanced order types and gas optimization strategies.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success font-bold">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-200 mb-2">Portfolio Management</h3>
              <p className="text-gray-400 leading-relaxed">
                Your portfolio is automatically rebalanced based on market conditions, with idle funds optionally staked in yield-generating protocols for additional returns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Ready to Start Trading?
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Join thousands of traders who trust AutoPilot DCA to manage their crypto investments. Get started in minutes with our easy-to-use platform.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center px-8 py-4 bg-success/20 text-success rounded-xl hover:bg-success/30 transition-all border border-success/20 font-medium group"
        >
          <span>Launch Dashboard</span>
          <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default Home;