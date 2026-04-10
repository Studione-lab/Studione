import { Link } from 'react-router-dom'

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
    title: 'Website Builderh',
    tags: ['Brand Identity', 'Strategy'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    // image: '/images/work-1.jpg',   ← replace with real asset path
  },
  {
    id: 'card-2',
    title: 'Website Builderh',
    tags: ['Design System'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    // image: '/images/work-2.jpg',
  },
  {
    id: 'card-3',
    title: 'Website Builderh',
    tags: ['Brand Identity', 'Production Design'],
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
    // image: '/images/work-3.jpg',
    wide: true,   // card-3 is wider (793px in spec → spans full row)
  },
]

// ─────────────────────────────────────────────────────────────────
// Brand gallery items
// ─────────────────────────────────────────────────────────────────
const BRAND_ITEMS = [
  { id: 'brand-1', /* image: '/images/brand-1.png' */ },
  { id: 'brand-2', /* image: '/images/brand-2.png' */ },
  { id: 'brand-3', /* image: '/images/brand-3.png' */ },
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
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 0,
          gap: '16px',
          width: '100%',
        }}>
          <CardTitle>{card.title}</CardTitle>

          {/* Tag chips row */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '16px',
            flexShrink: 0,
          }}>
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
  return (
    <div style={{ background: '#1B1B1B' }}>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: '214px 40px 0px',
          gap: '64px',
          width: '100%',
          minHeight: '100vh',
          background: '#1B1B1B',
          boxSizing: 'border-box',
          paddingTop: '130px',   // accounts for 92px navbar
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
            src={undefined /* '/images/hero-1.png' */}
            alt="Project showcase left"
            style={{ flexShrink: 1, minWidth: 0 }}
          />
          <ImagePlaceholder
            width="50%"
            height="clamp(320px, 52vw, 657px)"
            src={undefined /* '/images/hero-2.png' */}
            alt="Project showcase right"
            style={{ flexShrink: 1, minWidth: 0 }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 2. ABOUT SECTION                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="about"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: '120px 40px 0px',
          gap: '120px',
          width: '100%',
          background: '#1B1B1B',
          boxSizing: 'border-box',
        }}
      >
        {/* Studio description — Britti Sans 32px 300 weight, right-end aligned */}
        <p
          id="studio-description"
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
          src={undefined /* '/images/about-main.png' */}
          alt="About Studione"
          style={{ alignSelf: 'stretch' }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 3. WORK SECTION — "Selected Works"                        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="work"
        style={{
          width: '100%',
          background: '#1B1B1B',
          padding: '126px 40px 275px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* ── Container ─────────────────────────────── */}
        <div
          id="work-container"
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

        {/* ── "See More Work ↘" bottom-right link ─── */}
        <div
          id="see-more-work"
          style={{
            position: 'absolute',
            right: '40px',
            bottom: '126px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '15px',
          }}
        >
          <Link
            to="/work"
            style={{
              fontFamily: 'var(--font-britti)',
              fontWeight: 400,
              fontSize: '24px',
              lineHeight: '140%',
              textDecorationLine: 'underline',
              textTransform: 'capitalize',
              color: '#FFFFFF',
              textDecoration: 'underline',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}
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
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '758px',
          background: '#1B1B1B',
          overflow: 'hidden',
        }}
      >
        {/* Section label — top-left at left:39, top:85 */}
        <SectionHeading
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
            />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 5. CALL TO ACTION SECTION                                 */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="cta"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1px 0px',
          gap: '80px',
          width: '100%',
          background: '#1B1B1B',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Heading block — centered, max-width 584px ─── */}
        <div
          id="cta-text"
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
          src={undefined /* '/images/cta-billboard.png' */}
          alt="Billboard showcase"
          style={{ flexShrink: 0 }}
        />
      </section>

    </div>
  )
}
