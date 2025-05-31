import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PredictionProvider } from './context/PredictionContext';
import { DCAProvider } from './context/DCAContext';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { PontemWallet } from '@pontem/wallet-adapter-plugin';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const wallets = [
  new PetraWallet(),
  new MartianWallet(),
  new PontemWallet(),
];

function App() {
  return (
    <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
      <QueryClientProvider client={queryClient}>
        <DCAProvider>
          <PredictionProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </PredictionProvider>
        </DCAProvider>
      </QueryClientProvider>
    </AptosWalletAdapterProvider>
  );
}

export default App;