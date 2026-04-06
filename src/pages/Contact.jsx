import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission logic here
    alert('Thanks! We\'ll be in touch soon.')
  }

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'var(--color-brand-card)',
    border: '1px solid var(--color-brand-border)',
    borderRadius: '0.75rem',
    color: 'var(--color-brand-white)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '0.5rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  }

  return (
    <div>
      {/* ── Page Hero ───────────────────── */}
      <section id="contact-hero" style={{ paddingTop: '10rem', paddingBottom: '4rem', background: 'var(--color-brand-black)' }}>
        <div className="container-custom">
          <p style={{ fontSize: '0.8rem', color: 'var(--color-brand-accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Get In Touch</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'var(--color-brand-white)', marginBottom: '1.25rem' }}>
            Let's build something<br />
            <span className="text-gradient-accent">extraordinary</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-brand-text)', maxWidth: '480px', lineHeight: 1.7 }}>
            Tell us about your project. The more detail you share, the better we can tailor our approach to your vision.
          </p>
        </div>
      </section>

      {/* ── Contact Form + Info ──────────── */}
      <section id="contact-body" className="section-padding-sm" style={{ background: 'var(--color-brand-black)', paddingTop: '0' }}>
        <div className="container-custom">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '4rem', alignItems: 'start' }} className="contact-grid">
            {/* Form */}
            <form onSubmit={handleSubmit} id="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                <div>
                  <label htmlFor="name" style={labelStyle}>Your Name</label>
                  <input id="name" name="name" type="text" placeholder="Alex Rivera" value={form.name} onChange={handleChange} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(212,245,122,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-brand-border)'}
                    required />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email Address</label>
                  <input id="email" name="email" type="email" placeholder="alex@studio.co" value={form.email} onChange={handleChange} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(212,245,122,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-brand-border)'}
                    required />
                </div>
              </div>

              <div>
                <label htmlFor="company" style={labelStyle}>Company / Brand</label>
                <input id="company" name="company" type="text" placeholder="Your company name" value={form.company} onChange={handleChange} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(212,245,122,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-brand-border)'} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row">
                <div>
                  <label htmlFor="service" style={labelStyle}>Service Needed</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(212,245,122,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-brand-border)'}>
                    <option value="" disabled>Select a service</option>
                    <option>Brand Identity</option>
                    <option>Web Design</option>
                    <option>UI/UX Design</option>
                    <option>Motion & Animation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" style={labelStyle}>Project Budget</label>
                  <select id="budget" name="budget" value={form.budget} onChange={handleChange}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(212,245,122,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-brand-border)'}>
                    <option value="" disabled>Select budget range</option>
                    <option>$5k — $10k</option>
                    <option>$10k — $25k</option>
                    <option>$25k — $50k</option>
                    <option>$50k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>Project Details</label>
                <textarea
                  id="message" name="message" rows={6}
                  placeholder="Tell us about your project, goals, and timeline..."
                  value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '160px' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(212,245,122,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-brand-border)'}
                  required
                />
              </div>

              <button type="submit" id="contact-submit" className="btn-primary" style={{ alignSelf: 'flex-start', fontSize: '0.95rem', padding: '1rem 2rem' }}>
                Send Message
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>

            {/* Contact Info Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Status */}
              <div style={{
                background: 'rgba(212,245,122,0.06)',
                border: '1px solid rgba(212,245,122,0.15)',
                borderRadius: 'var(--radius-card)',
                padding: '1.75rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                  <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                    <span className="animate-ping-slow" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--color-brand-accent)' }} />
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-brand-accent)', display: 'block', position: 'relative' }} />
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-brand-accent)' }}>Currently Available</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-brand-text)', lineHeight: 1.6 }}>
                  We're accepting new projects for Q2 2025. Reach out early to secure your spot.
                </p>
              </div>

              {/* Contact Details */}
              <div style={{ background: 'var(--color-brand-card)', border: '1px solid var(--color-brand-border)', borderRadius: 'var(--radius-card)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { label: 'Email', value: 'hello@studione.co', href: 'mailto:hello@studione.co' },
                  { label: 'Response Time', value: 'Within 24 hours', href: null },
                  { label: 'Location', value: 'Remote — Worldwide', href: null },
                ].map((item) => (
                  <div key={item.label}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: '0.9rem', color: 'var(--color-brand-accent)', textDecoration: 'none', fontWeight: 600 }}>{item.value}</a>
                    ) : (
                      <p style={{ fontSize: '0.9rem', color: 'var(--color-brand-white)', fontWeight: 500 }}>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div style={{ background: 'var(--color-brand-card)', border: '1px solid var(--color-brand-border)', borderRadius: 'var(--radius-card)', padding: '1.75rem' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>Follow Our Work</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {['Instagram', 'Twitter / X', 'Behance', 'Dribbble'].map(social => (
                    <a key={social} href="#" style={{ fontSize: '0.875rem', color: 'var(--color-brand-text)', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--color-brand-white)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--color-brand-text)'}
                    >
                      {social}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 11L11 1M11 1H4M11 1v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .contact-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 600px) {
            .form-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </div>
  )
}
