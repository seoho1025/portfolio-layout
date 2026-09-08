import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PortfolioProvider } from './context/PortfolioProvider'
import { getTheme, applyTheme } from './lib/settings'
import './styles/globals.css'
import App from './App.tsx'

// 저장돼 있던 테마 먼저 적용 (깜빡임 방지) → DB에서 최신값으로 갱신
applyTheme(localStorage.getItem('theme') || '')
getTheme().then(applyTheme)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioProvider>
      <App />
    </PortfolioProvider>
  </StrictMode>,
)
