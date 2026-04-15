import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import './index.css'
import App from './App.jsx'

// ─── Global Lenis smooth-scroll ──────────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // expo ease out
  smoothWheel: true,
  syncTouch: false,
})

// Tie Lenis RAF into GSAP's ticker so animations stay in sync
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Clean up on Vite HMR
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    lenis.destroy()
    gsap.ticker.remove((time) => lenis.raf(time * 1000))
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
