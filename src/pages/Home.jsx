import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroImage from '../assets/Image/HeroImage.mp4'
import AboutImage from '../assets/Image/AboutImage.mp4'
import CTABillboard from '../assets/Studio Image.png'
import Project1 from '../assets/project-1.png'
import Project2 from '../assets/project-2.png'
import Project3 from '../assets/project-3.png'
import Brand1 from '../assets/BrandImage-1.png'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────
// Shared primitive components (DRY)
// ─────────────────────────────────────────────────────────────────

/** Tag chip used on every work card — rgba(43,43,43,0.5) bg, Inter 18px */
function WorkTag({ children }) {
  return (
    <span
      className="work-tag"
      style={{ flexShrink: 0 }}
    >
      {children}
    </span>
  )
}

/** Section heading — Britti Sans Trial 32px 140% */
function SectionHeading({ children, style = {} }) {
  return (
    <h2 className="heading-section" style={style}>
      {children}
    </h2>
  )
}

/** Card title — Britti Sans Trial 24px */
function CardTitle({ children }) {
  return (
    <h3 className="heading-card">
      {children}
    </h3>
  )
}

/** Muted body text — Inter 18px #C0C0C0 */
function CardDescription({ children, style = {} }) {
  return (
    <p className="text-muted-studio" style={style}>
      {children}
    </p>
  )
}

// ─────────────────────────────────────────────────────────────────
// Work card data
// ─────────────────────────────────────────────────────────────────
const WORK_CARDS = [
  {
    id: 'card-1',
    title: 'Locusverse',
    tags: ['Brand Identity', 'Strategy'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    // image: '/images/work-1.jpg',   ← replace with real asset path
    image: Project1
  },
  {
    id: 'card-2',
    title: 'Você Fala',
    tags: ['Brand & Campaign'],
    desc: "A bold brand and campaign system for a Brazilian consumer platform centred on honest conversation. The identity leans into high-contrast typography and direct language — designed to stand out in a crowded digital feed and say what competitors won't.",
    // image: '/images/work-2.jpg',
    image: Project2
  },
  {
    id: 'card-3',
    title: 'Pausa',
    tags: ['Brand Identity', 'Production Design'],
    desc: 'Brand identity for a boutique retail concept built around the idea of intentional consumption — slow, considered, and joyful. The visual system balances a refined typographic mark with expressive illustration, brought together across packaging, bags, and in-store materials.',
    // image: '/images/work-3.jpg',
    image: Project3,
    wide: true,   // card-3 is wider (793px in spec → spans full row)
  },
]

// ─────────────────────────────────────────────────────────────────
// Brand gallery items
// ─────────────────────────────────────────────────────────────────
const BRAND_ITEMS = [
  { id: 'brand-1', image: Brand1 },
  { id: 'brand-2', image: Brand1 },
  { id: 'brand-3', image: Brand1 },
  { id: 'brand-4', image: Brand1 },
  { id: 'brand-5', image: Brand1 },
]

const isVideoAsset = (url) => typeof url === 'string' && /\.(mp4|webm|ogg|mov)($|\?)/i.test(url);

// ─────────────────────────────────────────────────────────────────
// Reusable image placeholder (swapped out when real assets arrive)
// ─────────────────────────────────────────────────────────────────
function ImagePlaceholder({ width, height, src, alt = '', style = {}, className = '' }) {
  if (src) {
    const isVideo = isVideoAsset(src);
    if (isVideo) {
      return (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width,
            height,
            objectFit: 'cover',
            display: 'block',
            flexShrink: 0,
            ...style,
          }}
          className={className}
        />
      )
    }
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width,
          height,
          objectFit: 'cover',
          display: 'block',
          flexShrink: 0,
          ...style,
        }}
        className={className}
      />
    )
  }
  // Placeholder tile until real images are provided
  return (
    <div
      style={{
        width,
        height,
        background: '#232222',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      className={className}
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
// Work Card component (DRY — used three times in the grid)
// ─────────────────────────────────────────────────────────────────
function WorkCard({ card, imageWidth, imageHeight, style = {} }) {
  return (
    <article
      id={card.id}
      className="work-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 0,
        gap: '2rem',
        ...style,
      }}
    >
      {/* ── Project image ───────────────────────── */}
      <div style={{ position: 'relative', width: '100%' }}>
        <ImagePlaceholder
          width="100%"
          height={imageHeight}
          src={card.image}
          alt={card.title}
          className="work-card-img"
        />
        {/* Category badge — hidden by default, shown on hover via CSS */}
        <div
          className="card-category-badge"
          style={{
            position: 'absolute',
            top: '1.8rem',
            left: '1.8rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.2rem 2.4rem',
            gap: '1rem',
            background: '#1B1B1B',
            borderRadius: '32px',
            opacity: 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: "'Inter Tight', system-ui, sans-serif",
            fontSize: '1.26rem',
            lineHeight: '1.25',
            letterSpacing: '0.028rem',
            color: '#FFFFFF',
          }}>
            {card.tags[0]}
          </span>
        </div>
      </div>

      {/* ── Card content block ──────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: 0,
          gap: '1.6rem',
          width: '100%',
        }}
      >
        {/* Card header row: title + tags */}
        <div 
          className="work-card-header"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
            gap: '1.6rem',
            width: '100%',
          }}
        >
          <CardTitle>{card.title}</CardTitle>

          {/* Tag chips row */}
          <div 
            className="work-tag-row"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1.6rem',
              flexShrink: 0,
            }}
          >
            {card.tags.map((tag) => (
              <WorkTag key={tag}>{tag}</WorkTag>
            ))}
          </div>
        </div>

        {/* Description */}
        <CardDescription>{card.desc}</CardDescription>
      </div>

      {/* Hover badge reveal */}
      <style>{`
        #${card.id}:hover .card-category-badge {
          opacity: 1 !important;
        }
      `}</style>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────
