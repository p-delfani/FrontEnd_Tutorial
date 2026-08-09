import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './../public/css/index.css'
import './../public/css/fonts.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
