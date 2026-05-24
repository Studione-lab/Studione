import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import './index.css'
import App from './App.jsx'

// ─── Temporary Error Boundary — shows crash on screen ────────────
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#0a0a0a',
          color: '#ff6b6b', fontFamily: 'monospace', padding: '2rem',
          overflowY: 'auto', zIndex: 9999,
        }}>
          <h1 style={{ color: '#ff6b6b', marginBottom: '1rem', fontSize: '1.8rem' }}>
            ⚠ Runtime Error
          </h1>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1.3rem', lineHeight: 1.6 }}>
            {this.state.error.toString()}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

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
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