export default function Home() {
  const brandSectionRef = useRef(null)
  const brandGalleryRef = useRef(null)

  useGSAP(() => {
    if (!brandSectionRef.current || !brandGalleryRef.current) return

    // We use useGSAP without matchMedia constraints because we want this animation 
    // to run on both mobile and desktop. 
    // Calculate how far to translate the gallery
    const getDistance = () => {
      const galleryWidth = brandGalleryRef.current.scrollWidth
      const viewportWidth = window.innerWidth
      // 262px is the left offset of the gallery on desktop. On mobile, it's 16px.
      const leftOffset = viewportWidth < 768 ? 16 : 262
      const paddingRight = viewportWidth < 768 ? 16 : 40
      
      // We want the last card's right edge to hit the viewport's right edge
      return Math.max(0, galleryWidth + leftOffset - viewportWidth + paddingRight)
    }

    // Use a context so it recalculates on resize (ScrollTrigger handles this gracefully if set up)
    const distance = getDistance()
    
    if (distance > 0) {
      gsap.to(brandGalleryRef.current, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: brandSectionRef.current,
          start: 'center center',
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true, // Recalculates on resize
        }
      })
    }
  }, { scope: brandSectionRef })

  return (
    <div style={{ background: '#020202' }}>
      <style>{`
        /* ── Responsive Architecture ── */
        .home-section { padding-left: 4rem; padding-right: 4rem; }
        .hero-section { padding-top: 21.4rem; }
        
        /* Desktop base styles */
        .see-more-link {
          position: absolute;
          right: 4rem;
          bottom: 12.6rem;
        }
        .see-more-text {
          font-family: var(--font-britti);
          font-weight: 400;
          font-size: 2.4rem;
          line-height: 140%;
          text-decoration: underline;
          text-transform: capitalize;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .brand-gallery::-webkit-scrollbar {
          display: none;
        }
        .brand-gallery {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        @media (max-width: 64em) {
          .home-section { padding-left: 2.4rem; padding-right: 2.4rem; }
          .see-more-link { position: static !important; margin-top: 4rem; }
        }
        
        @media (max-width: 47.938em) {
          .home-section { padding-left: 1.6rem !important; padding-right: 1.6rem !important; }
          
          /* Hero Section */
          .hero-section { padding-top: 15.2rem !important; padding-bottom: 4rem !important; gap: 4rem !important; }
          .heading-hero { 
            font-size: 3.6rem !important; 
            max-width: 100% !important;
          }
          .hero-image-card { flex-direction: column !important; }
          .hero-img-desktop-only { display: none !important; }
          .hero-img-mobile { width: 100% !important; height: 25rem !important; }

          /* About Section */
          .about-section { padding-top: 7.2rem !important; padding-bottom: 6.4rem !important; gap: 4.8rem !important; align-items: center !important; }
          .about-text { font-size: 2.2rem !important; align-self: center !important; text-align: left; }
          .about-image { width: 100% !important; height: 22rem !important; }

          /* Work Section */
          .work-section { padding-top: 6.4rem !important; padding-bottom: 6.4rem !important; display: flex !important; flex-direction: column !important; align-items: flex-start !important; gap: 4.8rem !important; }
          .work-container { gap: 4rem !important; }
          .heading-section { font-size: 2.4rem !important; }
          .work-grid { flex-direction: column !important; gap: 3.2rem !important; }
          .work-row { flex-direction: column !important; gap: 3.2rem !important; }
          .work-card { width: 100% !important; flex: none !important; }
          .work-card-img { height: 25rem !important; }
          .heading-card { font-size: 1.8rem !important; }
          .text-muted-studio { font-size: 1.6rem !important; }
          .work-tag-row { gap: 0.3rem !important; flex-wrap: wrap; }
          .work-tag { padding: 0.4rem 10px !important; font-size: 1.4rem !important; height: 2.8rem !important; }
          .work-card-header { flex-direction: column !important; align-items: flex-start !important; gap: 1.2rem !important; }
          .see-more-link { position: static !important; margin-top: 0; }
          .see-more-text { font-size: 2rem !important; align-items: center !important; height: 3.2rem !important; gap: 1.2rem !important; }
          .see-more-text svg { width: 3.2rem !important; height: 3.2rem !important; }

          /* Brand Section */
          .brand-section { padding-top: 9.6rem !important; padding-bottom: 12rem !important; min-height: auto !important; display: flex !important; flex-direction: column !important; gap: 4rem !important; }
          .brand-heading { position: relative !important; left: 0 !important; top: 0 !important; font-size: 2rem !important; }
          .brand-gallery { position: relative !important; left: 0 !important; top: 0 !important; }
          .brand-img { width: 14.4rem !important; height: 14.4rem !important; }

          /* CTA Section */
          .cta-section { padding: 0 !important; gap: 0 !important; }
          .cta-text { padding: 4.8rem 16px 40px !important; gap: 1rem !important; width: 100% !important; max-width: 100% !important; }
          .cta-heading { font-size: 3.05rem !important; line-height: 120% !important; width: 29rem !important; }
          .cta-img { height: 25.012rem !important; width: 100% !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="hero-section home-section"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: '21.4rem 4rem 0rem',
          gap: '6.4rem',
          width: '100%',
          minHeight: '100vh',
          background: '#020202',
          boxSizing: 'border-box',
        }}
      >
        {/* Headline block — Britti Sans Trial 85px */}
        <div
          id="hero-header"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
            gap: '1.6rem',
            width: '100%',
            maxWidth: '108.2rem',
          }}
        >
          {/*
            Design shows mixed white + muted-grey words:
            "Design That Isn't" → white
            "Just Seen"         → #767676 (secondary/grey)
            "It's"              → white
            "Understood."       → #767676
          */}
          <h1 className="heading-hero" style={{ width: '100%', maxWidth: '99.8rem', alignSelf: 'flex-start', textAlign: 'left' }}>
            <span style={{ color: '#FFFFFF' }}>Branding that withstands the test of time.</span>
            {/* <span style={{ color: '#767676' }}>Just Seen </span>
            <span style={{ color: '#FFFFFF' }}>It&#39;s </span>
            <span style={{ color: '#767676' }}>Understood.</span> */}
          </h1>
        </div>

        {/* Hero image card row: single full-width image */}
        <div
          id="hero-image-card"
          className="hero-image-card"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 0,
            gap: '1.2rem',
            width: '100%',
          }}
        >
          <ImagePlaceholder
            width="100%"
            height="clamp(320px, 52vw, 657px)"
            src={HeroImage}
            alt="Project showcase"
            style={{ flexShrink: 1, minWidth: 0 }}
            className="hero-img-mobile"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 2. ABOUT SECTION                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="about"
        className="about-section home-section"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: '12rem 4rem 0rem',
          gap: '12rem',
          width: '100%',
          background: '#020202',
          boxSizing: 'border-box',
        }}
      >
        {/* Studio description — Britti Sans 32px 300 weight, right-end aligned */}
        <p
          id="studio-description"
          className="about-text"
          style={{
            maxWidth: '79.1rem',
            fontFamily: 'var(--font-britti)',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: 'clamp(2.2rem, 2.6vw, 3.2rem)',
            lineHeight: '120%',
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            alignSelf: 'flex-end',
          }}
        >
          {/* White = bold part, muted = lighter follow-up (matches snapshot) */}
          <span>
            <strong style={{ fontWeight: 400 }}>
              We are a creative and strategy studio working at the intersection of brand identity, design systems, and market positioning.
            </strong>
            <span style={{ color: '#767676', fontWeight: 300 }}>
              {' '}Our work is built for founders, operators, and growing businesses who understand that design is not decoration, it is direction.
            </span>
          </span>
        </p>

        {/* Full-width image */}
        <ImagePlaceholder
          width="100%"
          height="clamp(300px, 52vw, 657px)"
          src={AboutImage}
          alt="About Studione"
          style={{ alignSelf: 'stretch' }}
          className="about-image"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 3. WORK SECTION — "Selected Works"                        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="work"
        className="work-section home-section"
        style={{
          width: '100%',
          background: '#020202',
          padding: '12.6rem 4rem 27.5rem',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* ── Container ─────────────────────────────── */}
        <div
          id="work-container"
          className="work-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
            gap: '5.8rem',
            width: '100%',
          }}
        >
          {/* Section heading */}
          <SectionHeading>Selected Works</SectionHeading>

          {/* ── Work card grid: two explicit rows ──────────────────
               Row 1: Card-1 (52%) + Card-2 (fills rest),  gap 89px
               Row 2: Card-3 at exactly 65%, no grow        gap 80px
               Using explicit rows prevents flex-grow from stretching
               card-3 to 100% when it wraps alone.
          ────────────────────────────────────────────────────────── */}
          <div
            id="work-image-card-grid"
            className="work-grid"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8rem',
              width: '100%',
            }}
          >
            {/* ── ROW 1: Card-1 + Card-2 ────────────────────────── */}
            <div
              id="work-row-1"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: '8.9rem',
                width: '100%',
              }}
              className="work-row"
            >
              {/* Card-1 — 623px → 52% of container */}
              <WorkCard
                card={WORK_CARDS[0]}
                imageHeight="clamp(220px, 37vw, 463px)"
                style={{ flex: '0 0 52%', width: '52%', minWidth: 0 }}
              />
              {/* Card-2 — 488px → fills remaining space after card-1 + gap */}
              <WorkCard
                card={WORK_CARDS[1]}
                imageHeight="clamp(220px, 37vw, 463px)"
                style={{ flex: '1 1 auto', minWidth: 0 }}
              />
            </div>

            {/* ── ROW 2: Card-3 only, pinned at 65% — NO flex-grow ─ */}
            <div
              id="work-row-2"
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
              }}
              className="work-row"
            >
              {/* Card-3 — 793px → 65% of container, never grows to 100% */}
              <WorkCard
                card={WORK_CARDS[2]}
                imageHeight="clamp(220px, 37vw, 463px)"
                style={{ flex: '0 0 65%', width: '65%', minWidth: 0 }}
              />
            </div>
          </div>
        </div>

        {/* ── "See More Work ↘" bottom-right link (Desktop absolute, Mobile inline) ─── */}
        <div
          id="see-more-work"
          className="see-more-link"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '1.2rem',
          }}
        >
          <Link
            to="/work"
            className="see-more-text"
          >
            See More Work
            {/* Arrow-right-down icon matching solar:arrow-right-down-linear */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 8h16v16M8 24L24 8" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 4. BRAND SECTION — "We've progressed as a brand."         */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="brand"
        ref={brandSectionRef}
        className="brand-section home-section"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '75.8rem',
          background: '#020202',
          overflow: 'hidden',
        }}
      >
        {/* Section label — top-left at left:39, top:85 */}
        <SectionHeading
          className="brand-heading"
          style={{
            position: 'absolute',
            left: '3.9rem',
            top: '8.5rem',
          }}
        >
          We&#39;ve progressed as a brand.
        </SectionHeading>

        {/*
          Image gallery — offset to the right (left:262) per spec.
          Three brand-logo images at ~419px each, gap 12px.
          The gallery is wider than the viewport on purpose (scrollable).
        */}
        <div
          id="brand-gallery"
          ref={brandGalleryRef}
          className="brand-gallery"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 0,
            gap: '1.2rem',
            position: 'absolute',
            left: '26.2rem',
            top: '25rem',
            /* spec has transform: matrix(-1,0,0,1,0,0) which mirrors X;
               omitting the mirror since images aren't provided yet */
          }}
        >
          {BRAND_ITEMS.map((item, i) => (
            <ImagePlaceholder
              key={item.id}
              width="clamp(260px, 32.7vw, 419px)"
              height="288px"
              src={item.image}
              alt={`Brand image ${i + 1}`}
              style={{ flexShrink: 0 }}
              className="brand-img"
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 5. CALL TO ACTION SECTION                                 */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="cta"
        className="cta-section home-section"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0.1rem 0rem',
          gap: '8rem',
          width: '100%',
          background: '#020202',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Heading block — centered, max-width 584px ─── */}
        <div
          id="cta-text"
          className="cta-text"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: 0,
            gap: '1.6rem',
            width: '58.4rem',
            maxWidth: '90%',
          }}
        >
          <h2
            className="cta-heading"
            style={{
              fontFamily: 'var(--font-britti)',
              fontStyle: 'normal',
              fontWeight: 300,
              fontSize: 'clamp(3.6rem, 4.5vw, 5.6rem)',
              lineHeight: '100%',
              display: 'flex',
              alignItems: 'center',
              textTransform: 'capitalize',
              color: '#FFFFFF',
              margin: 0,
              alignSelf: 'stretch',
            }}
          >
            Have a Project in Mind?
          </h2>
        </div>

        {/* ── Billboard image — full-width, 505px tall ─── */}
        <ImagePlaceholder
          width="100%"
          height="505px"
          src={CTABillboard}
          alt="Billboard showcase"
          style={{ flexShrink: 0 }}
          className="cta-img"
        />
      </section>

    </div>
  )
}
