import { useState } from 'react'
import './App.css'
import {CryptoContextProvider} from './context/crypto-context';
import AppLayout from './components/layout/AppLayout';
import ThemeProvider from './context/theme-context';

function App() {
  return (
    <ThemeProvider>
      <CryptoContextProvider>
        <AppLayout />
      </CryptoContextProvider>
    </ThemeProvider>
    
  )
}

export default App
