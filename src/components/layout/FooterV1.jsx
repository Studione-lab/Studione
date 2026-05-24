// ─── Social links data ─────────────────────────────────────────
const SOCIAL_LINKS = [
  { label: 'LinkedIn',  href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Contra',    href: '#' },
  { label: 'Twitter',   href: '#' },
]

// ─── Shared social link style — Britti 18px underline ─────────
const socialLinkStyle = {
  fontFamily: "'Britti Sans Trial', 'DM Sans', 'Inter Tight', system-ui, sans-serif",
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '1.8rem',
  lineHeight: '1.25',
  letterSpacing: '0.028rem',
  textDecorationLine: 'underline',
  textDecoration: 'underline',
  color: '#FFFFFF',
  flexShrink: 0,
}

export default function FooterV1() {
  return (
    <>
      <footer
        id="footer-v1"
        style={{
          position: 'relative',
          width: '100%',
          background: '#020202',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          padding: '0 4rem',
          minHeight: '57.7rem',
          overflow: 'hidden',
        }}
      >
        {/* ══ Top bar — social links + copyright (~213px from top) ══ */}
        <div
          id="footer-v1-top"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '21.3rem',
          }}
        >
          {/* Social links — gap 14px */}
          <nav
            id="footer-v1-social"
            aria-label="Social links"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1.4rem',
            }}
          >
            {SOCIAL_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                id={`footer-v1-social-${link.label.toLowerCase()}`}
                style={{ ...socialLinkStyle, order: i }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <span
            id="footer-v1-copyright"
            style={{
              fontFamily: "'Britti Sans Trial', 'DM Sans', 'Inter Tight', system-ui, sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '1.8rem',
              lineHeight: '1.25',
              letterSpacing: '0.028rem',
              color: 'rgba(255, 255, 255, 0.5)',
              textAlign: 'right',
              whiteSpace: 'nowrap',
            }}
          >
            © Studione {new Date().getFullYear()}
          </span>
        </div>

        {/* ══ Bottom bar — large wordmark + email ══════════════════ */}
        <div
          id="footer-v1-bottom"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginTop: 'auto',
            paddingTop: '4rem',
          }}
        >
          {/* Large "Studione" wordmark — Britti 192px weight 300 */}
          <span
            id="footer-v1-wordmark"
            style={{
              fontFamily: "'Britti Sans Trial', 'DM Sans', 'Inter Tight', system-ui, sans-serif",
              fontStyle: 'normal',
              fontWeight: 300,
              fontSize: 'clamp(7.2rem, 13vw, 19.2rem)',
              lineHeight: '100%',
              textTransform: 'capitalize',
              color: '#FFFFFF',
              display: 'block',
              userSelect: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            Studione
          </span>

          {/* Contact email — Britti 40px, 50% white, underlined */}
          <a
            id="footer-v1-email"
            href="mailto:hello@studione.com"
            style={{
              fontFamily: "'Britti Sans Trial', 'DM Sans', 'Inter Tight', system-ui, sans-serif",
              fontStyle: 'normal',
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 2.8vw, 4rem)',
              lineHeight: '6rem',
              letterSpacing: '0.1rem',
              textDecorationLine: 'underline',
              textDecoration: 'underline',
              color: 'rgba(255, 255, 255, 0.5)',
              alignSelf: 'flex-end',
              paddingBottom: '1.6rem',
              whiteSpace: 'nowrap',
            }}
          >
            hello@studione.com
          </a>
        </div>
      </footer>

      {/* ── Responsive overrides ────────────────────────────────── */}
      <style>{`
        @media (max-width: 64em) {
          #footer-v1 { padding-left: 2.8rem !important; padding-right: 2.8rem !important; }
        }
        @media (max-width: 48em) {
          #footer-v1 {
            padding: 0 2rem !important;
            min-height: auto !important;
          }
          #footer-v1-top {
            padding-top: 13.6rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.4rem !important;
          }
          #footer-v1-social {
            flex-wrap: wrap !important;
            gap: 1rem 1.4rem !important;
          }
          #footer-v1-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.2rem !important;
            padding-bottom: 3.2rem !important;
          }
          #footer-v1-email {
            align-self: flex-start !important;
            padding-bottom: 0 !important;
            line-height: 1.4 !important;
          }
        }
        @media (max-width: 30em) {
          #footer-v1-wordmark { font-size: clamp(6rem, 18vw, 10rem) !important; }
        }
      `}</style>
    </>
  )
}
