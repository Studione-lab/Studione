import { useState, useEffect, useCallback } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/Logo.svg'

// ── Design-spec nav links: Work · Studio (Contact handled separately) ─
const NAV_LINKS = [
  { label: 'Work',   to: '/work'   },
  { label: 'Studio', to: '/studio' },
]

// ── Shared nav link style (Inter Tight, 18px, 400, 1px tracking) ─
const linkTextStyle = {
  fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '16px',
  lineHeight: '20px',
  letterSpacing: '1px',
  color: '#FFFFFF',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  flex: 'none',
  flexGrow: 0,
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Scroll to footer — works from any page
  const handleContact = useCallback((e) => {
    e.preventDefault()
    setMenuOpen(false)
    const scrollToFooter = () => {
      const footer = document.getElementById('footer') || document.getElementById('footer-v1')
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    // If already on a page that has the footer, just scroll
    // Otherwise navigate first, then scroll after paint
    const footer = document.getElementById('footer') || document.getElementById('footer-v1')
    if (footer) {
      scrollToFooter()
    } else {
      navigate('/')
      // Wait for new page to mount, then scroll
      setTimeout(scrollToFooter, 300)
    }
  }, [navigate])

  return (
    <>
      {/*
        ── Responsive visibility is controlled entirely via the <style>
           block below — NO Tailwind responsive classes used, because
           inline `display` on the button/nav overrides them.

        Desktop  (≥768px): #desktop-nav visible, #mobile-menu-btn hidden
        Mobile   (<768px) : #desktop-nav hidden,  #mobile-menu-btn visible
      */}
      <style>{`
        /* Desktop: show pill nav, hide hamburger + drawer */
        @media (min-width: 768px) {
          #desktop-nav    { display: flex   !important; }
          #mobile-menu-btn { display: none  !important; }
          #mobile-menu    { display: none   !important; }
        }
        /* Mobile: hide pill nav, show hamburger */
        @media (max-width: 767px) {
          #desktop-nav    { display: none   !important; }
          #mobile-menu-btn { display: flex  !important; }
        }
      `}</style>

      {/* ── Fixed Navbar bar ──────────────────────────────────────── */}
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
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingTop: '24px',
          paddingBottom: '24px',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Logo: 128×24 SVG ────────────────────────────────────────
             Place your SVG file at: /public/logo.svg
             The img renders at the exact 128×24 spec dimensions.      */}
        <Link
          to="/"
          id="logo"
          onClick={() => {
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
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
            style={{
              width: '128px',
              height: '24px',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* ── Desktop nav pill: Work · Studio · Contact ───────────── */}
        {/*    display toggled by the <style> above                    */}
        <nav
          id="desktop-nav"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: '12px 16px',
            gap: '48px',
            height: '44px',
            background: 'rgba(43, 43, 43, 0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '8px',
            /* initial value overridden by the media query above */
            display: 'flex',
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              id={`nav-${link.label.toLowerCase()}`}
              style={({ isActive }) => ({
                ...linkTextStyle,
                opacity: isActive ? 1 : 0.85,
                order: i,
              })}
            >
              {link.label}
            </NavLink>
          ))}
          {/* Contact — always scrolls to footer */}
          <button
            id="nav-contact"
            onClick={handleContact}
            style={{
              ...linkTextStyle,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              order: NAV_LINKS.length,
            }}
          >
            Contact
          </button>
        </nav>

        {/* ── Hamburger — mobile only, hidden on desktop by <style> ── */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            /* initial: hidden — overridden to flex on mobile via the <style> above */
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
                  i === 0 && menuOpen ? 'translateY(6.5px) rotate(45deg)' :
                    i === 2 && menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                opacity: i === 1 && menuOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </header>

      {/* ── Mobile Full-Screen Drawer ───────────────────────────────
           display: none on desktop is enforced by the <style> above  */}
      <div
        id="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: '#1B1B1B',
          flexDirection: 'column',
          padding: '6rem 2.5rem 3rem',
          transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
          pointerEvents: menuOpen ? 'all' : 'none',
          /* initial hidden: overridden by mobile media query */
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
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
              })}
            >
              {link.label}
            </NavLink>
          ))}
          {/* Contact — scroll to footer */}
          <button
            onClick={handleContact}
            style={{
              padding: '1rem 0',
              fontSize: '2rem',
              fontFamily: "'Inter Tight', system-ui, sans-serif",
              fontWeight: 400,
              letterSpacing: '1px',
              color: '#FFFFFF',
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'opacity 0.25s ease',
              transitionDelay: menuOpen ? `${NAV_LINKS.length * 60}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
              width: '100%',
            }}
          >
            Contact
          </button>
        </nav>
      </div>
    </>
  )
}
