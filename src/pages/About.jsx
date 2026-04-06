export default function About() {
  return (
    <div>
      {/* ── Page Hero ───────────────────── */}
      <section
        id="about-hero"
        style={{
          paddingTop: '10rem',
          paddingBottom: '5rem',
          background: 'var(--color-brand-black)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(212,245,122,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container-custom">
          <div style={{ maxWidth: '800px' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-brand-accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              About Studione
            </p>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'var(--color-brand-white)',
              marginBottom: '1.5rem',
            }}>
              Design is how we<br />
              <span className="text-gradient-accent">change the world</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-brand-text)', lineHeight: 1.8, maxWidth: '560px' }}>
              We're a tight-knit team of designers, strategists, and storytellers united by a passion for craft and a belief that design has the power to transform businesses.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission / Values ────────────── */}
      <section id="values" className="section-padding" style={{ background: 'var(--color-brand-dark)' }}>
        <div className="container-custom">
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '4rem', alignItems: 'start',
          }} className="values-grid">
            <div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--color-brand-white)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                Our philosophy
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-brand-text)', lineHeight: 1.8, marginBottom: '1rem' }}>
                Great design never exists in a vacuum. We start with deep discovery — learning your business, your audience, and your aspirations — before a single pixel is placed.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-brand-text)', lineHeight: 1.8 }}>
                This foundation allows us to create work that isn't just visually stunning, but strategically sound and emotionally resonant.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { num: '01', title: 'Purpose over aesthetics', desc: 'Every design decision serves a clear purpose beyond looking good.' },
                { num: '02', title: 'Collaboration always', desc: 'We treat every client relationship as a true creative partnership.' },
                { num: '03', title: 'Details define excellence', desc: 'Perfection lives in the details most people never consciously notice.' },
              ].map((v) => (
                <div key={v.num} style={{
                  display: 'flex', gap: '1.25rem',
                  padding: '1.5rem',
                  background: 'var(--color-brand-card)',
                  borderRadius: '1rem',
                  border: '1px solid var(--color-brand-border)',
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-brand-accent)', letterSpacing: '0.05em', flexShrink: 0, marginTop: '2px' }}>{v.num}</span>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-brand-white)', marginBottom: '0.4rem' }}>{v.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-brand-text)', lineHeight: 1.6 }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .values-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          }
        `}</style>
      </section>

      {/* ── Team Section ────────────────── */}
      <section id="team" className="section-padding" style={{ background: 'var(--color-brand-black)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-brand-accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The Team</p>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--color-brand-white)', lineHeight: 1.1 }}>
              The people behind the work
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: '1.5rem' }}>
            {[
              { name: 'Alex Rivera', role: 'Creative Director', initials: 'AR' },
              { name: 'Mia Tanaka', role: 'Lead Designer', initials: 'MT' },
              { name: 'Johan Osei', role: 'Brand Strategist', initials: 'JO' },
              { name: 'Lena Müller', role: 'UX Researcher', initials: 'LM' },
            ].map((member) => (
              <div
                key={member.name}
                className="card-hover"
                style={{
                  background: 'var(--color-brand-card)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--color-brand-border)',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  aspectRatio: '1',
                  background: 'var(--color-brand-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', fontWeight: 800, color: 'rgba(255,255,255,0.15)',
                  letterSpacing: '-0.02em',
                }}>
                  {member.initials}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-brand-white)' }}>{member.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-brand-text)', marginTop: '0.2rem' }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
