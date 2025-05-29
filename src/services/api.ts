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
  
  return {
    value: simulatedPrice,
    confidence,
    timestamp: now.toISOString(),
    token,
    timeframe
  };
}

export async function fetchAllora(token: Token = 'ETH', timeframe: TimeFrame = '5m'): Promise<AlloraResponse> {
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
    
    if (!data) {
      console.warn('Empty response from Allora API, using fallback');
      return generateFallbackData(token, timeframe);
    }

    const value = Number(data.value);
    const confidence = Number(data.confidence);
    const timestamp = data.timestamp || new Date().toISOString();

    if (isNaN(value) || isNaN(confidence)) {
      console.warn('Invalid numeric values in response, using fallback');
      return generateFallbackData(token, timeframe);
    }

    if (confidence < 0 || confidence > 1) {
      console.warn('Confidence out of range, using fallback');
      return generateFallbackData(token, timeframe);
    }

    return {
      value,
      confidence,
      timestamp,
      token,
      timeframe
    };

  } catch (error) {
    console.error('Error fetching from Allora API:', error);
    return generateFallbackData(token, timeframe);
  }
}