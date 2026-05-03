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
  fontStyle:  'normal',
  fontWeight: 400,
  fontSize:   '13px',
  lineHeight: '20px',
  letterSpacing: '0.28px',
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
        padding: '120px 40px 32px',
        gap: '220px',
        width: '100%',
        background: '#020202',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .footer-container { padding: 148px 16px 24px !important; gap: 58px !important; }
          .footer-contact { gap: 0 !important; height: 144px !important; width: 100% !important; }
          .footer-tagline { font-size: 36px !important; height: 108px !important; }
          .footer-email { font-size: 36px !important; height: 36px !important; line-height: 100% !important; }
          .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .footer-social { gap: 8px !important; }
          .footer-social-link { font-size: 14px !important; }
          .footer-copyright { font-size: 14px !important; }
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
          gap: '16px',
          maxWidth: '843px',
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
            fontStyle:  'normal',
            fontWeight: 300,
            fontSize:   'clamp(36px, 6.5vw, 80px)',
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
            fontStyle:  'normal',
            fontWeight: 400,
            fontSize:   'clamp(28px, 6.5vw, 80px)',
            lineHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '1px',
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
          gap: '16px',
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
            gap: '14px',
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
            fontStyle:  'normal',
            fontWeight: 400,
            fontSize:   '13.8px',
            lineHeight: '20px',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'right',
            letterSpacing: '0.28px',
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
        @media (max-width: 768px) {
          #footer {
            padding: 72px 20px 32px !important;
            gap: 80px !important;
          }
          #footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          #footer-copyright {
            text-align: left !important;
          }
          #footer-social {
            flex-wrap: wrap !important;
            gap: 12px 16px !important;
          }
        }
        @media (max-width: 480px) {
          #footer-tagline {
            font-size: clamp(28px, 9vw, 44px) !important;
          }
          #footer-email {
            font-size: clamp(22px, 7vw, 36px) !important;
            line-height: 1.2 !important;
          }
        }
      `}</style>
    </footer>
  )
}
