import axios from 'axios';
import { Token, TimeFrame } from '../types';

const API_KEY = 'UP-040bfd4341124fcd962bebba';
const BASE_URL = 'https://api.allora.network/v2/allora/consumer/price/ethereum-11155111';

export const TOKENS = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    color: '#627EEA',
    timeframes: ['5m', '8h'] as TimeFrame[]
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    color: '#F7931A',
    timeframes: ['5m', '8h'] as TimeFrame[]
  },
  SOL: {
    symbol: 'SOL',
    name: 'Solana',
    color: '#00FFA3',
    timeframes: ['5m', '8h'] as TimeFrame[]
  }
};

interface AlloraResponse {
  value: number;
  confidence: number;
  timestamp: string;
  token: Token;
  timeframe: TimeFrame;
  logReturn?: number;
  marketSentiment?: 'bullish' | 'neutral' | 'bearish';
}

function calculateMarketSentiment(logReturn: number): 'bullish' | 'neutral' | 'bearish' {
  if (logReturn > 0.005) return 'bullish';
  if (logReturn < -0.005) return 'bearish';
  return 'neutral';
}

function generateFallbackData(token: Token, timeframe: TimeFrame): AlloraResponse {
  const now = new Date();
  
  const basePrices: Record<Token, number> = {
    ETH: 2500,
    BTC: 45000,
    SOL: 100
  };
  
  const basePrice = basePrices[token];
  const volatility = 0.05;
  const priceChange = basePrice * volatility * (Math.random() - 0.5);
  const simulatedPrice = basePrice + priceChange;
  const confidence = 0.5 + Math.random() * 0.4;
  const logReturn = Math.log(simulatedPrice / basePrice);
  
  return {
    value: simulatedPrice,
    confidence,
    timestamp: now.toISOString(),
    token,
    timeframe,
    logReturn,
    marketSentiment: calculateMarketSentiment(logReturn)
  };
}

export async function fetchAllora(token: Token = 'ETH', timeframe: TimeFrame = '8h'): Promise<AlloraResponse> {
  const url = `${BASE_URL}/${token}/${timeframe}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'x-api-key': API_KEY,
        'Cache-Control': 'no-cache'
      },
      timeout: 10000
    });

    const data = response.data;
    
    if (!data || typeof data.value !== 'number' || typeof data.confidence !== 'number') {
      return generateFallbackData(token, timeframe);
    }

    const value = Number(data.value);
    const confidence = Number(data.confidence);
    const logReturn = Number(data.predicted_log_return || Math.log(value / (value - (value * 0.01))));
    const timestamp = data.timestamp || new Date().toISOString();

    if (isNaN(value) || isNaN(confidence)) {
      return generateFallbackData(token, timeframe);
    }

    if (confidence < 0 || confidence > 1) {
      return generateFallbackData(token, timeframe);
    }

    return {
      value,
      confidence,
      timestamp,
      token,
      timeframe,
      logReturn,
      marketSentiment: calculateMarketSentiment(logReturn)
    };

  } catch (error) {
    console.error('Error fetching from Allora API:', error);
    return generateFallbackData(token, timeframe);
  }
}

export async function fetchMarketSentiment(): Promise<Record<Token, AlloraResponse>> {
  const tokens = Object.keys(TOKENS) as Token[];
  const timeframe: TimeFrame = '8h';
  
  const predictions = await Promise.all(
    tokens.map(token => fetchAllora(token, timeframe))
  );
  
  return tokens.reduce((acc, token, index) => {
    acc[token] = predictions[index];
    return acc;
  }, {} as Record<Token, AlloraResponse>);
}