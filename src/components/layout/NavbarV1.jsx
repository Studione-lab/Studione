import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import logo from '../../assets/Logo.svg'

// ── Design-spec nav links (Contact handled separately) ────────────
const NAV_LINKS = [
  { label: 'Work',   to: '/work'   },
  { label: 'Studio', to: '/studio' },
]

// ── Mobile explicit links matching the image ──────────────────────
const MOB_LINKS = [
  { label: 'Work', to: '/work' },
  { label: 'Studio', to: '/studio' },
]

// ── Shared nav link style — Inter Tight 400, 16px, 1px tracking ─
const linkStyle = {
  fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '1.6rem',
  lineHeight: '1.25',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  letterSpacing: '0.1rem',
  color: '#FFFFFF',
  textDecoration: 'none',
  flex: 'none',
  flexGrow: 0,
}

export default function NavbarV1({ noBackground = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // ── GSAP Refs ───────────────────────────────────────────────────
  const menuRef = useRef(null)
  const linksRef = useRef([])
  const rightColRef = useRef(null)
  const closeBtnRef = useRef(null)

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Scroll to footer — works from any page
  const handleContact = useCallback((e) => {
    if (e) e.preventDefault()
    setMenuOpen(false)
    const scrollToFooter = () => {
      const footer = document.getElementById('footer') || document.getElementById('footer-v1')
      if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    const footer = document.getElementById('footer') || document.getElementById('footer-v1')
    if (footer) {
      scrollToFooter()
    } else {
      navigate('/')
      setTimeout(scrollToFooter, 300)
    }
  }, [navigate])

  // ── Scroll listener: detect if past hero (100vh) ─────────────
  useEffect(() => {
    const handleScroll = () => {
      // Threshold is 100vh minus navbar height to feel snappier
      setIsScrolledPastHero(window.scrollY > window.innerHeight - 92)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // check initially
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── GSAP Mobile Menu Animation ─────────────────────────────────
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return

    if (menuOpen) {
      // Disable body scroll
      document.body.style.overflow = 'hidden'
      
      gsap.set(menu, { display: 'flex' })
      gsap.timeline()
        .to(menu, { opacity: 1, duration: 0.4, ease: 'power2.out' })
        .fromTo(closeBtnRef.current, { opacity: 0, rotation: -90 }, { opacity: 1, rotation: 0, duration: 0.4, ease: 'power2.out' }, "-=0.2")
        .fromTo(linksRef.current, 
          { y: 80, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 
          "-=0.2"
        )
        .fromTo(rightColRef.current, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 
          "-=0.4"
        )
    } else {
      // Re-enable body scroll
      document.body.style.overflow = ''
      
      gsap.timeline({ onComplete: () => gsap.set(menu, { display: 'none' }) })
        .to(linksRef.current, { y: -30, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'power2.in' })
        .to(rightColRef.current, { opacity: 0, y: 10, duration: 0.3, ease: 'power2.in' }, 0)
        .to(closeBtnRef.current, { opacity: 0, rotation: 90, duration: 0.3, ease: 'power2.in' }, 0)
        .to(menu, { opacity: 0, duration: 0.3, ease: 'power2.in' }, "-=0.1")
    }
    
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <style>{`
        @media (min-width: 48em) {
          #nav-v1-desktop  { display: flex !important; }
          #nav-v1-mob-btn  { display: none !important; }
          #nav-v1-mob-menu { display: none !important; }
        }
        @media (max-width: 47.938em) {
          #nav-v1-desktop  { display: none !important; }
          #nav-v1-mob-btn  { display: flex !important; }
          #navbar-v1       { padding-left: 1.6rem !important; padding-right: 1.6rem !important; }
        }
        /* Mobile menu responsive split layout */
        .mob-menu-container {
           display: flex;
           flex-direction: column;
           justify-content: space-between;
           gap: 6.4rem;
        }
        @media (min-width: 31.25em) {
           .mob-menu-container {
             flex-direction: row;
             justify-content: space-between;
             align-items: flex-end;
           }
        }
      `}</style>

      {/* ── Fixed navbar bar ─────────────────────────────────────── */}
      <header
        id="navbar-v1"
        style={{
          position: 'fixed',
          width: '100%',
          height: '9.2rem',
          left: 0,
          top:  0,
          zIndex: 1000,
          background: noBackground ? 'transparent' : (isScrolledPastHero ? 'transparent' : '#020202'),
          transition: 'background 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2.4rem 4rem',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Logo 128×24 ────────────────────────────────────────── */}
        <Link
          to="/"
          id="nav-v1-logo"
          onClick={() => {
            if (pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          style={{
            width: '12.8rem',
            height: '2.4rem',
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
            style={{ width: '12.8rem', height: '2.4rem', display: 'block', objectFit: 'contain' }}
          />
        </Link>

        {/* ── Desktop links — NO pill background, gap 72px ───────── */}
        <nav
          id="nav-v1-desktop"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: '1.2rem 1.6rem',
            gap: '7.2rem',
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
          {/* Contact — scrolls to footer */}
          <button
            id="nav-v1-contact"
            onClick={handleContact}
            style={{
              ...linkStyle,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              order: NAV_LINKS.length,
              opacity: 0.85,
            }}
          >
            Contact
          </button>
        </nav>

        {/* ── Hamburger — mobile only ─────────────────────────────── */}
        <button
          id="nav-v1-mob-btn"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          style={{
            display: 'none',
            width: '4rem',
            height: '4rem',
            background: 'rgba(43,43,43,0.5)',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.313em',
            padding: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: '1.8rem',
                height: '0.15rem',
                background: '#FFFFFF',
                borderRadius: '2px',
                display: 'block',
              }}
            />
          ))}
        </button>
      </header>

      {/* ── Mobile full-screen drawer (GSAP Animated) ─────────────────────────────── */}
      <div
        id="nav-v1-mob-menu"
        ref={menuRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1001,
          background: '#020202',
          display: 'none',
          opacity: 0,
          flexDirection: 'column',
          padding: '1.5em 1em',
          boxSizing: 'border-box',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {/* Top bar w/ Close button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4rem' }}>
          <button
            ref={closeBtnRef}
            onClick={() => setMenuOpen(false)}
            style={{
              background: 'none', border: 'none', padding: '1em',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="mob-menu-container" style={{ flex: 1, padding: '0 0.5em' }}>
          
          {/* Left Column (Huge Links) */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
            {MOB_LINKS.map((link, i) => (
              <div key={link.to} style={{ overflow: 'hidden' }}>
                <NavLink
                  ref={el => (linksRef.current[i] = el)}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    display: 'block',
                    fontFamily: 'var(--font-britti), system-ui, sans-serif',
                    fontWeight: 500,
                    fontSize: 'clamp(5.6rem, 15vw, 12rem)',
                    lineHeight: '110%',
                    letterSpacing: '-0.02em',
                    color: isActive ? '#FFFFFF' : '#FFFFFF',
                    textDecoration: 'none',
                    margin: 0,
                  })}
                >
                  {link.label}
                </NavLink>
              </div>
            ))}
            <div style={{ overflow: 'hidden' }}>
              <button
                ref={el => (linksRef.current[MOB_LINKS.length] = el)}
                onClick={handleContact}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-britti), system-ui, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(5.6rem, 15vw, 12rem)',
                  lineHeight: '110%',
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  margin: 0,
                  textAlign: 'left',
                }}
              >
                Contact
              </button>
            </div>

            
          </nav>

          {/* Bottom row / Right column: Email Address */}
          <div ref={rightColRef} style={{ paddingBottom: '3.2rem', display: 'flex' }}>
            <a 
              href="mailto:hello@studione.com"
              style={{
                fontFamily: 'var(--font-britti), system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(2.4rem, 8vw, 4rem)',
                lineHeight: '120%',
                color: '#FFFFFF',
                textDecoration: 'underline',
              }}
            >
              hello@studione.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
