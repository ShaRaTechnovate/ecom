import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/ApiConfigs/axios-middleware"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';




const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000
    }
  }
});




root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        position='top-right'
        toastOptions={{ className: "react-hot-toast" }}
      />
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);


reportWebVitals();
