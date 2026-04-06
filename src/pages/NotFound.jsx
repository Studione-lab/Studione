import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--color-brand-black)',
      textAlign: 'center', padding: '2rem',
    }}>
      <div>
        <div style={{ fontSize: '8rem', fontWeight: 800, letterSpacing: '-0.05em', color: 'var(--color-brand-border)', lineHeight: 1, marginBottom: '1rem' }}>
          404
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-brand-white)', marginBottom: '1rem' }}>
          This page got lost in the design process
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--color-brand-text)', marginBottom: '2.5rem', maxWidth: '400px', lineHeight: 1.7 }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/work" className="btn-outline">View Our Work</Link>
        </div>
      </div>
    </div>
  )
}
