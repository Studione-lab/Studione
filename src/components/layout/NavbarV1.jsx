import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo.svg'

// ── Design-spec nav links (same as V2 but points to /studio) ────
const NAV_LINKS = [
  { label: 'Work',    to: '/work'    },
  { label: 'Studio',  to: '/studio'  },
  { label: 'Contact', to: '/contact' },
]

// ── Shared nav link style — Inter Tight 400, 16px, 1px tracking ─
const linkStyle = {
  fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
  fontStyle:  'normal',
  fontWeight: 400,
  fontSize:   '16px',
  lineHeight: '20px',
  display:    'flex',
  alignItems: 'center',
  textAlign:  'center',
  letterSpacing: '1px',
  color: '#FFFFFF',
  textDecoration: 'none',
  flex:     'none',
  flexGrow: 0,
}

export default function NavbarV1() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      {/*
        ── Responsive visibility via <style> block (same pattern as V2)
        Desktop (≥768px): #nav-v1-desktop visible, #nav-v1-mob-btn hidden
        Mobile  (<768px): #nav-v1-desktop hidden,  #nav-v1-mob-btn visible
      */}
      <style>{`
        @media (min-width: 768px) {
          #nav-v1-desktop  { display: flex !important; }
          #nav-v1-mob-btn  { display: none !important; }
          #nav-v1-mob-menu { display: none !important; }
        }
        @media (max-width: 767px) {
          #nav-v1-desktop  { display: none !important; }
          #nav-v1-mob-btn  { display: flex !important; }
        }
      `}</style>

      {/* ── Fixed navbar bar ─────────────────────────────────────── */}
      <header
        id="navbar-v1"
        style={{
          position: 'fixed',
          width:  '100%',
          height: '92px',
          left: 0,
          top:  0,
          zIndex: 1000,
          background: '#1B1B1B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 40px',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Logo 128×24 ────────────────────────────────────────── */}
        <Link
          to="/"
          id="nav-v1-logo"
          style={{
            width: '128px',
            height: '24px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <img
            src={logo}
            alt="Studione"
            width={128}
            height={24}
            style={{ width: '128px', height: '24px', display: 'block', objectFit: 'contain' }}
          />
        </Link>

        {/* ── Desktop links — NO pill background, gap 72px ───────── */}
        <nav
          id="nav-v1-desktop"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: '12px 16px',
            gap: '72px',
            /* initial value overridden by the media query above */
            display: 'flex',
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              id={`nav-v1-${link.label.toLowerCase()}`}
              style={({ isActive }) => ({
                ...linkStyle,
                opacity: isActive ? 1 : 0.85,
                order: i,
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Hamburger — mobile only ─────────────────────────────── */}
        <button
          id="nav-v1-mob-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            width: '40px',
            height: '40px',
            background: 'rgba(43,43,43,0.5)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: '18px',
                height: '1.5px',
                background: '#FFFFFF',
                borderRadius: '2px',
                display: 'block',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform:
                  i === 0 && menuOpen ? 'translateY(6.5px) rotate(45deg)'  :
                  i === 2 && menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </header>

      {/* ── Mobile full-screen drawer ───────────────────────────────
           display: none on desktop is enforced by the <style> above */}
      <div
        id="nav-v1-mob-menu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: '#1B1B1B',
          flexDirection: 'column',
          padding: '6rem 2.5rem 3rem',
          transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          opacity:     menuOpen ? 1 : 0,
          transform:   menuOpen ? 'translateY(0)' : 'translateY(-12px)',
          pointerEvents: menuOpen ? 'all' : 'none',
          display: 'none',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                padding: '1rem 0',
                fontSize: '2rem',
                fontFamily: "'Inter Tight', system-ui, sans-serif",
                fontWeight: 400,
                letterSpacing: '1px',
                color: isActive ? 'rgba(255,255,255,0.5)' : '#FFFFFF',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                transition: 'opacity 0.25s ease',
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                opacity:   menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  )
}
