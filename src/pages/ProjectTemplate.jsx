import { useRef, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../data/projectData'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────
// IMAGE PLACEHOLDER — reused throughout the template
// ─────────────────────────────────────────────────────────────────
function ImgPlaceholder({ src, alt = '', style = {} }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          userSelect: 'none',
          ...style,
        }}
      />
    )
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#232222',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.25">
        <rect x="4" y="4" width="32" height="32" rx="4" stroke="#FFF" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="3" stroke="#FFF" strokeWidth="1.5" />
        <path d="M4 28l9-9 6 6 4-4 13 13" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// TAG PILL — same style as Work.jsx
// ─────────────────────────────────────────────────────────────────
function TagPill({ label }) {
  return (
    <div
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
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: '1.8rem',
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
// PAIN POINT BLOCK — reused for each pain point
// ─────────────────────────────────────────────────────────────────
function PainPointBlock({ title, text }) {
  return (
    <div
      className="project-pain-point-block"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0 0 0 10.8rem',
        gap: '1.2rem',
        width: '59.6rem',
        maxWidth: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Pain point title — Britti italic 22px 400 */}
      <h3
        className="project-pain-point-title"
        style={{
          fontFamily: "var(--font-britti)",
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: '2.2rem',
          lineHeight: '125%',
          display: 'flex',
          alignItems: 'center',
          textTransform: 'capitalize',
          color: '#FFFFFF',
          margin: 0,
          width: '48.8rem',
          maxWidth: '100%',
        }}
      >
        {title}
      </h3>
      {/* Pain point description — Inter 20px 400 */}
      <p
        className="project-pain-point-text"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '2rem',
          lineHeight: '140%',
          letterSpacing: '-0.02em',
          color: '#C0C0C0',
          margin: 0,
          width: '48.8rem',
          maxWidth: '100%',
          whiteSpace: 'pre-line',
        }}
      >
        {text}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// RELATED CASE STUDY CARD — smaller card for "Next Case Study"
// ─────────────────────────────────────────────────────────────────
function CaseStudyCard({ project, width = 488, imgHeight = 463 }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      style={{ textDecoration: 'none', flexShrink: 0 }}
      className="related-case-card-link"
    >
      <div
        className="related-case-card"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 0,
          gap: '2rem',
          width: `${width}px`,
        }}
      >
        {/* Image */}
        <div
          className="related-case-img"
          style={{
            width: `${width}px`,
            height: `${imgHeight}px`,
            background: '#232222',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <ImgPlaceholder src={project.src} alt={project.title} />
        </div>

        {/* Card content */}
        <div
          className="related-case-info"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
            gap: '1.6rem',
            width: `${width}px`,
          }}
        >
          {/* Title + tags row */}
          <div
            className="related-case-header"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 0,
              gap: '1.6rem',
              width: `${width}px`,
              height: '4.5rem',
            }}
          >
            <span
              className="related-case-title"
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
              {project.title}
            </span>

            <div
              className="related-case-tags"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: 0,
                gap: '1.6rem',
                flexShrink: 0,
              }}
            >
              {project.tags.map((tag) => (
                <div key={tag} className="related-case-tag-wrapper">
                  <TagPill label={tag} />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <p
            className="related-case-desc"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '1.8rem',
              lineHeight: '140%',
              letterSpacing: '-0.02em',
              color: '#C0C0C0',
              margin: 0,
              width: `${width}px`,
            }}
          >
            {project.desc}
          </p>
        </div>
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────
// PROJECT TEMPLATE PAGE
// ─────────────────────────────────────────────────────────────────
export default function ProjectTemplate() {
  const { slug } = useParams()
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  // Find the current project by slug
  const project = useMemo(
    () => PROJECTS.find((p) => p.slug === slug),
    [slug]
  )

  // Pick two related projects (not the current one) for "Next Case Study"
  const relatedProjects = useMemo(() => {
    if (!project) return []
    const others = PROJECTS.filter((p) => p.id !== project.id && !p.comingSoon)
    // Pick up to 2
    return others.slice(0, 2)
  }, [project])

  // ── GSAP: pin hero so content scrolls over it ──
  useGSAP(() => {
    if (!heroRef.current || !contentRef.current) return

    // Pin the hero in place; content slides up and covers it
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      // pin until the content section's top reaches the top of viewport
      endTrigger: contentRef.current,
      end: 'top top',
      pin: true,
      pinSpacing: false,
    })
  }, { dependencies: [slug] })

  // 404 guard
  if (!project) {
    return <Navigate to="/work" replace />
  }

  return (
    <div style={{ background: '#020202', position: 'relative' }}>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION — pinned full-width image                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="project-hero"
        style={{
          position: 'relative',
          width: '100%',
          height: '67.8rem',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <ImgPlaceholder
            src={project.heroImage}
            alt={`${project.title} hero`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 2. CONTENT SECTION — scrolls over pinned hero              */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        ref={contentRef}
        id="project-content"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '6.4rem 4rem 29.6rem',
          gap: '18.4rem',
          width: '100%',
          background: '#020202',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Main content: two-column layout ─────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: 0,
            gap: '18.6rem',
            width: '100%',
            background: '#020202',
          }}
          className="project-main-content"
        >
          {/* ── LEFT COLUMN (627px) ──────────────────────────────── */}
          <div
            className="project-col-left"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: 0,
              gap: '2.4rem',
              width: '62.7rem',
              flexShrink: 0,
            }}
          >
            {/* Paragraph & tags container */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: 0,
                gap: '2.4rem',
                width: '59rem',
                maxWidth: '100%',
              }}
            >
              {/* Title & description container */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: 0,
                  gap: '1.3rem',
                  width: '59rem',
                  maxWidth: '100%',
                }}
              >
                {/* Date — Inter 18px 400 */}
                <span
                  className="project-date"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '1.8rem',
                    lineHeight: '140%',
                    display: 'flex',
                    alignItems: 'center',
                    letterSpacing: '-0.02em',
                    color: '#C0C0C0',
                    width: '59rem',
                    maxWidth: '100%',
                  }}
                >
                  {project.date}
                </span>

                {/* Tagline — Britti 32px 300 */}
                <h1
                  className="project-tagline"
                  style={{
                    fontFamily: 'var(--font-britti)',
                    fontStyle: 'normal',
                    fontWeight: 300,
                    fontSize: '3.2rem',
                    lineHeight: '125%',
                    display: 'flex',
                    alignItems: 'center',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                    margin: 0,
                    width: '59rem',
                    maxWidth: '100%',
                  }}
                >
                  {project.tagline}
                </h1>
              </div>

              {/* Tag container */}
              <div
                className="project-tags"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: 0,
                  gap: '1.6rem',
                }}
              >
                {project.tags.map((tag) => (
                  <TagPill key={tag} label={tag} />
                ))}
              </div>
            </div>

            {/* Introduction paragraph — Inter 20px 400 */}
            <p
              className="project-intro-text"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '2rem',
                lineHeight: '140%',
                letterSpacing: '-0.02em',
                color: '#C0C0C0',
                margin: 0,
                width: '62.7rem',
                maxWidth: '100%',
                whiteSpace: 'pre-line',
              }}
            >
              {project.introText}
            </p>
          </div>

          {/* ── RIGHT COLUMN (387px) ─────────────────────────────── */}
          <div
            className="project-col-right"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: 0,
              gap: '6.3rem',
              width: '38.7rem',
              flexShrink: 0,
            }}
          >
            {/* Client logo text — Britti 80px 300 */}
            <span
              className="project-logo-text"
              style={{
                fontFamily: 'var(--font-britti)',
                fontStyle: 'normal',
                fontWeight: 300,
                fontSize: '8rem',
                lineHeight: '100%',
                display: 'flex',
                alignItems: 'center',
                textTransform: 'capitalize',
                color: '#FFFFFF',
                width: '38.7rem',
                maxWidth: '100%',
              }}
            >
              {project.clientLogo}
            </span>

            {/* Skillset — Inter 18px 400 */}
            <span
              className="project-skillset"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '1.8rem',
                lineHeight: '140%',
                letterSpacing: '-0.02em',
                color: '#C0C0C0',
                width: '38.7rem',
                maxWidth: '100%',
              }}
            >
              {project.skillset}
            </span>
          </div>
        </div>

        {/* ── Banner Image — 100% × 580px ─────────────────────────── */}
        <div
          className="project-banner-img"
          style={{
            width: '100%',
            height: '58rem',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <ImgPlaceholder
            src={project.bannerImage}
            alt={`${project.title} banner`}
          />
        </div>

        {/* ── Pain Point 1 ────────────────────────────────────────── */}
        {project.painPoints?.[0] && (
          <PainPointBlock
            title={project.painPoints[0].title}
            text={project.painPoints[0].text}
          />
        )}

        {/* ── Full-width image after pain point 1 ─────────────────── */}
        <div
          className="project-pain-point-img"
          style={{
            width: '100%',
            height: '58rem',
            background: '#232222',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <ImgPlaceholder
            src={project.painPoints?.[0]?.image}
            alt="Pain point visual"
          />
        </div>

        {/* ── Pain Point 2 ────────────────────────────────────────── */}
        {project.painPoints?.[1] && (
          <PainPointBlock
            title={project.painPoints[1].title}
            text={project.painPoints[1].text}
          />
        )}

        {/* ── Image card grid ─────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
            gap: '2rem',
            width: '100%',
          }}
        >
          {/* Full-width image box */}
          <div
            className="project-gallery-full"
            style={{
              width: '100%',
              height: '58rem',
              background: '#232222',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <ImgPlaceholder
              src={project.gallery?.fullWidth}
              alt="Gallery full width"
            />
          </div>

          {/* Two-column pair — 590px each, gap 20px */}
          <div
            className="project-gallery-pair"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 0,
              gap: '2rem',
              width: '100%',
              height: '58rem',
            }}
          >
            <div
              className="project-gallery-pair-img"
              style={{
                flex: '1 1 0',
                height: '58rem',
                background: '#232222',
                overflow: 'hidden',
              }}
            >
              <ImgPlaceholder
                src={project.gallery?.pair?.[0]}
                alt="Gallery left"
              />
            </div>
            <div
              className="project-gallery-pair-img"
              style={{
                flex: '1 1 0',
                height: '58rem',
                background: '#232222',
                overflow: 'hidden',
              }}
            >
              <ImgPlaceholder
                src={project.gallery?.pair?.[1]}
                alt="Gallery right"
              />
            </div>
          </div>

          {/* Bottom full-width image */}
          <div
            className="project-gallery-bottom"
            style={{
              width: '100%',
              height: '58rem',
              background: '#232222',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <ImgPlaceholder
              src={project.gallery?.bottom}
              alt="Gallery bottom"
            />
          </div>
        </div>

        {/* ── Testimonial ─────────────────────────────────────────── */}
        {project.testimonial && (
          <div
            className="project-testimonial-block"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0 0 0 10.8rem',
              gap: '1.2rem',
              width: '79.9rem',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            {/* Testimonial title */}
            <h3
              className="project-testimonial-title"
              style={{
                fontFamily: 'var(--font-britti)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '2.2rem',
                lineHeight: '125%',
                display: 'flex',
                alignItems: 'center',
                textTransform: 'capitalize',
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              Testimonial
            </h3>

            {/* Testimonial text — Britti 22px 400 */}
            <p
              className="project-testimonial-text"
              style={{
                fontFamily: 'var(--font-britti)',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '2.2rem',
                lineHeight: '140%',
                letterSpacing: '-0.02em',
                color: '#C0C0C0',
                margin: 0,
                width: '69.1rem',
                maxWidth: '100%',
              }}
            >
              {project.testimonial.text}
            </p>

            {/* Author info */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 0,
                gap: '1.2rem',
                marginTop: '1.2rem',
              }}
            >
              {/* Author avatar — 32×32 circle */}
              <div
                style={{
                  width: '3.2rem',
                  height: '3.2rem',
                  borderRadius: '100px',
                  overflow: 'hidden',
                  background: '#3A3A3A',
                  flexShrink: 0,
                }}
              >
                {project.testimonial.avatar ? (
                  <img
                    src={project.testimonial.avatar}
                    alt={project.testimonial.author}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" opacity="0.4">
                      <circle cx="8" cy="6" r="3" stroke="#FFF" strokeWidth="1" />
                      <path d="M2 14c0-3 2.5-5 6-5s6 2 6 5" stroke="#FFF" strokeWidth="1" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Author text */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: 0,
                }}
              >
                {/* Author name — Britti 16px 500 */}
                <span
                  className="project-testimonial-author-name"
                  style={{
                    fontFamily: 'var(--font-britti)',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    fontSize: '1.6rem',
                    lineHeight: '150%',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    letterSpacing: '-0.03rem',
                    color: '#FFFFFF',
                  }}
                >
                  {project.testimonial.author}
                </span>
                {/* Author role — Britti 14px 400 */}
                <span
                  className="project-testimonial-author-role"
                  style={{
                    fontFamily: 'var(--font-britti)',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    fontSize: '1.4rem',
                    lineHeight: '150%',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    letterSpacing: '-0.02rem',
                    color: '#7C7C7C',
                  }}
                >
                  {project.testimonial.role}
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 3. RELATED CASE STUDY SECTION                              */}
      {/* ════════════════════════════════════════════════════════════ */}
      <section
        id="related-case-study"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0 4rem 32.8rem',
          gap: '3.6rem',
          width: '100%',
          background: '#020202',
          boxSizing: 'border-box',
        }}
      >
        {/* Heading — Britti italic 32px 300 */}
        <h2
          style={{
            fontFamily: 'var(--font-britti)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '3.2rem',
            lineHeight: '125%',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            margin: 0,
            width: '100%',
          }}
        >
          Next Case Study
        </h2>

        {/* Two cards side by side — gap 122px */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: 0,
            gap: '12.2rem',
            width: '100%',
          }}
          className="related-cards-row"
        >
          {relatedProjects[0] && (
            <CaseStudyCard
              project={relatedProjects[0]}
              width={488}
              imgHeight={463}
            />
          )}
          {relatedProjects[1] && (
            <CaseStudyCard
              project={relatedProjects[1]}
              width={590}
              imgHeight={463}
            />
          )}
        </div>
      </section>

      {/* ── Responsive overrides ──────────────────────────────────── */}
      <style>{`
        @media (max-width: 75em) {
          .project-main-content {
            flex-direction: column !important;
            gap: 6.4rem !important;
          }
          .project-main-content > div {
            width: 100% !important;
            max-width: 100% !important;
          }
          .related-cards-row {
            flex-direction: column !important;
            gap: 6.4rem !important;
          }
          .related-cards-row > a > div {
            width: 100% !important;
          }
        }
        @media (max-width: 48em) {
          #project-hero {
            height: 42rem !important;
          }
          #project-content {
            padding: 4.8rem 1.6rem 12rem !important;
            gap: 6.4rem !important;
          }
          .project-main-content {
            flex-direction: column !important;
            gap: 4.8rem !important;
          }
          .project-col-left {
            order: 2 !important;
            width: 100% !important;
            gap: 2.4rem !important;
          }
          .project-col-right {
            order: 1 !important;
            width: 100% !important;
            gap: 1.2rem !important;
          }
          .project-logo-text {
            font-size: 3.2rem !important;
            line-height: 100% !important;
          }
          .project-skillset {
            font-size: 1.6rem !important;
            line-height: 140% !important;
          }
          .project-date {
            font-size: 1.4rem !important;
          }
          .project-tagline {
            font-size: 2.2rem !important;
          }
          .project-intro-text {
            font-size: 1.6rem !important;
          }
          .project-banner-img {
            height: 22rem !important;
          }
          .project-pain-point-block {
            padding: 0 !important;
            gap: 2.4rem !important;
          }
          .project-pain-point-title {
            font-size: 2rem !important;
            width: 100% !important;
          }
          .project-pain-point-text {
            font-size: 1.6rem !important;
            width: 100% !important;
          }
          .project-pain-point-img {
            height: 22rem !important;
          }
          .project-gallery-full {
            height: 22rem !important;
          }
          .project-gallery-pair {
            flex-direction: column !important;
            height: auto !important;
            gap: 1.2rem !important;
          }
          .project-gallery-pair-img {
            width: 100% !important;
            height: 38rem !important;
            flex: none !important;
          }
          .project-gallery-bottom {
            height: 22rem !important;
          }
          .project-testimonial-block {
            padding: 0 !important;
            width: 100% !important;
            gap: 2.4rem !important;
          }
          .project-testimonial-title {
            font-size: 2rem !important;
          }
          .project-testimonial-text {
            font-size: 1.6rem !important;
            width: 100% !important;
          }
          .project-testimonial-author-name {
            font-size: 1.6rem !important;
          }
          .project-testimonial-author-role {
            font-size: 1.4rem !important;
          }
          
          /* Related Case Study Section */
          #related-case-study {
            padding: 4rem 1.6rem 6.4rem !important;
            gap: 1rem !important;
          }
          #related-case-study h2 {
            font-size: 2rem !important;
          }
          .related-cards-row {
            flex-direction: row !important;
            gap: 3.2rem !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            padding-bottom: 2rem !important;
            scroll-snap-type: x mandatory !important;
            width: 100% !important;
          }
          .related-cards-row::-webkit-scrollbar {
            display: none;
          }
          .related-case-card-link {
            scroll-snap-align: start !important;
          }
          .related-case-card {
            width: 29.2rem !important;
            gap: 1.7rem !important;
          }
          .related-case-img {
            width: 29.2rem !important;
            height: 25rem !important;
          }
          .related-case-info {
            width: 29.2rem !important;
            gap: 1.4rem !important;
          }
          .related-case-header {
            width: 29.2rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            height: auto !important;
            gap: 1.2rem !important;
          }
          .related-case-title {
            font-size: 1.8rem !important;
            line-height: 1.75 !important;
          }
          .related-case-tags {
            flex-wrap: wrap !important;
            gap: 0.3rem !important;
          }
          .related-case-tag-wrapper > div {
            padding: 0.4rem 1rem !important;
            height: 2.8rem !important;
          }
          .related-case-tag-wrapper span {
            font-size: 1.4rem !important;
          }
          .related-case-desc {
            display: none !important; /* Seems missing in mobile design or implicitly hidden */
          }
        }
      `}</style>
    </div>
  )
}
