import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PortfolioProvider } from './context/PortfolioProvider'
import './styles/globals.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </StrictMode>,
)
