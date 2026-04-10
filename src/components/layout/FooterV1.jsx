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
  fontStyle:  'normal',
  fontWeight: 400,
  fontSize:   '18px',
  lineHeight: '20px',
  letterSpacing: '0.28px',
  textDecorationLine: 'underline',
  textDecoration:     'underline',
  color: '#FFFFFF',
  flexShrink: 0,
}

export default function FooterV1() {
  return (
    <>
      <footer
        id="footer-v1"
        style={{
          position:   'relative',
          width:      '100%',
          background: '#1B1B1B',
          boxSizing:  'border-box',
          display:    'flex',
          flexDirection: 'column',
          padding: '0 40px',
          minHeight: '577px',
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
            paddingTop:    '213px',
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
              gap: '14px',
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
              fontStyle:  'normal',
              fontWeight: 400,
              fontSize:   '18px',
              lineHeight: '20px',
              letterSpacing: '0.28px',
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
            marginTop:     'auto',
            paddingTop:    '40px',
          }}
        >
          {/* Large "Studione" wordmark — Britti 192px weight 300 */}
          <span
            id="footer-v1-wordmark"
            style={{
              fontFamily: "'Britti Sans Trial', 'DM Sans', 'Inter Tight', system-ui, sans-serif",
              fontStyle:  'normal',
              fontWeight: 300,
              fontSize:   'clamp(72px, 13vw, 192px)',
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
              fontStyle:  'normal',
              fontWeight: 300,
              fontSize:   'clamp(18px, 2.8vw, 40px)',
              lineHeight: '60px',
              letterSpacing: '1px',
              textDecorationLine: 'underline',
              textDecoration:     'underline',
              color: 'rgba(255, 255, 255, 0.5)',
              alignSelf: 'flex-end',
              paddingBottom: '16px',
              whiteSpace: 'nowrap',
            }}
          >
            hello@studione.com
          </a>
        </div>
      </footer>

      {/* ── Responsive overrides ────────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          #footer-v1 { padding-left: 28px !important; padding-right: 28px !important; }
        }
        @media (max-width: 768px) {
          #footer-v1 {
            padding: 0 20px !important;
            min-height: auto !important;
          }
          #footer-v1-top {
            padding-top: 60px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
          }
          #footer-v1-social {
            flex-wrap: wrap !important;
            gap: 10px 14px !important;
          }
          #footer-v1-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            padding-bottom: 32px !important;
          }
          #footer-v1-email {
            align-self: flex-start !important;
            padding-bottom: 0 !important;
            line-height: 1.4 !important;
          }
        }
        @media (max-width: 480px) {
          #footer-v1-wordmark { font-size: clamp(60px, 18vw, 100px) !important; }
        }
      `}</style>
    </>
  )
}
