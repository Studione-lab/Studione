import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroImage from '../assets/Hero Image.png'
import HeroImage2 from '../assets/Hero Image-1.png'
import AboutImage from '../assets/Studio Image.png'
import CTABillboard from '../assets/Hero Image-2.png'


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
    title: 'Website Builder',
    tags: ['Brand Identity', 'Strategy'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    // image: '/images/work-1.jpg',   ← replace with real asset path
    image: "../src/assets/project-1.png"
  },
  {
    id: 'card-2',
    title: 'Website Builder',
    tags: ['Design System'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    // image: '/images/work-2.jpg',
    image: "../src/assets/project-2.png"
  },
  {
    id: 'card-3',
    title: 'Website Builder',
    tags: ['Brand Identity', 'Production Design'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    // image: '/images/work-3.jpg',
    image: "../src/assets/project-3.png",
    wide: true,   // card-3 is wider (793px in spec → spans full row)
  },
]

// ─────────────────────────────────────────────────────────────────
// Brand gallery items
// ─────────────────────────────────────────────────────────────────
const BRAND_ITEMS = [
  { id: 'brand-1', image: '../src/assets/BrandImage-1.png' },
  { id: 'brand-2', image: '../src/assets/BrandImage-1.png' },
  { id: 'brand-3', image: '../src/assets/BrandImage-1.png' },
  { id: 'brand-4', image: '../src/assets/BrandImage-1.png' },
  { id: 'brand-5', image: '../src/assets/BrandImage-1.png' },
]

// ─────────────────────────────────────────────────────────────────
// Reusable image placeholder (swapped out when real assets arrive)
// ─────────────────────────────────────────────────────────────────
function ImagePlaceholder({ width, height, src, alt = '', style = {}, className = '' }) {
  if (src) {
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
        gap: '20px',
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
            top: '18px',
            left: '18px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '12px 24px',
            gap: '10px',
            background: '#1B1B1B',
            borderRadius: '32px',
            opacity: 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: "'Inter Tight', system-ui, sans-serif",
            fontSize: '12.6px',
            lineHeight: '20px',
            letterSpacing: '0.28px',
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
          gap: '16px',
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
            gap: '16px',
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
              gap: '16px',
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
        .home-section { padding-left: 40px; padding-right: 40px; }
        .hero-section { padding-top: 214px; }
        
        /* Desktop base styles */
        .see-more-link {
          position: absolute;
          right: 40px;
          bottom: 126px;
        }
        .see-more-text {
          font-family: var(--font-britti);
          font-weight: 400;
          font-size: 24px;
          line-height: 140%;
          text-decoration: underline;
          text-transform: capitalize;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .brand-gallery::-webkit-scrollbar {
          display: none;
        }
        .brand-gallery {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        @media (max-width: 1024px) {
          .home-section { padding-left: 24px; padding-right: 24px; }
          .see-more-link { position: static !important; margin-top: 40px; }
        }
        
        @media (max-width: 767px) {
          .home-section { padding-left: 16px !important; padding-right: 16px !important; }
          
          /* Hero Section */
          .hero-section { padding-top: 188px !important; padding-bottom: 40px !important; gap: 40px !important; }
          .heading-hero { font-size: 36px !important; }
          .hero-image-card { flex-direction: column !important; }
          .hero-img-desktop-only { display: none !important; }
          .hero-img-mobile { width: 100% !important; height: 250px !important; }

          /* About Section */
          .about-section { padding-top: 72px !important; padding-bottom: 64px !important; gap: 48px !important; align-items: center !important; }
          .about-text { font-size: 22px !important; align-self: center !important; text-align: left; }
          .about-image { width: 100% !important; height: 220px !important; }

          /* Work Section */
          .work-section { padding-top: 64px !important; padding-bottom: 64px !important; display: flex !important; flex-direction: column !important; align-items: flex-start !important; gap: 48px !important; }
          .work-container { gap: 40px !important; }
          .heading-section { font-size: 24px !important; }
          .work-grid { flex-direction: column !important; gap: 32px !important; }
          .work-row { flex-direction: column !important; gap: 32px !important; }
          .work-card { width: 100% !important; flex: none !important; }
          .work-card-img { height: 250px !important; }
          .heading-card { font-size: 18px !important; }
          .text-muted-studio { font-size: 16px !important; }
          .work-tag-row { gap: 3px !important; flex-wrap: wrap; }
          .work-tag { padding: 4px 10px !important; font-size: 14px !important; height: 28px !important; }
          .work-card-header { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .see-more-link { position: static !important; margin-top: 0; }
          .see-more-text { font-size: 20px !important; align-items: center !important; height: 32px !important; gap: 12px !important; }
          .see-more-text svg { width: 32px !important; height: 32px !important; }

          /* Brand Section */
          .brand-section { padding-top: 96px !important; padding-bottom: 120px !important; min-height: auto !important; display: flex !important; flex-direction: column !important; gap: 40px !important; }
          .brand-heading { position: relative !important; left: 0 !important; top: 0 !important; font-size: 20px !important; }
          .brand-gallery { position: relative !important; left: 0 !important; top: 0 !important; }
          .brand-img { width: 144px !important; height: 144px !important; }

          /* CTA Section */
          .cta-section { padding: 0 !important; gap: 0 !important; }
          .cta-text { padding: 0px 16px 40px !important; gap: 10px !important; width: 100% !important; max-width: 100% !important; }
          .cta-heading { font-size: 30.5px !important; line-height: 120% !important; width: 290px !important; }
          .cta-img { height: 250.12px !important; width: 100% !important; }
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
          padding: '214px 40px 0px',
          gap: '64px',
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
            gap: '16px',
            width: '100%',
            maxWidth: '1082px',
          }}
        >
          {/*
            Design shows mixed white + muted-grey words:
            "Design That Isn't" → white
            "Just Seen"         → #767676 (secondary/grey)
            "It's"              → white
            "Understood."       → #767676
          */}
          <h1 className="heading-hero" style={{ width: '100%', maxWidth: '1082px' }}>
            <span style={{ color: '#FFFFFF' }}>Design That Isn&#39;t </span>
            <span style={{ color: '#767676' }}>Just Seen</span>
            <br />
            <span style={{ color: '#FFFFFF' }}>It&#39;s </span>
            <span style={{ color: '#767676' }}>Understood.</span>
          </h1>
        </div>

        {/* Hero image card row: two equal images, gap 12px */}
        <div
          id="hero-image-card"
          className="hero-image-card"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 0,
            gap: '12px',
            width: '100%',
          }}
        >
          <ImagePlaceholder
            width="50%"
            height="clamp(320px, 52vw, 657px)"
            src={HeroImage}
            alt="Project showcase left"
            style={{ flexShrink: 1, minWidth: 0 }}
            className="hero-img-mobile"
          />
          <ImagePlaceholder
            width="50%"
            height="clamp(320px, 52vw, 657px)"
            src={HeroImage2}
            alt="Project showcase right"
            style={{ flexShrink: 1, minWidth: 0 }}
            className="hero-img-desktop-only hero-img-mobile"
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
          padding: '120px 40px 0px',
          gap: '120px',
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
            maxWidth: '791px',
            fontFamily: 'var(--font-britti)',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: 'clamp(22px, 2.6vw, 32px)',
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
              We&#39;re A Creative Design And Strategy Studio Built For
              Dreamers Who Dare To Launch Bold Ideas.
            </strong>
            <span style={{ color: '#767676', fontWeight: 300 }}>
              {' '}From Brand Identity To Market-Ready Products, We Craft
              Clarity, Ignite Momentum, And Help Your Business Thrive Where
              Creativity Meets Commerce.
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
          padding: '126px 40px 275px',
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
            gap: '58px',
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
              gap: '80px',
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
                gap: '89px',
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
            gap: '12px',
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
          minHeight: '758px',
          background: '#020202',
          overflow: 'hidden',
        }}
      >
        {/* Section label — top-left at left:39, top:85 */}
        <SectionHeading
          className="brand-heading"
          style={{
            position: 'absolute',
            left: '39px',
            top: '85px',
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
            gap: '12px',
            position: 'absolute',
            left: '262px',
            top: '250px',
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
          padding: '1px 0px',
          gap: '80px',
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
            gap: '16px',
            width: '584px',
            maxWidth: '90%',
          }}
        >
          <h2
            className="cta-heading"
            style={{
              fontFamily: 'var(--font-britti)',
              fontStyle: 'normal',
              fontWeight: 300,
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              lineHeight: '100%',
              display: 'flex',
              alignItems: 'center',
              textTransform: 'capitalize',
              color: '#FFFFFF',
              margin: 0,
              alignSelf: 'stretch',
            }}
          >
            Ready To Build Something Intentional?
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
