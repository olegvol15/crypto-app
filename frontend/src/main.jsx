// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import ThemeProvider from './context/theme-context.jsx';  // NOTE: named import
import { AuthProvider } from './context/auth-context.jsx';     // from the auth step
import { CryptoContextProvider } from './context/crypto-context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CryptoContextProvider>
            <App />
          </CryptoContextProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

