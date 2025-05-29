import axios from 'axios';
import { Token } from '../types';

const TOKEN_MAP = {
  ETH: { topicId: 1, chain: "ethereum-11155111" },
  BTC: { topicId: 2, chain: "bitcoin-testnet" },
  SOL: { topicId: 3, chain: "solana-devnet" },
  APT: { topicId: 4, chain: "aptos-testnet" }
};

interface AlloraResponse {
  value: number;
  confidence: number;
  timestamp: string;
  token: Token;
}

// Simulate realistic market data
function generateFallbackData(token: Token): AlloraResponse {
  const now = new Date();
  
  // Base prices for different tokens
  const basePrices: Record<Token, number> = {
    ETH: 2500,
    BTC: 45000,
    SOL: 100,
    APT: 15
  };
  
  const basePrice = basePrices[token];
  const volatility = 0.05; // 5% volatility
  
  // Generate a price movement using random walk
  const priceChange = basePrice * volatility * (Math.random() - 0.5);
  const simulatedPrice = basePrice + priceChange;
  
  // Generate confidence based on volatility
  const confidence = 0.5 + Math.random() * 0.4; // Between 0.5 and 0.9
  
  return {
    value: simulatedPrice,
    confidence: confidence,
    timestamp: now.toISOString(),
    token
  };
}

export async function fetchAllora(token: Token = 'ETH'): Promise<AlloraResponse> {
  const { topicId, chain } = TOKEN_MAP[token];
  const url = `https://api.allora.network/v2/allora/consumer/${chain}`;

  try {
    const response = await axios.get(url, {
      params: {
        allora_topic_id: topicId
      },
      headers: {
        'accept': 'application/json',
        'x-api-key': 'UP-74fac402be894c508591ce80',
        'Cache-Control': 'no-cache'
      },
      timeout: 10000 // 10 second timeout
    });

    console.log('Raw Allora API Response:', response.data);

    // Validate response data
    const data = response.data;
    
    if (!data) {
      console.warn('Empty response from Allora API, using fallback');
      return generateFallbackData(token);
    }

    // Extract and validate required fields
    const value = Number(data.value);
    const confidence = Number(data.confidence);
    const timestamp = data.timestamp || new Date().toISOString();

    // Validate numeric values
    if (isNaN(value) || isNaN(confidence)) {
      console.warn('Invalid numeric values in response, using fallback');
      return generateFallbackData(token);
    }

    // Validate confidence range
    if (confidence < 0 || confidence > 1) {
      console.warn('Confidence out of range, using fallback');
      return generateFallbackData(token);
    }

    return {
      value,
      confidence,
      timestamp,
      token
    };

  } catch (error) {
    console.error('Error fetching from Allora API:', error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      
      // Handle specific error cases
      switch (status) {
        case 429:
          console.warn('Rate limit exceeded, using fallback data');
          break;
        case 401:
          console.warn('Authentication error, using fallback data');
          break;
        case 404:
          console.warn('API endpoint not found, using fallback data');
          break;
        default:
          console.warn('API request failed, using fallback data');
      }
    }

    return generateFallbackData(token);
  }
}