const services = [
  {
    num: '01',
    title: 'Brand Identity',
    accent: '#d4f57a',
    desc: 'Your brand is more than a logo — it\'s the sum of every impression you make. We develop comprehensive brand identities that communicate your values with clarity and impact.',
    deliverables: ['Logo & Mark Design', 'Color System', 'Typography Scale', 'Brand Guidelines', 'Iconography', 'Stationery Design'],
  },
  {
    num: '02',
    title: 'Web Design & Development',
    accent: '#9747FF',
    desc: 'Websites that don\'t just look beautiful, but convert visitors into believers. We design and build high-performance web experiences from concept to deployment.',
    deliverables: ['UX Strategy', 'Responsive Design', 'CMS Integration', 'Performance Optimization', 'Interaction Design', 'SEO Foundation'],
  },
  {
    num: '03',
    title: 'UI/UX Design',
    accent: '#e8601a',
    desc: 'Digital products that users love to use. We apply research-driven methods to create interfaces that feel effortless, intuitive, and genuinely enjoyable.',
    deliverables: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing', 'Design Systems', 'Handoff Documentation'],
  },
  {
    num: '04',
    title: 'Motion & Animation',
    accent: '#e8d5b0',
    desc: 'Stillness is forgettable. Motion brings your brand to life — from micro-interactions to full campaign animations that stop the scroll.',
    deliverables: ['Brand Animation', 'UI Micro-interactions', 'Explainer Videos', 'Social Content', 'Lottie Files', 'Scroll Animations'],
  },
]

export default function Services() {
  return (
    <div>
      {/* ── Page Hero ───────────────────── */}
      <section id="services-hero" style={{ paddingTop: '10rem', paddingBottom: '5rem', background: 'var(--color-brand-black)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(212,245,122,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container-custom" style={{ textAlign: 'center', position: 'relative' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-brand-accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Services</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--color-brand-white)', marginBottom: '1.5rem' }}>
            Everything you need<br />
            <span className="text-gradient-accent">to stand out</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-brand-text)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            From brand inception to digital execution, we offer an end-to-end creative service designed to grow your business.
          </p>
        </div>
      </section>

      {/* ── Services List ────────────────── */}
      <section id="services-list" className="section-padding" style={{ background: 'var(--color-brand-black)' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {services.map((service, i) => (
              <div
                key={service.num}
                id={`service-${service.num}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: '2rem',
                  padding: '3rem 0',
                  borderBottom: '1px solid var(--color-brand-border)',
                  transition: 'background 0.3s ease',
                  borderRadius: '0',
                  cursor: 'default',
                  alignItems: 'start',
                }}
                className="service-row"
              >
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-brand-accent)', letterSpacing: '0.05em' }}>{service.num}</span>
                </div>
                <div>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--color-brand-white)', marginBottom: '1rem', lineHeight: 1.2 }}>{service.title}</h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-brand-text)', lineHeight: 1.8, maxWidth: '560px', marginBottom: '1.5rem' }}>{service.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {service.deliverables.map(d => (
                      <span
                        key={d}
                        style={{
                          padding: '0.35rem 0.85rem',
                          borderRadius: '999px',
                          background: `${service.accent}10`,
                          border: `1px solid ${service.accent}25`,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: service.accent,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: `${service.accent}12`,
                  border: `1px solid ${service.accent}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '4px',
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke={service.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Section ──────────────── */}
      <section id="process" className="section-padding" style={{ background: 'var(--color-brand-dark)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-brand-accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>How We Work</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--color-brand-white)', lineHeight: 1.1 }}>Our process</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '1.5rem' }}>
            {[
              { step: '1', title: 'Discovery', desc: 'We dive deep into your business, goals, audience, and competitive landscape.' },
              { step: '2', title: 'Strategy', desc: 'We synthesize insights into a clear creative and strategic direction.' },
              { step: '3', title: 'Design', desc: 'We craft solutions with precision, iteration, and creative ambition.' },
              { step: '4', title: 'Deliver', desc: 'We hand off polished assets with thorough documentation and ongoing support.' },
            ].map((step) => (
              <div
                key={step.step}
                style={{
                  background: 'var(--color-brand-card)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-brand-border)',
                  padding: '2.25rem',
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'var(--color-brand-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-brand-black)',
                  marginBottom: '1.5rem',
                }}>
                  {step.step}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-brand-white)', marginBottom: '0.75rem' }}>{step.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-brand-text)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
