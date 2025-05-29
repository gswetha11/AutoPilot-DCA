export type Token = 'APT' | 'USDC' | 'stAPT';

export interface TokenData {
  symbol: Token;
  name: string;
  color: string;
  address: string;
}

export interface DCASettings {
  confidenceThreshold: number;
  autoMode: boolean;
  frequency: 'hourly' | 'daily' | 'weekly';
  investmentAmount: number;
}

export interface Prediction {
  timestamp: string;
  predictionValue: number;
  confidence: number;
  trend: 'up' | 'down';
  token: Token;
}

export interface PortfolioStats {
  totalInvested: number;
  currentValue: number;
  percentageChange: number;
}

export interface WalletTransaction {
  hash: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  amount: number;
  token: Token;
}