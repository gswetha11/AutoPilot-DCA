import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DCASettings, Token } from '../types';

interface DCAContextType {
  settings: DCASettings;
  updateSettings: (settings: Partial<DCASettings>) => void;
  selectedToken: Token;
  setSelectedToken: (token: Token) => void;
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
  });

  const [selectedToken, setSelectedToken] = useState<Token>('ETH');

  const updateSettings = (newSettings: Partial<DCASettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <DCAContext.Provider value={{
      settings,
      updateSettings,
      selectedToken,
      setSelectedToken,
    }}>
      {children}
    </DCAContext.Provider>
  );
};