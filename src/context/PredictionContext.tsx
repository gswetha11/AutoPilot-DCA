import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Prediction } from '../types';
import { fetchAllora } from '../services/api';
import { useDCA } from './DCAContext';

interface PredictionContextType {
  currentPrediction: Prediction | null;
  predictionHistory: Prediction[];
  fetchPrediction: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: number | null;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export const usePrediction = () => {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePrediction must be used within a PredictionProvider');
  }
  return context;
};

interface PredictionProviderProps {
  children: ReactNode;
}

export const PredictionProvider: React.FC<PredictionProviderProps> = ({ children }) => {
  const { selectedToken, settings } = useDCA();
  const [currentPrediction, setCurrentPrediction] = useState<Prediction | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('predictionHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setPredictionHistory(parsedHistory);
          
          if (parsedHistory.length > 0) {
            const sorted = [...parsedHistory].sort((a, b) => 
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
            setCurrentPrediction(sorted[0]);
            setLastUpdated(new Date(sorted[0].timestamp).getTime());
          }
        }
      } catch (e) {
        console.error('Failed to parse saved history:', e);
        localStorage.removeItem('predictionHistory');
      }
    }
  }, []);

  useEffect(() => {
    if (predictionHistory.length > 0) {
      try {
        localStorage.setItem('predictionHistory', JSON.stringify(predictionHistory));
      } catch (e) {
        console.error('Failed to save history to localStorage:', e);
      }
    }
  }, [predictionHistory]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchPrediction();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [selectedToken]);

  const fetchPrediction = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchAllora(selectedToken, settings.timeframe);
      
      const prediction: Prediction = {
        timestamp: data.timestamp,
        predictionValue: data.value,
        confidence: data.confidence,
        trend: data.value > 0 ? 'up' : 'down',
        token: selectedToken,
        timeframe: settings.timeframe,
        logReturn: data.logReturn,
        marketSentiment: data.marketSentiment
      };
      
      setCurrentPrediction(prediction);
      setPredictionHistory(prev => {
        const newHistory = [prediction, ...prev].slice(0, 50);
        return newHistory;
      });
      setLastUpdated(Date.now());
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      console.error('Error fetching prediction:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedToken, settings.timeframe]);

  useEffect(() => {
    if (!currentPrediction) {
      fetchPrediction();
    }
  }, [currentPrediction, fetchPrediction]);

  const value = {
    currentPrediction,
    predictionHistory,
    fetchPrediction,
    isLoading,
    error,
    lastUpdated
  };

  return (
    <PredictionContext.Provider value={value}>
      {children}
    </PredictionContext.Provider>
  );
};