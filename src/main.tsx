import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PinPadApp from './components/App/PinPadApp'

// Reset styles
import 'normalize.css/normalize.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element was not found')
}

createRoot(root).render(
  <StrictMode>
    <PinPadApp />
  </StrictMode>
)
