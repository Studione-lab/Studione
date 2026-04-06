import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

// ── Design-spec nav links: Work · Studio · Contact ──────────────
const NAV_LINKS = [
  { label: 'Work',    to: '/work' },
  { label: 'Studio',  to: '/about' },
  { label: 'Contact', to: '/contact' },
]

// ── Shared link text style (Inter Tight, 18px, 400, 1px tracking)
const linkTextStyle = {
  fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
  fontStyle:  'normal',
  fontWeight: 400,
  fontSize:   '18px',
  lineHeight: '20px',
  letterSpacing: '1px',
  color: '#FFFFFF',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      {/* ── Desktop / Tablet Navbar ──────────────────────────────── */}
      <header
        id="navbar"
        style={{
          position: 'fixed',
          width: '100%',
          height: '92px',
          left: 0,
          top: 0,
          zIndex: 1000,
          background: '#1B1B1B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft:  '40px',
          paddingRight: '40px',
          paddingTop:   '24px',
          paddingBottom:'24px',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Logo: 128×24, text only ─────────────────────────────── */}
        <Link
          to="/"
          id="logo"
          style={{
            width: '128px',
            height: '24px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{
            fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
            fontWeight: 700,
            fontSize:   '20px',
            lineHeight: '24px',
            letterSpacing: '-0.5px',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
          }}>
            Studione
          </span>
        </Link>

        {/* ── Desktop nav pill: [Work · Studio · Contact] ─────────── */}
        <nav
          id="desktop-nav"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '12px 16px',
            gap: '48px',
            height: '44px',
            background: 'rgba(43, 43, 43, 0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '8px',
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              id={`nav-${link.label.toLowerCase()}`}
              style={({ isActive }) => ({
                ...linkTextStyle,
                opacity: isActive ? 1 : 0.85,
                flex: 'none',
                order: i,
                flexGrow: 0,
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Mobile hamburger ────────────────────────────────────── */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden"
          style={{
            width: '40px',
            height: '40px',
            background: 'rgba(43,43,43,0.5)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
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
                  i === 2 && menuOpen ? 'translateY(-6.5px) rotate(-45deg)': 'none',
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </header>

      {/* ── Mobile Full-Screen Drawer ────────────────────────────── */}
      <div
        id="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: '#1B1B1B',
          display: 'flex',
          flexDirection: 'column',
          padding: '6rem 2.5rem 3rem',
          transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
          pointerEvents: menuOpen ? 'all' : 'none',
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
                opacity: menuOpen ? 1 : 0,
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
