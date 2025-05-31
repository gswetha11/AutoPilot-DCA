import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PredictionProvider } from './context/PredictionContext';
import { DCAProvider } from './context/DCAContext';
import Layout from './components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
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
  );
}

export default App;