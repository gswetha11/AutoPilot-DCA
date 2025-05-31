export type Token = 'ETH' | 'BTC' | 'SOL';
export type TimeFrame = '5m' | '8h';
export type MarketSentiment = 'bullish' | 'neutral' | 'bearish';

export interface TokenData {
  symbol: Token;
  name: string;
  color: string;
  timeframes: TimeFrame[];
}

export interface DCASettings {
  confidenceThreshold: number;
  autoMode: boolean;
  frequency: 'hourly' | 'daily' | 'weekly';
  investmentAmount: number;
  timeframe: TimeFrame;
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
}

export interface Prediction {
  timestamp: string;
  predictionValue: number;
  confidence: number;
  trend: 'up' | 'down';
  token: Token;
  timeframe: TimeFrame;
  logReturn?: number;
  marketSentiment?: MarketSentiment;
}

export interface PortfolioStats {
  totalInvested: number;
  currentValue: number;
  percentageChange: number;
  allocations: Record<string, number>;
}

export interface WalletTransaction {
  hash: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  amount: number;
  token: Token;
}