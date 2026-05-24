// ─── Footer social links ───────────────────────────────────────
const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Contra',    href: '#' },
  { label: 'Twitter',   href: '#' },
]

// ─── Shared social link style ──────────────────────────────────
const socialLinkStyle = {
  fontFamily: "'Britti Sans Trial', 'Inter Tight', system-ui, sans-serif",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '1.3rem',
  lineHeight: '1.25',
  letterSpacing: '0.028rem',
  textDecorationLine: 'underline',
  color: '#FFFFFF',
  textDecoration: 'underline',
  flexShrink: 0,
}

export default function Footer() {
  return (
    <footer
      id="footer"
      className="footer-container"
      style={{
        /* ── Spec: padding 120px 40px 32px, gap 220px ── */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '12rem 4rem 3.2rem',
        gap: '22rem',
        width: '100%',
        background: '#020202',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @media (max-width: 47.938em) {
          .footer-container { padding: 14.8rem 1.6rem 2.4rem !important; gap: 5.8rem !important; }
          .footer-contact { gap: 0 !important; height: 14.4rem !important; width: 100% !important; }
          .footer-tagline { font-size: 3.6rem !important; height: 10.8rem !important; }
          .footer-email { font-size: 3.6rem !important; height: 3.6rem !important; line-height: 100% !important; }
          .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 1.6rem !important; }
          .footer-social { gap: 0.8rem !important; }
          .footer-social-link { font-size: 1.4rem !important; }
          .footer-copyright { font-size: 1.4rem !important; }
        }
      `}</style>

      {/* ══ Block 1: Contact Info ═══════════════════════════════════ */}
      <div
        id="footer-contact"
        className="footer-contact"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 0,
          gap: '1.6rem',
          maxWidth: '84.3rem',
          width: '100%',
          flex: 'none',
          order: 0,
          flexGrow: 0,
        }}
      >
        {/* Tagline — Britti 80px 300wt, white */}
        <p
          id="footer-tagline"
          className="footer-tagline"
          style={{
            fontFamily: "'Britti Sans Trial', 'Inter Tight', system-ui, sans-serif",
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: 'clamp(3.6rem, 6.5vw, 8rem)',
            lineHeight: '100%',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            margin: 0,
            flex: 'none',
            order: 0,
            flexGrow: 0,
          }}
        >
          Every Brand Has A Story Waiting To Ignite.
        </p>

        {/* Email address — Britti 80px 400wt, 50% white, underlined, 60px line-height */}
        <a
          id="footer-email"
          className="footer-email"
          href="mailto:hello@studione.com"
          style={{
            fontFamily: "'Britti Sans Trial', 'Inter Tight', system-ui, sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 'clamp(2.8rem, 6.5vw, 8rem)',
            lineHeight: '6rem',
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '0.1rem',
            textDecorationLine: 'underline',
            textDecoration: 'underline',
            color: 'rgba(255, 255, 255, 0.5)',
            flex: 'none',
            order: 1,
            flexGrow: 0,
          }}
        >
          hello@studione.com
        </a>
      </div>

      {/* ══ Block 2: Bottom bar — social links + copyright ══════════ */}
      <div
        id="footer-bottom"
        className="footer-bottom"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0,
          gap: '1.6rem',
          width: '100%',
          flex: 'none',
          order: 1,
          alignSelf: 'stretch',
          flexGrow: 0,
        }}
      >
        {/* Social links row — gap 14px */}
        <nav
          id="footer-social"
          className="footer-social"
          aria-label="Social links"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 0,
            gap: '1.4rem',
            flex: 'none',
            order: 0,
            flexGrow: 0,
          }}
        >
          {SOCIAL_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              id={`footer-social-${link.label.toLowerCase()}`}
              className="footer-social-link"
              style={{
                ...socialLinkStyle,
                order: i,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright notice — Britti 13.8px, 50% white, text-align right */}
        <span
          id="footer-copyright"
          className="footer-copyright"
          style={{
            fontFamily: "'Britti Sans Trial', 'Inter Tight', system-ui, sans-serif",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '1.38rem',
            lineHeight: '1.25',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'right',
            letterSpacing: '0.028rem',
            color: 'rgba(255, 255, 255, 0.5)',
            flex: 'none',
            order: 1,
            flexGrow: 0,
            whiteSpace: 'nowrap',
          }}
        >
          © Studione {new Date().getFullYear()}
        </span>
      </div>

      {/* ── Responsive overrides ──────────────────────────────────── */}
      <style>{`
        @media (max-width: 48em) {
          #footer {
            padding: 7.2rem 2rem 3.2rem !important;
            gap: 8rem !important;
          }
          #footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 2rem !important;
          }
          #footer-copyright {
            text-align: left !important;
          }
          #footer-social {
            flex-wrap: wrap !important;
            gap: 1.2rem 1.6rem !important;
          }
        }
        @media (max-width: 30em) {
          #footer-tagline {
            font-size: clamp(2.8rem, 9vw, 4.4rem) !important;
          }
          #footer-email {
            font-size: clamp(2.2rem, 7vw, 3.6rem) !important;
            line-height: 1.2 !important;
          }
        }
      `}</style>
    </footer>
  )
}
