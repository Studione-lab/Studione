const projects = [
  { title: 'Lumena Brand Identity', category: 'Branding', year: '2024', accent: '#d4f57a', desc: 'Complete visual identity for a luxury wellness brand.' },
  { title: 'Vero Finance App', category: 'UI/UX Design', year: '2024', accent: '#9747FF', desc: 'Mobile-first financial platform redesign.' },
  { title: 'Arca Studio Website', category: 'Web Design', year: '2023', accent: '#e8601a', desc: 'Portfolio and brand presence for an architecture firm.' },
  { title: 'Novu Design System', category: 'Product Design', year: '2023', accent: '#d4f57a', desc: 'Scalable component library for a SaaS platform.' },
  { title: 'Soleil Editorial Brand', category: 'Branding', year: '2023', accent: '#e8d5b0', desc: 'Brand identity and art direction for a media publication.' },
  { title: 'Oura App Concept', category: 'UI/UX Design', year: '2022', accent: '#9747FF', desc: 'Conceptual redesign of a health tracking experience.' },
]

export default function Work() {
  return (
    <div>
      {/* ── Page Hero ───────────────────── */}
      <section id="work-hero" style={{ paddingTop: '10rem', paddingBottom: '4rem', background: 'var(--color-brand-black)' }}>
        <div className="container-custom">
          <p style={{ fontSize: '0.8rem', color: 'var(--color-brand-accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Portfolio</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--color-brand-white)', maxWidth: '700px' }}>
              Work that<br /><span className="text-gradient-accent">speaks for itself</span>
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--color-brand-text)', maxWidth: '340px', lineHeight: 1.7 }}>
              A curated selection of projects spanning brand identity, digital products, and web experiences.
            </p>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ──────────────────── */}
      <section id="work-filters" style={{ padding: '1.5rem 0', background: 'var(--color-brand-black)', borderBottom: '1px solid var(--color-brand-border)', position: 'sticky', top: '72px', zIndex: 100, backdropFilter: 'blur(16px)' }}>
        <div className="container-custom" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {['All', 'Branding', 'Web Design', 'UI/UX Design', 'Product Design'].map((filter, i) => (
            <button
              key={filter}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                background: i === 0 ? 'var(--color-brand-accent)' : 'var(--color-brand-card)',
                color: i === 0 ? 'var(--color-brand-black)' : 'var(--color-brand-text)',
                border: i === 0 ? 'none' : '1px solid var(--color-brand-border)',
                fontSize: '0.825rem',
                fontWeight: i === 0 ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* ── Projects Grid ───────────────── */}
      <section id="work-grid" className="section-padding" style={{ background: 'var(--color-brand-black)' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', gap: '1.5rem' }}>
            {projects.map((project, i) => (
              <article
                key={project.title}
                className="card-hover"
                style={{
                  background: 'var(--color-brand-card)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-brand-border)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  ...(i === 0 || i === 3 ? { gridColumn: 'span 2' } : {}),
                }}
              >
                <div style={{
                  aspectRatio: (i === 0 || i === 3) ? '16/7' : '4/3',
                  background: `linear-gradient(135deg, ${project.accent}18 0%, var(--color-brand-muted) 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '3rem', opacity: 0.4 }}>✦</span>
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                    <span style={{
                      padding: '0.3rem 0.75rem', borderRadius: '999px',
                      background: `${project.accent}15`, color: project.accent,
                      fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>{project.category}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-brand-text)' }}>{project.year}</span>
                  </div>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-brand-white)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{project.title}</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-brand-text)', lineHeight: 1.6 }}>{project.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 640px) {
            #work-grid article { grid-column: span 1 !important; }
          }
        `}</style>
      </section>
    </div>
  )
}
