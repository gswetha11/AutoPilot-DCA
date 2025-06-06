import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DCASettings, Token, TimeFrame } from '../types';
import { TOKENS } from '../services/api';
import { dcaEngine } from '../services/dca';

interface DCAContextType {
  settings: DCASettings;
  updateSettings: (settings: Partial<DCASettings>) => void;
  selectedToken: Token;
  setSelectedToken: (token: Token) => void;
  isAutoMode: boolean;
  toggleAutoMode: () => void;
}

const DCAContext = createContext<DCAContextType | undefined>(undefined);

export const useDCA = () => {
  const context = useContext(DCAContext);
  if (!context) {
    throw new Error('useDCA must be used within a DCAProvider');
  }
  return context;
};

interface DCAProviderProps {
  children: ReactNode;
}

export const DCAProvider: React.FC<DCAProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<DCASettings>({
    confidenceThreshold: 75,
    autoMode: false,
    frequency: 'daily',
    investmentAmount: 100,
    timeframe: '8h',
    riskLevel: 'moderate',
    usdcFallback: true,
    autoRebalance: true,
    stakeIdle: true,
    maxAllocation: {
      conservative: 20,
      moderate: 35,
      aggressive: 50
    }
  });

  const [selectedToken, setSelectedToken] = useState<Token>('ETH');
  const [isAutoMode, setIsAutoMode] = useState(false);

  useEffect(() => {
    dcaEngine.updateSettings({
      targetToken: selectedToken,
      amount: settings.investmentAmount,
      frequency: settings.frequency,
      confidenceThreshold: settings.confidenceThreshold / 100,
      usdcFallbackEnabled: settings.usdcFallback
    });
    
    if (settings.autoMode) {
      dcaEngine.start();
    } else {
      dcaEngine.stop();
    }
  }, [settings, selectedToken]);

  const updateSettings = (newSettings: Partial<DCASettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleAutoMode = () => {
    setIsAutoMode(prev => !prev);
    updateSettings({ autoMode: !isAutoMode });
  };

  return (
    <DCAContext.Provider value={{
      settings,
      updateSettings,
      selectedToken,
      setSelectedToken,
      isAutoMode,
      toggleAutoMode,
    }}>
      {children}
    </DCAContext.Provider>
  );
};

export default DCAProvider;