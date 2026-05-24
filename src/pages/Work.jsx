import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS, FILTERS } from '../data/projectData'
import WorkHeroImg1 from '../assets/Image/Work/WorkHeroImage.jfif'
import WorkHeroImg2 from '../assets/Image/Work/WorkHeroImage2.jfif'
import WorkHeroImg3 from '../assets/Image/Work/WorkHeroImage3.jfif'

// ─────────────────────────────────────────────────────────────────
// (Data imported from ../data/projectData.js)
// ─────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────
// Image placeholder
// ─────────────────────────────────────────────────────────────────
function ImgPlaceholder({ src, alt = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none' }}
      />
    )
  }
  return (
    <div style={{ width: '100%', height: '100%', background: '#232222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.25">
        <rect x="4" y="4" width="32" height="32" rx="4" stroke="#FFF" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="3" stroke="#FFF" strokeWidth="1.5" />
        <path d="M4 28l9-9 6 6 4-4 13 13" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// TAG PILL
// ─────────────────────────────────────────────────────────────────
function TagPill({ label }) {
  return (
    <div
      className="work-tag-pill"
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        gap: '1rem',
        height: '4.5rem',
        background: 'rgba(43, 43, 43, 0.50)',
        flexShrink: 0,
      }}
    >
      <span
        className="work-tag-text"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 300,
          fontSize: '1.7rem',
          lineHeight: '140%',
          letterSpacing: '-0.02em',
          color: '#C0C0C0',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const { title, tags, desc, src, imgH, cardW, comingSoon, category, slug } = project

  const cardContent = (
    /* Image card — flex-grow: 0, fixed width, flex-shrink: 0 */
    <div
      className="work-project-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 0,
        gap: '2rem',
        width: `${cardW}px`,
        flexGrow: 0,
        flexShrink: 0,
        cursor: comingSoon ? 'default' : 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ─────────────────────────────────────────────── */}
      <div
        className="work-project-img-wrapper"
        style={{
          position: 'relative',
          width: `${cardW}px`,
          height: `${imgH}px`,
          background: '#232222',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <ImgPlaceholder src={src} alt={title} />

        {/* Category badge — hidden by default, visible on hover */}
        {/* Spec: position absolute, left 18px, top 18px, bg #1B1B1B, borderRadius 32px */}
        <div
          style={{
            position: 'absolute',
            left: '1.8rem',
            top: '1.8rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.2rem 2.4rem',
            gap: '1rem',
            width: '13.5rem',
            height: '4.4rem',
            background: '#020202',
            borderRadius: '32px',
            boxSizing: 'border-box',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.22s ease',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400,
              fontSize: '1.26rem',
              lineHeight: '1.25',
              letterSpacing: '0.028rem',
              color: '#FFFFFF',
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            {category}
          </span>
        </div>

        {/* Coming Soon overlay — card 1 only */}
        {/* Spec: position absolute, left 228px, top calc(50% - 45px/2) */}
        {comingSoon && (
          <div
            style={{
              position: 'absolute',
              left: '22.8rem',
              top: 'calc(50% - 2.25rem)',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem',
              gap: '1rem',
              width: '13.1rem',
              height: '4.5rem',
              background: 'rgba(43, 43, 43, 0.50)',
              backdropFilter: 'blur(4.3px)',
              WebkitBackdropFilter: 'blur(4.3px)',
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 300,
                fontSize: '1.7rem',
                lineHeight: '140%',
                letterSpacing: '-0.02em',
                color: '#C0C0C0',
                whiteSpace: 'nowrap',
              }}
            >
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* ── Card content ──────────────────────────────────────── */}
      <div
        className="work-project-info"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 0,
          gap: '1.6rem',
          width: `${cardW}px`,
          flexShrink: 0,
        }}
      >
        {/* Card header: title (left) + tag pills (right) */}
        <div
          className="work-project-header"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
            gap: '1.6rem',
            width: `${cardW}px`,
            height: '4.5rem',
          }}
        >
          {/* Card title */}
          <span
            className="work-project-title"
            style={{
              fontFamily: 'var(--font-britti)',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '2.4rem',
              lineHeight: '1.75',
              letterSpacing: '0.01em',
              color: '#FFFFFF',
              flexShrink: 0,
            }}
          >
            {title}
          </span>

          {/* Tag pills — flex row, gap 16px (for multiple) */}
          <div
            className="work-project-tags"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              padding: 0,
              gap: '1.6rem',
              flexShrink: 0,
            }}
          >
            {tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* Card description */}
        <p
          className="work-project-desc"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '1.7rem',
            lineHeight: '140%',
            letterSpacing: '-0.02em',
            color: '#C0C0C0',
            margin: 0,
            width: `${cardW}px`,
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  )

  // comingSoon projects are NOT clickable
  if (comingSoon) {
    return cardContent
  }

  // Wrap clickable projects in a Link
  return (
    <Link
      to={`/work/${slug}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {cardContent}
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────
// WORK PAGE
// ─────────────────────────────────────────────────────────────────
export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(activeFilter))

  return (
    <div style={{ background: '#1B1B1B', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════
          HERO — padding 196px 40px 40px, flex-column, gap 20px
      ════════════════════════════════════════════════════════════ */}
      <section
        id="work-hero"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '19.6rem 4rem 4rem',
          gap: '2rem',
          width: '100%',
          boxSizing: 'border-box',
          background: '#020202',
        }}
      >
        <p
          id="work-eyebrow"
          style={{
            fontFamily: 'var(--font-britti)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '3.2rem',
            lineHeight: '125%',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            margin: 0,
            alignSelf: 'stretch',
          }}
        >
          Our work
        </p>

        <h1
          id="work-tagline"
          style={{
            fontFamily: 'var(--font-britti)',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: 'clamp(4rem, 5.5vw, 8rem)',
            lineHeight: '100%',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            margin: 0,
            alignSelf: 'flex-start',
            textAlign: 'left',
            maxWidth: '98.8rem',
          }}
        >
          Every Project Starts with a Problem Worth Solving.
        </h1>
      </section>

      {/* ══════════════════════════════════════════════════════════
          IMAGE SECTION — 3 images positioned per Figma spec
      ════════════════════════════════════════════════════════════ */}
      <section
        id="work-images"
        style={{
          position: 'relative',
          width: '100%',
          height: '70.4rem',
          background: '#020202',
          overflow: 'hidden',
        }}
      >
        {/* Frame: 1296 × 336 centred */}
        <div
          style={{
            position: 'absolute',
            width: '129.6rem',
            height: '33.6rem',
            left: 'calc(50% - 64.8rem - 4.1rem)',
            top: '18.2rem',
          }}
        >
          {/* Image 1 — 460 × 336, left */}
          <div style={{ position: 'absolute', width: '46rem', height: '33.6rem', left: 'calc(50% - 23rem - 41.8rem)', top: 0, overflow: 'hidden' }}>
            <ImgPlaceholder src={WorkHeroImg1} alt="Money Talks Softly" />
          </div>
          {/* Image 2 — 358 × 241, right */}
          <div style={{ position: 'absolute', width: '35.8rem', height: '24.1rem', left: 'calc(50% - 17.9rem + 46.9rem)', top: '6rem', overflow: 'hidden' }}>
            <ImgPlaceholder src={WorkHeroImg2} alt="Àkawó" />
          </div>
          {/* Image 3 — 290 × 195, mid-centre */}
          <div style={{ position: 'absolute', width: '29rem', height: '19.5rem', left: 'calc(50% - 14.5rem + 5.1rem)', top: '9.4rem', overflow: 'hidden' }}>
            <ImgPlaceholder src={WorkHeroImg3} alt="City Brand Identity" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          ALL WORK — padding 0 40px 196px, flex-column, gap 100px
      ════════════════════════════════════════════════════════════ */}
      <section
        id="work-all"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0 4rem 19.6rem',
          gap: '10rem',
          width: '100%',
          boxSizing: 'border-box',
          background: '#020202',
        }}
      >
        {/* ── Header: "All Work" left + filter column right ───── */}
        {/* Spec: flex-row, space-between, padding-top 96px, width 1200px */}
        <div
          id="work-all-header"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingTop: '9.6rem',
            gap: '4rem',
            width: '120rem',
          }}
        >
          {/* "All Work" */}
          <span
            id="work-all-title"
            style={{
              fontFamily: 'var(--font-britti)',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '3.2rem',
              lineHeight: '125%',
              textTransform: 'capitalize',
              color: '#FFFFFF',
              flexShrink: 0,
            }}
          >
            All Work
          </span>

          {/* Filter list — column, align-end, gap 16px */}
          <div
            id="work-filters-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              padding: 0,
              gap: '1.6rem',
            }}
          >
            {FILTERS.map((f) => {
              const active = activeFilter === f
              return (
                <button
                  key={f}
                  className="work-filter-btn"
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontFamily: 'var(--font-britti)',
                    fontStyle: 'normal',
                    fontWeight: 300,
                    fontSize: '1.8rem',
                    lineHeight: '100%',
                    textAlign: 'right',
                    textTransform: 'capitalize',
                    textDecoration: active ? 'underline' : 'none',
                    color: active ? '#FFFFFF' : '#595959',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'color 0.18s ease',
                  }}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Cards grid ────────────────────────────────────────── */}
        {/*
            Spec: flex-row, flex-wrap, align-items flex-start,
                  align-content flex-start, gap 120px 105px, width 1200px
            Row 1: 62.3rem + 105px gap + 472px = 1200px
            Row 2: 48.8rem + 105px gap + 607px = 1200px
            All cards: flex-grow 0, flex-shrink 0
        */}
        <div
          id="work-cards-grid"
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            padding: 0,
            gap: '12rem 10.5rem',
            width: '120rem',
            background: '#020202',
          }}
        >
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 47.938em) {
          /* Hero Section Mobile */
          #work-hero {
            padding: 14.2rem 1.6rem 4.8rem !important;
            gap: 1rem !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
          }
          #work-eyebrow {
            font-size: 2.4rem !important;
            text-align: left !important;
          }
          #work-tagline {
            font-size: 3.2rem !important;
            text-align: left !important;
            max-width: 100% !important;
            align-self: flex-start !important;
          }
          
          /* Hide the desktop images grid on mobile or stack them */
          #work-images {
            display: none !important; /* Mobile designs usually hide or reshape this */
          }

          /* Work Section Mobile */
          #work-all {
            padding: 0rem 1.6rem 6.4rem !important;
            gap: 3.2rem !important;
          }
          #work-all-header {
            width: 100% !important;
            padding-top: 0rem !important;
            flex-direction: column !important;
            gap: 3.2rem !important;
          }
          #work-all-title {
            display: none !important; /* Based on the mobile mockups, title is not visible there */
          }
          
          /* Filters Mobile */
          #work-filters-container {
            flex-direction: row !important;
            align-items: flex-start !important;
            flex-wrap: wrap !important;
            gap: 1.6rem !important;
            width: 100% !important;
          }
          .work-filter-btn {
            font-size: 1.6rem !important;
            text-align: left !important;
          }

          /* Articles Container Mobile */
          #work-cards-grid {
            width: 100% !important;
            flex-direction: column !important;
            gap: 3.2rem !important;
          }
          .work-project-card {
            width: 100% !important;
            gap: 1.7rem !important;
          }
          .work-project-img-wrapper {
            width: 100% !important;
            height: 25rem !important;
          }
          .work-project-info {
            width: 100% !important;
            gap: 1.4rem !important;
          }
          .work-project-header {
            width: 100% !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            height: auto !important;
            gap: 1.2rem !important;
          }
          .work-project-title {
            font-size: 1.8rem !important;
            line-height: 1.75 !important;
          }
          .work-project-tags {
            gap: 0.3rem !important;
            flex-wrap: wrap !important;
          }
          .work-tag-pill {
            padding: 0.4rem 1rem !important;
            height: 2.8rem !important;
            gap: 1rem !important;
          }
          .work-tag-text {
            font-size: 1.4rem !important;
          }
          .work-project-desc {
            width: 100% !important;
            font-size: 1.6rem !important;
            line-height: 140% !important;
            color: #A6A6A6 !important;
          }
        }
      `}</style>
    </div>
  )
}
