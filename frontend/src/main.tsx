import { StrictMode } from 'react'

import { App } from '@/App'
import { createRoot } from 'react-dom/client'

import './styles/index.scss'
import '@fontsource/caveat/400.css'
import '@fontsource/caveat/700.css'
import '@fontsource/nunito/400.css'
import '@fontsource/nunito/700.css'
import '@fontsource/nunito/900.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
