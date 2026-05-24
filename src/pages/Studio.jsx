import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Discovery from '../assets/Image/DesignProcess/Discovery.jpeg'
import Research from '../assets/Image/DesignProcess/ResearchandPositioning.jpeg'
import Strategy from '../assets/Image/DesignProcess/Strategy.jpeg'
import VisualDirection from '../assets/Image/DesignProcess/VisualDirection.mp4'
import ConceptDevelopment from '../assets/Image/DesignProcess/ConceptDevelopment.jpeg'
import Refinement from '../assets/Image/DesignProcess/Refinement.jpeg'
import Production from '../assets/Image/DesignProcess/Production.jfif'
import Project1 from '../assets/project-1.png'
import BrandNarrative from '../assets/Image/Service/BrandNarrative.gif'
import BrandStrategy from '../assets/Image/Service/Website.jpeg'
import DigitalProduct from '../assets/Image/Service/DigitalProduct.png'
import Prototype from '../assets/Image/Service/Prototype.jfif'
import VisualIdentity from '../assets/Image/Service/DigitalProduct2.jfif'
import HeroImageVideo from '../assets/Image/StudioImage.mp4'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────
// TESTIMONIAL DATA — all cards equal 320×320px
// ─────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 't1',
    text: '"The brand they built for us opened doors we didnt know how to knock on before."',
    name: 'Alex Carter',
    role: 'Product Designer, Base',
    verified: false,
    initials: 'AC',
    avatarBg: '#3A3A5C',
  },
  {
    id: 't2',
    text: '"They didn\'t just design a logo — they gave our business a voice we hadn\'t found yet."',
    name: 'Ethan Hunt',
    role: 'Product Designer, Base',
    verified: true,
    initials: 'EH',
    avatarBg: '#5C3A4A',
  },
  {
    id: 't3',
    text: '"Six weeks in, our conversion rate jumped 40%. Design had everything to do with it."',
    name: 'Jordan Kim',
    role: 'Frontend Engineer, Atlas',
    verified: false,
    initials: 'JK',
    avatarBg: '#3A5C4A',
  },
  {
    id: 't4',
    text: '"Working with Studione felt like having a creative director on call. Precise, fast, intentional."',
    name: 'Alicia Roberts',
    role: 'Founder, PixelPath',
    verified: false,
    initials: 'AR',
    avatarBg: '#5C4A3A',
  },
  {
    id: 't5',
    text: '"Rare to find a team that understands your vision so well. Studione gets it done with precision and real care."',
    name: 'Marcus Lee',
    role: 'CEO, Launchpad',
    verified: false,
    initials: 'ML',
    avatarBg: '#3A4A5C',
  },
  {
    id: 't6',
    text: '"Every deliverable was pixel-perfect. Our rebrand exceeded every single expectation we had set going in."',
    name: 'Priya Sharma',
    role: 'Marketing Lead, Novu',
    verified: true,
    initials: 'PS',
    avatarBg: '#4A5C3A',
  },
]

// ─────────────────────────────────────────────────────────────────
// SERVICES DATA — list items + card content
// ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'svc-1',
    label: 'Discovery',
    desc: 'We begin by listening. Brand audits, stakeholder interviews, and competitor analysis to understand not just where you are — but where the opportunity actually lives.',
    // image: '/images/services-discovery.png',
    image: Discovery
  },
  {
    id: 'svc-2',
    label: 'Research & Positioning',
    desc: 'We identify where your brand can own a credible, differentiated position — and map out the whitespace competitors haven\'t claimed. The output is a clear positioning statement and messaging framework your whole team can align around.',
    // image: '/images/services-research.png',
    image: Research
  },
  {
    id: 'svc-3',
    label: 'Strategy & Briefing',
    desc: 'Research becomes a creative brief. We translate positioning, audience insight, and business goals into a clear strategic direction — the single document that aligns clients and creatives before any concept work begins.',
    // image: '/images/services-strategy.png',
    image: Strategy
  },
  {
    id: 'svc-4',
    label: 'Visual Direction',
    desc: 'Before committing to a single direction, we explore the visual language — moodboards, typographic pairings, colour worlds, and reference systems. This is where we establish the aesthetic parameters of the brand together.',
    // image: '/images/services-visual.png',
    image: VisualDirection
  },
  {
    id: 'svc-5',
    label: 'Concept Development',
    desc: 'The strategy becomes form. We develop initial brand concepts — identity systems, layout principles, and visual expressions — presented with rationale. You see not just what we made, but why it works for your brand specifically.',
    // image: '/images/services-concept.png',
    image: ConceptDevelopment
  },
  {
    id: 'svc-6',
    label: 'Refinement',
    desc: 'We take the chosen direction and tighten every detail — spacing, hierarchy, balance, and behaviour across formats. This is where good becomes precise. We don\'t consider the work done until it holds at every size, in every context.',
    // image: '/images/services-refinement.png',
    image: Refinement
  },
  {
    id: 'svc-7',
    label: 'Production',
    desc: 'Final assets, brand guidelines, and a structured handoff. Every file is named, organised, and documented so your team — or the next agency — can work from them without ambiguity. The brand is yours to use from day one.',
    // image: '/images/services-production.png',
    image: Production
  },
]

// ─────────────────────────────────────────────────────────────────
// ABOUT PROJECTS — auto-cycling content
// ─────────────────────────────────────────────────────────────────
const ABOUT_PROJECTS = [
  {
    id: 'ap-1',
    tag: 'Brand Identity',
    image: Project1,
    desc: 'A full brand identity for a global property management platform — built to communicate trust across markets, from Lagos to London.',
  },
  {
    id: 'ap-2',
    tag: 'Web Design',
    image: Project1,
    desc: 'We craft digital experiences that convert visitors into believers. Our web design process balances aesthetics with strategy for measurable, lasting impact across every screen.',
  },
  {
    id: 'ap-3',
    tag: 'Design System',
    image: Project1,
    desc: 'Building scalable design foundations that empower your entire product team. Consistent, reusable, and built for growth and long-term collaboration between design and engineering.',
  },
]

// ─────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────

const isVideoAsset = (url) => typeof url === 'string' && /\.(mp4|webm|ogg|mov)($|\?)/i.test(url);

/** Placeholder tile identical to Home.jsx pattern */
function ImagePlaceholder({ width, height, src, alt = '', style = {} }) {
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
          style={{ width, height, objectFit: 'cover', display: 'block', flexShrink: 0, ...style }}
        />
      )
    }
    return (
      <img
        src={src}
        alt={alt}
        style={{ width, height, objectFit: 'cover', display: 'block', flexShrink: 0, ...style }}
      />
    )
  }
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
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.25">
        <rect x="4" y="4" width="32" height="32" rx="4" stroke="#FFF" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="3" stroke="#FFF" strokeWidth="1.5" />
        <path d="M4 28l9-9 6 6 4-4 13 13" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

/**
 * Single 320×320 testimonial card.
 * All cards share identical dimensions per design spec.
 */
function TestimonialCard({ card }) {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '3.2rem',
        gap: '0.8rem',
        width: '32rem',
        minWidth: '32rem',
        height: '32rem',
        background: '#FAFAFA',
        boxSizing: 'border-box',
        flexShrink: 0,
        userSelect: 'none',   /* prevent text selection while dragging */
        pointerEvents: 'none',   /* card itself doesn't interfere with drag */
      }}
    >
      {/* Testimonial body */}
      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 400,
          fontSize: '1.5rem',
          lineHeight: '150%',
          letterSpacing: '-0.02rem',
          color: '#5E5E5E',
          margin: 0,
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {card.text}
      </p>

      {/* Profile row */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.2rem', width: '100%' }}>
        {/* Avatar */}
        <div
          style={{
            width: '3.2rem',
            height: '3.2rem',
            borderRadius: '100px',
            background: card.avatarBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '1.1rem',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.75)',
            fontFamily: "'Inter', system-ui",
          }}
        >
          {card.initials}
        </div>

        {/* Name + role */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span
              style={{
                fontFamily: "'Inter', system-ui",
                fontWeight: 500,
                fontSize: '1.5rem',
                lineHeight: '150%',
                letterSpacing: '-0.02rem',
                color: '#000000',
              }}
            >
              {card.name}
            </span>
            {card.verified && (
              <span
                title="Verified"
                style={{
                  width: '1.4rem', height: '1.4rem',
                  background: '#4C9EEB',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
          </div>
          <span
            style={{
              fontFamily: "'Inter', system-ui",
              fontWeight: 400,
              fontSize: '1.3rem',
              lineHeight: '150%',
              letterSpacing: '-0.01rem',
              color: '#7C7C7C',
            }}
          >
            {card.role}
          </span>
        </div>
      </div>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────────
// DESIGN PROCESS SECTION — circular-shift carousel
//
// Behaviour:
//  • Exactly 7 items, each absolutely positioned inside an overflow:hidden clip.
//  • Active item is ALWAYS at slot 0 (top, white). Others are muted below.
//  • On advance: every item slides UP one UNIT. Outgoing (top) item wraps
//    invisibly to the bottom, creating the "Discovery disappears top,
//    reappears last" effect the user described.
//  • Backward: every item slides DOWN one UNIT. Bottom item snaps above
//    the clip and slides in.
//  • Triggers: auto-cycle (10 s), mouse-wheel over the list, hover on an item.
//  • All logic lives in one stable useEffect — no stale-closure issues.
//  • Card (left) stays static at top:328 px; content cross-fades.
// ─────────────────────────────────────────────────────────────────
function DesignProcessSection() {
  const [activeIdx, setActiveIdx] = useState(0)   // drives card content render

  // ── Refs ─────────────────────────────────────────────────────────
  const cardImgRef  = useRef(null)
  const cardDescRef = useRef(null)
  const clipRef     = useRef(null)     // overflow:hidden window + wheel target
  const itemEls     = useRef([])       // itemEls[serviceIdx] = DOM element
  const intervalRef = useRef(null)
  const isAnimRef   = useRef(false)
  const activeRef   = useRef(0)        // service index currently at slot 0

  // ── Mobile tap-to-preview refs ─────────────────────────────────
  const mobileSlots  = useRef([])      // card-slot wrappers (height animated)
  const mobileInners = useRef([])      // card-inner divs (opacity/y animated)
  const mobileActive = useRef(0)       // avoids stale-closure in callback
  const CARD_H = 284                   // 220px image + 20px gap + 44px text

  // ── Physical constants ────────────────────────────────────────────
  const N    = SERVICES.length         // 7
  const UNIT = 80                      // px per slot (64 px font + 16 px gap)

  // ── Set initial absolute y positions before first paint ───────────
  useLayoutEffect(() => {
    let mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      for (let slot = 0; slot < N; slot++) {
        const el = itemEls.current[slot]   // initially slot i holds service i
        if (el) gsap.set(el, { y: slot * UNIT })
      }
    })
    return () => mm.revert()
  }, [N, UNIT])

  // ── All carousel logic in one stable effect ───────────────────────
  useEffect(() => {
    let mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      // Reset state to item 0 when crossing breakpoint to desktop
      setActiveIdx(0)
      activeRef.current = 0

      // slotOrder[slot] = serviceIdx currently at that visual slot
      // Mutated in place — no React re-render needed for list positions
      let slotOrder = [0, 1, 2, 3, 4, 5, 6]

      // ── Color helpers ───────────────────────────────────────────────
      const setColors = (activeSvcIdx) => {
        itemEls.current.forEach((el, i) => {
          if (!el) return
          gsap.to(el, {
            color: i === activeSvcIdx ? '#FFFFFF' : '#272626',
            duration: 0.40,
            ease: 'power2.out',
          })
        })
      }

      // ── Card cross-fade ─────────────────────────────────────────────
      const fadeCard = (idx) => {
        if (idx === activeRef.current) return
        activeRef.current = idx
        setActiveIdx(idx)
        const img  = cardImgRef.current
        const desc = cardDescRef.current
        if (!img || !desc) return
        gsap.timeline()
          .to([img, desc], { opacity: 0, y: -8, duration: 0.25, ease: 'power2.in',  stagger: 0.04 })
          .set([img, desc], { y: 12 })
          .to([img, desc], { opacity: 1, y: 0,  duration: 0.38, ease: 'power2.out', stagger: 0.04 })
      }

      // ── Restart auto-cycle from zero ────────────────────────────────
      const restartCycle = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(advanceFwd, 10000)
      }

      // ── FORWARD: slide all items UP one UNIT, top wraps to bottom ───
      function advanceFwd() {
        if (isAnimRef.current) return
        isAnimRef.current = true

        const outSvcIdx = slotOrder[0]   // currently active → wraps to bottom
        const inSvcIdx  = slotOrder[1]   // next in line → becomes active
        const DUR  = 0.70
        const EASE = 'power3.inOut'

        // 1. Slide every item up by one UNIT
        slotOrder.forEach(svcIdx => {
          gsap.to(itemEls.current[svcIdx], { y: `-=${UNIT}`, duration: DUR, ease: EASE })
        })

        // 2. At 45 % of the way: wrap outgoing from -UNIT to N*UNIT (off-screen bottom)
        //    then animate it into the last slot — completes simultaneously with others.
        gsap.delayedCall(DUR * 0.45, () => {
          gsap.set(itemEls.current[outSvcIdx], { y: N * UNIT })
          gsap.to(itemEls.current[outSvcIdx], {
            y: (N - 1) * UNIT,
            duration: DUR * 0.55,
            ease: 'power2.out',
          })
        })

        // 3. Update active state immediately (colour + card)
        setColors(inSvcIdx)
        fadeCard(inSvcIdx)

        // 4. Rotate order: [1,2,3,4,5,6,0]
        slotOrder = [...slotOrder.slice(1), slotOrder[0]]

        // 5. Unlock after full duration
        gsap.delayedCall(DUR, () => { isAnimRef.current = false })
      }

      // ── BACKWARD: slide all items DOWN one UNIT, bottom wraps to top ─
      function advanceBwd() {
        if (isAnimRef.current) return
        isAnimRef.current = true

        const inSvcIdx = slotOrder[N - 1]   // last item → wraps to top (active)
        const DUR  = 0.70
        const EASE = 'power3.inOut'

        // 1. Snap incoming item from its slot (6*UNIT) to just above clip (-UNIT)
        gsap.set(itemEls.current[inSvcIdx], { y: -UNIT })

        // 2. Slide every item DOWN by one UNIT
        slotOrder.forEach(svcIdx => {
          gsap.to(itemEls.current[svcIdx], { y: `+=${UNIT}`, duration: DUR, ease: EASE })
        })

        setColors(inSvcIdx)
        fadeCard(inSvcIdx)

        // Rotate order: [6,0,1,2,3,4,5]
        slotOrder = [slotOrder[N - 1], ...slotOrder.slice(0, N - 1)]

        gsap.delayedCall(DUR, () => {
          isAnimRef.current = false
          restartCycle()
        })
      }

      // ── Auto-cycle ─────────────────────────────────────────────────
      intervalRef.current = setInterval(advanceFwd, 10000)

      // ── Wheel handler ──────────────────────────────────────────────
      let wheelCooldown = false
      const onWheel = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (wheelCooldown) return
        wheelCooldown = true
        setTimeout(() => { wheelCooldown = false }, 150)   // throttle rapid spin

        if (e.deltaY > 0) { advanceFwd(); restartCycle() }
        else              { advanceBwd() }
      }

      const clip = clipRef.current
      if (clip) clip.addEventListener('wheel', onWheel, { passive: false })

      // Cleanup function to be run by matchMedia
      return () => {
        clearInterval(intervalRef.current)
        if (clip) clip.removeEventListener('wheel', onWheel)
      }
    })

    return () => mm.revert()
  }, [])  // stable — all refs, nothing to re-capture

  // ── Mobile tap handler ───────────────────────────────────────────
  const handleMobileTap = useCallback((tappedIdx) => {
    const prevIdx = mobileActive.current
    if (tappedIdx === prevIdx) return // already open

    const EASE = 'power3.inOut'
    const DUR  = 0.6

    // Close previous card
    const prevSlot  = mobileSlots.current[prevIdx]
    const prevInner = mobileInners.current[prevIdx]
    if (prevSlot && prevInner) {
      gsap.to(prevInner, { opacity: 0, y: -8, duration: DUR * 0.5, ease: 'power2.in' })
      gsap.to(prevSlot,  { height: 0, duration: DUR, ease: EASE })
    }

    // Open tapped card
    const slot  = mobileSlots.current[tappedIdx]
    const inner = mobileInners.current[tappedIdx]
    if (slot && inner) {
      gsap.set(inner, { opacity: 0, y: 15 })
      gsap.to(slot,  { height: CARD_H, duration: DUR, ease: EASE })
      gsap.to(inner, { opacity: 1, y: 0, duration: DUR * 0.8, ease: 'power2.out', delay: DUR * 0.2 })
    }

    // Update colors
    SERVICES.forEach((_, i) => {
      const btn = mobileSlots.current[i]?.previousElementSibling
      if (btn) gsap.to(btn, { color: i === tappedIdx ? '#FFFFFF' : '#272626', duration: 0.3 })
    })

    mobileActive.current = tappedIdx
    setActiveIdx(tappedIdx)
  }, [CARD_H])

  // ── Initialize first mobile card as open ─────────────────────────
  useEffect(() => {
    let mm = gsap.matchMedia()

    mm.add('(max-width: 767px)', () => {
      // Always reset to first item on mobile
      setActiveIdx(0)
      mobileActive.current = 0

      const firstSlot  = mobileSlots.current[0]
      const firstInner = mobileInners.current[0]
      if (firstSlot)  gsap.set(firstSlot,  { height: CARD_H })
      if (firstInner) gsap.set(firstInner, { opacity: 1, y: 0 })
      
      // Close all others
      for (let i = 1; i < SERVICES.length; i++) {
        const s = mobileSlots.current[i]
        const inner = mobileInners.current[i]
        if (s) gsap.set(s, { height: 0 })
        if (inner) gsap.set(inner, { opacity: 0, y: 12 })
      }
    })

    return () => mm.revert()
  }, [CARD_H])

  const svc = SERVICES[activeIdx]

  return (
    <section
      id="studio-design-process"
      style={{
        width: '100%',
        background: '#020202',
        position: 'relative',
        boxSizing: 'border-box',
        minHeight: '94.9rem',
        overflow: 'hidden',
      }}
    >
      <style>{`
        /* Desktop: show absolute layout, hide mobile */
        .dp-mobile-layout { display: none; }
        .dp-desktop-layout { display: block; }
        #studio-services-title,
        #studio-services-card,
        #studio-services-list-clip { display: flex; }

        @media (max-width: 47.938em) {
          .dp-mobile-layout { display: flex !important; }
          .dp-desktop-layout { display: none !important; }
          #studio-services-title,
          #studio-services-card,
          #studio-services-list-clip { display: none !important; }

          #studio-design-process {
            min-height: auto !important;
            position: relative !important;
          }
          .dp-mobile-layout {
            flex-direction: column;
            align-items: flex-start;
            padding: 0 1.6rem 9.6rem;
            gap: 6.4rem;
            width: 100%;
            box-sizing: border-box;
          }
          .dp-mobile-title {
            font-family: var(--font-britti);
            font-weight: 400;
            font-size: 2.2rem;
            line-height: 120%;
            color: #FFFFFF;
            margin: 0;
          }
          .dp-mobile-list {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2.4rem;
            width: 100%;
          }
          .dp-mobile-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 1.6rem;
            width: 100%;
          }
          .dp-mobile-item {
            background: none;
            border: none;
            padding: 0;
            font-family: var(--font-britti);
            font-weight: 300;
            font-size: 2.8rem;
            line-height: 100%;
            text-transform: capitalize;
            color: #272626;
            cursor: pointer;
            text-align: left;
            width: 100%;
          }
          .dp-mobile-card-slot {
            overflow: hidden;
            height: 0;
            width: 100%;
          }
          .dp-mobile-card-inner {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
            width: 100%;
            opacity: 0;
          }
          .dp-mobile-card-text {
            display: flex;
            flex-direction: column;
            gap: 1.6rem;
            width: 100%;
          }
          .dp-mobile-card-text p {
            font-family: var(--font-britti);
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 140%;
            letter-spacing: -0.02em;
            color: #A6A6A6;
            margin: 0;
          }
        }
      `}</style>

      <div className="dp-desktop-layout">
        {/* ── Section title ─────────────────────────────────────── */}
        <p
          // id="studio-services-title"
          style={{
            position: 'absolute',
            left: '4rem',
            top: '9.6rem',
            width: 'clamp(22rem, 55vw, 79.3rem)',
            fontFamily: 'var(--font-britti)',
            fontWeight: 400,
            fontSize: '3.2rem',
            lineHeight: '120%',
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          <span style={{ color: '#FFFFFF' }}>
            Every project begins with a question: what does this brand need to do?{' '}
          </span>
          <span style={{ color: '#6B6B6B' }}>
            From that point, we move through research, strategy, identity, and execution — each stage informed by the last.
          </span>
        </p>

        {/* ── Card — left column, static ───────────────────────── */}
        <div
          id="studio-services-card"
          style={{
            position: 'absolute',
            left: '4rem',
            top: '32.8rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '2rem',
            width: '38.7rem',
          }}
        >
          <div
            ref={cardImgRef}
            style={{ width: '38.7rem', height: '26rem', overflow: 'hidden', flexShrink: 0 }}
          >
            {svc.image ? (
              isVideoAsset(svc.image) ? (
                <video
                  src={svc.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <img
                  src={svc.image}
                  alt={svc.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )
            ) : (
              <div
                style={{
                  width: '100%', height: '100%',
                  background: '#232222',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.25">
                  <rect x="4" y="4" width="32" height="32" rx="4" stroke="#FFF" strokeWidth="1.5" />
                  <circle cx="14" cy="14" r="3" stroke="#FFF" strokeWidth="1.5" />
                  <path d="M4 28l9-9 6 6 4-4 13 13" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>

          <div
            ref={cardDescRef}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', gap: '1.6rem',
              width: '100%', maxWidth: '38.7rem',
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400, fontSize: '1.8rem',
                lineHeight: '140%', letterSpacing: '-0.02em',
                color: '#C0C0C0', margin: 0,
              }}
            >
              {svc.desc}
            </p>
          </div>
        </div>
      </div>

      {/* ── Service list — right column ──────────────────────── */}
      {/*
          Clip window: overflow:hidden hides items sliding in/out of the
          top and bottom. Height = (N-1)*UNIT + 64 = 6*80 + 64 = 544 px.
          Items are absolutely positioned inside; GSAP controls their y.
          Mouse-wheel here changes the active item without page scroll.
      */}
      <div
        ref={clipRef}
        id="studio-services-list-clip"
        style={{
          position: 'absolute',
          right: '4rem',
          top: '34.1rem',
          width: 'clamp(28rem, 43vw, 62.3rem)',
          height: `${(N - 1) * UNIT + 64}px`,   /* 544 px — shows all N items exactly */
          overflow: 'hidden',
        }}
      >
        {/*
            Inner container — position:relative so absolute children
            are scoped here. Height = N * UNIT (560 px).
        */}
        <div style={{ position: 'relative', height: `${N * UNIT}px`, width: '100%' }}>
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              ref={el => (itemEls.current[i] = el)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '6.4rem',
                fontFamily: 'var(--font-britti)',
                fontWeight: 300,
                fontSize: 'clamp(2.8rem, 4.4vw, 6.4rem)',
                lineHeight: '6.4rem',  /* exact item height — fixed px constraint, not a ratio */
                textAlign: 'right',
                textTransform: 'capitalize',
                color: i === 0 ? '#FFFFFF' : '#272626',
                userSelect: 'none',
                cursor: 'default',
                willChange: 'transform',
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── MOBILE TAP LAYOUT ─────────────────────────────────── */}
      <div className="dp-mobile-layout">
        <p className="dp-mobile-title">
          <span>Every project begins with a question: what does this brand need to do? </span>
          <span style={{ color: '#6B6B6B' }}>From that point, we move through research, strategy, identity, and execution — each stage informed by the last.</span>
        </p>

        <div className="dp-mobile-list">
          {SERVICES.map((s, i) => (
            <div key={s.id} className="dp-mobile-group">
              <button
                className="dp-mobile-item"
                style={{ color: i === activeIdx ? '#FFFFFF' : '#272626' }}
                onClick={() => handleMobileTap(i)}
              >
                {s.label}
              </button>

              <div
                ref={el => (mobileSlots.current[i] = el)}
                className="dp-mobile-card-slot"
              >
                <div
                  ref={el => (mobileInners.current[i] = el)}
                  className="dp-mobile-card-inner"
                >
                  <ImagePlaceholder
                    width="100%"
                    height="220px"
                    src={s.image}
                    alt={s.label}
                  />
                  <div className="dp-mobile-card-text">
                    <p>{s.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────
// SERVICES DATA — stacked card accordion
// ─────────────────────────────────────────────────────────────────
const SERVICES_CARDS = [
  {
    id: 'sc-1',
    num: '01',
    title: 'Visual identities',
    desc: 'A complete brand identity system — logo suite, wordmark, typography, colour palette, iconography, and usage rules. Built to be flexible enough to adapt, and distinct enough to own. Whether you\'re launching from scratch or refreshing what exists, we design identities that hold up at every scale.',
    bg: '#EAEEED',
    image: VisualIdentity
  },
  {
    id: 'sc-2',
    num: '02',
    title: 'Brand narratives',
    desc: 'Crafting the stories that give your brand purpose, voice, and enduring resonance with the audiences that matter.',
    bg: '#5EDDE6',
    image: BrandNarrative
  },
  {
    id: 'sc-3',
    num: '03',
    title: 'Digital products',
    desc: 'UI design and scalable design systems for web and mobile products. We create component libraries, interaction patterns, and documentation that bridge design and engineering — so your product looks intentional and ships faster.',
    bg: '#EAEEED',
    image: DigitalProduct
  },
  {
    id: 'sc-4',
    num: '04',
    title: 'Brand Strategy & Positioning',
    desc: 'Before anything is designed, we establish what the brand believes, who it\'s for, and how it communicates. Positioning framework, messaging pillars, tone of voice, and a brand narrative your team can actually use — across pitches, campaigns, and every client touchpoint.',
    bg: '#FA4A47',
    image: BrandStrategy
  },
  {
    id: 'sc-5',
    num: '05',
    title: 'Prototypes',
    desc: 'Developing interactive models to test how a brand or product behaves before a single line of production code is written. Useful for investor presentations, usability testing, and internal alignment — when you need to show the idea before you build it.',
    bg: '#F7D066',
    image: Prototype
  },
]

// ─────────────────────────────────────────────────────────────────
// SERVICES SECTION — stacked card accordion with scroll reveal
//
// Behaviour:
//  • 5 cards, absolutely positioned, z-indexed (card 5 on top).
//  • Cards 2-5 start translateY(+1050px) — hidden below section.
//  • ScrollTrigger pins the section; as user scrolls, each card
//    slides up to its final stacked position, one by one.
//  • Final state: accordion stack with 69px tabs visible per card.
//  • Hover: the hovered card lifts up by 28px ("pull from stack").
//  • Mouse leave: smooth return to stacked position.
// ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  const sectionWrapRef = useRef(null)
  const sectionRef   = useRef(null)
  const cardsWrapRef = useRef(null)
  const cardRefs     = useRef([])
  const mobileCardsWrapRef = useRef(null)
  const mobileCardRefs     = useRef([])
  const tlRef        = useRef(null)

  const CARD_H  = 556    // px — full card height
  const TAB_H   = 69     // px — visible strip per collapsed card
  const TOP_0   = 189    // px — first card top offset within section
  const N       = SERVICES_CARDS.length   // 5

  // ── Initial setup & Scroll-driven reveal ────────────────────────
  useLayoutEffect(() => {
    const sectionWrap = sectionWrapRef.current
    const section = sectionRef.current
    const cardsWrap = cardsWrapRef.current
    if (!sectionWrap || !section || !cardsWrap || cardRefs.current.some(c => !c)) return

    let mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      // Hide cards 2-5 below the section fold
      for (let i = 1; i < N; i++) {
        const el = cardRefs.current[i]
        if (el) gsap.set(el, { y: 1050 })
      }

      // ── Timeline for card stacking ─────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsWrap,
          pin: true,
          start: 'top 8rem',
          end: `+=${(N - 1) * 320}`,   // 4 × 320 = 1280 px of virtual scroll
          scrub: 1.2,
        },
      })
      tlRef.current = tl

      // Cards 2-5 slide up into their stacked positions, one by one
      for (let i = 1; i < N; i++) {
        tl.to(
          cardRefs.current[i],
          { y: 0, duration: 1, ease: 'power2.inOut' },
          i - 1
        )
      }

      // ── Immersive: Hide Global Navbar while section is being scrolled pass ──
      ScrollTrigger.create({
        trigger: sectionWrap,
        start: 'top 10%',
        end: 'bottom 10%',
        onEnter:      () => gsap.to('#navbar-v1', { opacity: 0, pointerEvents: 'none', duration: 0.4 }),
        onLeave:      () => gsap.to('#navbar-v1', { opacity: 1, pointerEvents: 'all',  duration: 0.4 }),
        onEnterBack:  () => gsap.to('#navbar-v1', { opacity: 0, pointerEvents: 'none', duration: 0.4 }),
        onLeaveBack:  () => gsap.to('#navbar-v1', { opacity: 1, pointerEvents: 'all',  duration: 0.4 }),
      })
    })

    mm.add('(max-width: 767px)', () => {
      const mobWrap = mobileCardsWrapRef.current
      if (!mobWrap) return

      // Hide cards 2-5 below the container initially
      for (let i = 1; i < N; i++) {
        const el = mobileCardRefs.current[i]
        if (el) gsap.set(el, { y: 800 })
      }

      // Mobile accordion timeline
      const mobTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionWrap,
          pin: section,
          start: 'top top',
          end: `+=${(N - 1) * 200}`, // 800px virtual scroll
          scrub: 1.2,
        },
      })

      // Slide cards up sequentially
      for (let i = 1; i < N; i++) {
        mobTl.to(
          mobileCardRefs.current[i],
          { y: 0, duration: 1, ease: 'power2.inOut' },
          i - 1
        )
      }

      // ── Immersive: Hide Global Navbar while section is being scrolled pass ──
      ScrollTrigger.create({
        trigger: sectionWrap,
        start: 'top 10%',
        end: 'bottom 10%',
        onEnter:      () => gsap.to('#navbar-v1', { opacity: 0, pointerEvents: 'none', duration: 0.4 }),
        onLeave:      () => gsap.to('#navbar-v1', { opacity: 1, pointerEvents: 'all',  duration: 0.4 }),
        onEnterBack:  () => gsap.to('#navbar-v1', { opacity: 0, pointerEvents: 'none', duration: 0.4 }),
        onLeaveBack:  () => gsap.to('#navbar-v1', { opacity: 1, pointerEvents: 'all',  duration: 0.4 }),
      })
    })

    return () => mm.revert()
  }, [N])

  // ── Hover: lift card like pulling from a stack ────────────────────
  // We capture the card's live y on mouseEnter and restore it on leave.
  const baseY = useRef(new Array(N).fill(0))

  const handleEnter = (i) => {
    const el = cardRefs.current[i]
    if (!el) return
    baseY.current[i] = gsap.getProperty(el, 'y')
    gsap.to(el, {
      y: baseY.current[i] - 28,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleLeave = (i) => {
    const el = cardRefs.current[i]
    if (!el) return
    gsap.to(el, {
      y: baseY.current[i],
      duration: 0.55,
      ease: 'power2.inOut',
      overwrite: 'auto',
    })
  }

  return (
    <div ref={sectionWrapRef} style={{ width: '100%', position: 'relative' }}>
      <section
        ref={sectionRef}
        id="studio-services"
      style={{
        width: '100%',
        background: '#020202',
        position: 'relative',
        boxSizing: 'border-box',
        paddingBottom: '20rem', // extra space for scroll
        zIndex: 10,
      }}
    >
      <style>{`
        .svc-desktop-title, .svc-desktop-cards { display: block; }
        .svc-mobile-layout { display: none; }

        @media (max-width: 47.938em) {
          .svc-desktop-title, .svc-desktop-cards { display: none !important; }
          .svc-mobile-layout { display: flex !important; }
          #studio-services { padding-bottom: 0 !important; }
        }
      `}</style>

      {/* ── "What we offer" title — natural flow, scrolls away ───── */}
      <p 
        className='svc-desktop-title'
        style={{
          padding: '12.8rem 0 10rem 4rem',
          fontFamily: 'var(--font-britti)',
          fontWeight: 400,
          fontSize: '3.2rem',
          lineHeight: '140%',
          color: '#FFFFFF',
          margin: 0,
        }}
      >
        What we offer
      </p>

      {/* ── Stacked cards wrap — this Pins at 80px ────────────────── */}
      <div
        ref={cardsWrapRef}
        className="svc-desktop-cards"
        style={{
          position: 'relative',
          width: '100%',
          height: '90rem', // height of the full-open stack
        }}
      >
        {SERVICES_CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={el => (cardRefs.current[i] = el)}
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
            style={{
              position: 'absolute',
              left: '4rem',
              top: i * TAB_H,
              width: 'calc(100% - 8rem)',
              height: CARD_H,
              background: card.bg,
              zIndex: i + 1,
              willChange: 'transform',
              cursor: 'default',
              overflow: 'hidden',
            }}
          >
          {/* Content row: pinned at left: 28.5rem top: 3.6rem */}
          <div
            style={{
              position: 'absolute',
              left: '32.5rem',
              top: '3.6rem',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: '5.1rem',
              width: '58.1rem',
            }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily: 'var(--font-britti)',
                fontWeight: 400,
                fontSize: '2.4rem',
                lineHeight: '2.5',
                color: '#1B1B1B',
                flexShrink: 0,
                width: '2.7rem',
              }}
            >
              {card.num}
            </span>

            {/* Right column: title + image + desc */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '4.8rem',
                width: '50.8rem',
              }}
            >
              {/* Service title */}
              <h3
                style={{
                  fontFamily: 'var(--font-britti)',
                  fontWeight: 400,
                  fontSize: '5.53rem',
                  lineHeight: '5.6rem',
                  color: '#1B1B1B',
                  margin: 0,
                  width: '100%',
                }}
              >
                {card.title}
              </h3>

              {/* Image + description */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3.2rem',
                  width: '100%',
                }}
              >
                {/* Image placeholder or actual image */}
                <div
                  style={{
                    width: '100%',
                    height: '24.8rem',
                    background: '#D0D0D0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {card.image ? (
                    isVideoAsset(card.image) ? (
                      <video
                        src={card.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    ) : (
                      <img
                        src={card.image}
                        alt={card.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    )
                  ) : (
                    <svg width="44" height="44" viewBox="0 0 40 40" fill="none" opacity="0.35">
                      <rect x="4" y="4" width="32" height="32" rx="4" stroke="#666" strokeWidth="1.5" />
                      <circle cx="14" cy="14" r="3" stroke="#666" strokeWidth="1.5" />
                      <path d="M4 28l9-9 6 6 4-4 13 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-britti)',
                    fontWeight: 400,
                    fontSize: '1.8rem',
                    lineHeight: '140%',
                    letterSpacing: '0rem',
                    color: '#595959',
                    margin: 0,
                    width: '100%',
                  }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>

      {/* ── MOBILE STACKED CARDS ────────────────────────────────── */}
      <div
        className="svc-mobile-layout"
        style={{
          flexDirection: 'column',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Mobile title */}
        <div
          style={{
            display: 'flex',
            padding: '4rem 1.6rem 4rem',
            alignItems: 'flex-start',
            gap: '1rem',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-britti)',
              fontWeight: 400,
              fontSize: '2.4rem',
              lineHeight: '120%',
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            What we offer
          </p>
        </div>

        {/* Mobile stacked cards container */}
        <div
          ref={mobileCardsWrapRef}
          style={{
            position: 'relative',
            width: '100%',
            minWidth: '32rem',
            height: '62rem',
            overflow: 'hidden',
          }}
        >
          {SERVICES_CARDS.map((card, i) => (
            <div
              key={card.id}
              ref={el => mobileCardRefs.current[i] = el}
              style={{
                position: 'absolute',
                left: 0,
                top: `${i * 60}px`,
                width: '100%',
                height: '38rem',
                background: card.bg,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                padding: '2.4rem 2.4rem 4rem 1.6rem',
                gap: '1.4rem',
                boxSizing: 'border-box',
                willChange: 'transform',
                zIndex: i + 1,
                overflow: 'hidden',
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: 'var(--font-britti)',
                  fontWeight: 400,
                  fontSize: '1.4rem',
                  lineHeight: '140%',
                  color: '#1B1B1B',
                  flexShrink: 0,
                }}
              >
                {card.num}
              </span>

              {/* Content column */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '1.6rem',
                  flex: 1,
                }}
              >
                {/* Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-britti)',
                    fontWeight: 400,
                    fontSize: '2rem',
                    lineHeight: '100%',
                    textTransform: 'capitalize',
                    color: '#1B1B1B',
                    margin: 0,
                  }}
                >
                  {card.title}
                </h3>

                {/* Card: image + text */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '2rem',
                    width: '100%',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '22rem',
                      background: '#D0D0D0',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {card.image ? (
                      isVideoAsset(card.image) ? (
                        <video
                          src={card.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      ) : (
                        <img
                          src={card.image}
                          alt={card.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      )
                    ) : (
                      <svg width="44" height="44" viewBox="0 0 40 40" fill="none" opacity="0.35">
                        <rect x="4" y="4" width="32" height="32" rx="4" stroke="#666" strokeWidth="1.5" />
                        <circle cx="14" cy="14" r="3" stroke="#666" strokeWidth="1.5" />
                        <path d="M4 28l9-9 6 6 4-4 13 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', width: '100%' }}>
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontWeight: 400,
                        fontSize: '1.4rem',
                        lineHeight: '140%',
                        letterSpacing: '-0.02em',
                        color: '#A6A6A6',
                        margin: 0,
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────
// STUDIO PAGE
// ─────────────────────────────────────────────────────────────────
export default function Studio() {

  // ── Refs ──────────────────────────────────────────────────────
  const studioRef = useRef(null)
  const marqueeRef = useRef(null)
  const marqueeStateRef = useRef(null)  // lives state for drag animation

  const aboutImageWrapRef = useRef(null)
  const aboutImageRef = useRef(null)
  const aboutDescRef = useRef(null)
  const tagRef = useRef(null)
  const isTransitioningRef = useRef(false)
  const pendingFadeIn = useRef(false)

  // ── State ─────────────────────────────────────────────────────
  const [activeProject, setActiveProject] = useState(0)

  // Duplicate for seamless infinite loop (6 → 12 cards)
  const dupedCards = [...TESTIMONIALS, ...TESTIMONIALS]

  const currentProject = ABOUT_PROJECTS[activeProject]

  // ════════════════════════════════════════════════════════════════
  // MARQUEE: rAF-based auto-scroll + pointer drag + momentum
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    const container = marqueeRef.current
    if (!container) return

    let mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      /*
        Shared mutable state object – passed to the marqueeStateRef so that
        arrow-button handlers outside this effect can interact with it.
      */
      const S = {
        currentX: 0,          // current transform X in px
        halfWidth: 0,          // scrollWidth / 2 (where the loop restarts)
        // Auto-scroll
        isAutoScrolling: true,
        lastTimestamp: null,
        SPEED: 40,         // px/second — slow enough to read naturally
        // Drag
        isDragging: false,
        isDecelerating: false,
        dragStartX: 0,          // pointer X on pointerdown
        dragStartTranslateX: 0,        // currentX on pointerdown
        lastPointerX: 0,
        lastPointerTime: 0,
        velX: 0,          // smoothed pointer velocity (px/ms)
        frameVelocity: 0,          // velocity carried into decel phase (px/frame)
        FRICTION: 0.90,       // momentum decay per frame
      }
      marqueeStateRef.current = S

      // ── Infinite wrap: keeps currentX in (-halfWidth, 0] ──────
      const wrapX = (x) => {
        if (!S.halfWidth) return 0
        let w = x % S.halfWidth       // JS % keeps sign of dividend
        if (w > 0) w -= S.halfWidth   // positive → bring into negative range
        return w
      }

      // ── RAF IDs ───────────────────────────────────────────────
      let rafId = null
      let decelId = null
      let initId = null

      // ── Main animation tick ───────────────────────────────────
      const tick = (timestamp) => {
        if (S.lastTimestamp === null) S.lastTimestamp = timestamp
        // Cap delta to 50ms so tab-hidden jumps don't teleport cards
        const dt = Math.min(timestamp - S.lastTimestamp, 50)
        S.lastTimestamp = timestamp

        if (S.isAutoScrolling && !S.isDragging && !S.isDecelerating) {
          S.currentX = wrapX(S.currentX - S.SPEED * dt / 1000)
          gsap.set(container, { x: S.currentX })
        }

        rafId = requestAnimationFrame(tick)
      }

      // ── Hover pause / resume ──────────────────────────────────
      const onMouseEnter = () => {
        if (!S.isDragging && !S.isDecelerating) S.isAutoScrolling = false
      }
      const onMouseLeave = () => {
        if (!S.isDragging && !S.isDecelerating) S.isAutoScrolling = true
      }

      // ── Drag: start ───────────────────────────────────────────
      const onPointerDown = (e) => {
        if (S.isDecelerating) {
          cancelAnimationFrame(decelId)
          S.isDecelerating = false
        }
        S.isDragging = true
        S.isAutoScrolling = false
        S.dragStartX = e.clientX
        S.dragStartTranslateX = S.currentX
        S.lastPointerX = e.clientX
        S.lastPointerTime = performance.now()
        S.velX = 0
        container.style.cursor = 'grabbing'
        e.preventDefault()
      }

      // ── Drag: move ────────────────────────────────────────────
      const onPointerMove = (e) => {
        if (!S.isDragging) return
        const now = performance.now()
        const dt = now - S.lastPointerTime
        if (dt > 0) {
          const rawVel = (e.clientX - S.lastPointerX) / dt   // px/ms
          S.velX = S.velX * 0.65 + rawVel * 0.35             // low-pass smoothing
        }
        S.lastPointerX = e.clientX
        S.lastPointerTime = now
        S.currentX = wrapX(S.dragStartTranslateX + (e.clientX - S.dragStartX))
        gsap.set(container, { x: S.currentX })
      }

      // ── Drag: end — apply momentum deceleration ───────────────
      const onPointerUp = () => {
        if (!S.isDragging) return
        S.isDragging = false
        container.style.cursor = 'grab'

        // Convert px/ms → px/frame (≈16.67ms at 60fps)
        S.frameVelocity = S.velX * 16.67

        if (Math.abs(S.frameVelocity) < 0.5) {
          S.isAutoScrolling = true
          return
        }

        S.isDecelerating = true
        const decelerate = () => {
          S.frameVelocity *= S.FRICTION
          S.currentX = wrapX(S.currentX + S.frameVelocity)
          gsap.set(container, { x: S.currentX })
          if (Math.abs(S.frameVelocity) < 0.25) {
            S.isDecelerating = false
            S.isAutoScrolling = true
            return
          }
          decelId = requestAnimationFrame(decelerate)
        }
        decelId = requestAnimationFrame(decelerate)
      }

      // ── Init: measure halfWidth after layout paints ───────────
      initId = requestAnimationFrame(() => {
        S.halfWidth = container.scrollWidth / 2
        rafId = requestAnimationFrame(tick)
      })

      // ── Attach listeners ──────────────────────────────────────
      container.addEventListener('mouseenter', onMouseEnter)
      container.addEventListener('mouseleave', onMouseLeave)
      container.addEventListener('pointerdown', onPointerDown, { passive: false })
      window.addEventListener('pointermove', onPointerMove)
      window.addEventListener('pointerup', onPointerUp)

      return () => {
        cancelAnimationFrame(initId)
        if (rafId) cancelAnimationFrame(rafId)
        if (decelId) cancelAnimationFrame(decelId)
        container.removeEventListener('mouseenter', onMouseEnter)
        container.removeEventListener('mouseleave', onMouseLeave)
        container.removeEventListener('pointerdown', onPointerDown)
        window.removeEventListener('pointermove', onPointerMove)
        window.removeEventListener('pointerup', onPointerUp)
        marqueeStateRef.current = null
      }
    })

    return () => mm.revert()
  }, [])

  // ── Arrow buttons: smooth single-card seek ────────────────────
  const CARD_UNIT = 332  // 320px card + 12px gap

  const handleMarqueeNav = useCallback((direction) => {
    const S = marqueeStateRef.current
    const container = marqueeRef.current
    if (!S || !container) return

    const wasAutoScrolling = S.isAutoScrolling
    S.isAutoScrolling = false

    const targetX = S.currentX + (direction === 'prev' ? CARD_UNIT : -CARD_UNIT)
    const proxy = { val: S.currentX }

    const wrapX = (x) => {
      if (!S.halfWidth) return 0
      let w = x % S.halfWidth
      if (w > 0) w -= S.halfWidth
      return w
    }

    gsap.to(proxy, {
      val: targetX,
      duration: 0.45,
      ease: 'power2.inOut',
      onUpdate() {
        S.currentX = wrapX(proxy.val)
        gsap.set(container, { x: S.currentX })
      },
      onComplete() {
        if (wasAutoScrolling) S.isAutoScrolling = true
      },
    })
  }, [])

  // ════════════════════════════════════════════════════════════════
  // CURSOR-FOLLOWING TAG over About image (useEffect — no cleanup clash)
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    const imgWrap = aboutImageWrapRef.current
    const tagEl = tagRef.current
    if (!imgWrap || !tagEl) return

    let mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const xTo = gsap.quickTo(tagEl, 'x', { duration: 0.3, ease: 'power2.out' })
      const yTo = gsap.quickTo(tagEl, 'y', { duration: 0.3, ease: 'power2.out' })

      const onMove = (e) => {
        const r = imgWrap.getBoundingClientRect()
        xTo(e.clientX - r.left - tagEl.offsetWidth / 2)
        yTo(e.clientY - r.top - tagEl.offsetHeight / 2)
      }
      const onEnter = () => gsap.to(tagEl, { opacity: 1, duration: 0.2 })
      const onLeave = () => gsap.to(tagEl, { opacity: 0, duration: 0.2 })

      imgWrap.addEventListener('mousemove', onMove)
      imgWrap.addEventListener('mouseenter', onEnter)
      imgWrap.addEventListener('mouseleave', onLeave)

      return () => {
        imgWrap.removeEventListener('mousemove', onMove)
        imgWrap.removeEventListener('mouseenter', onEnter)
        imgWrap.removeEventListener('mouseleave', onLeave)
      }
    })

    return () => mm.revert()
  }, [])

  // ════════════════════════════════════════════════════════════════
  // ABOUT SECTION: fade-out → swap content → fade-in cycle
  //   Both the image AND the description+link block animate together
  // ════════════════════════════════════════════════════════════════

  /** Trigger fade-out, then queue state swap */
  const cycleProject = useCallback(() => {
    if (isTransitioningRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setActiveProject(prev => (prev + 1) % ABOUT_PROJECTS.length)
      return
    }

    const imgEl = aboutImageRef.current
    const descEl = aboutDescRef.current
    if (!imgEl || !descEl) return

    isTransitioningRef.current = true

    const tl = gsap.timeline()

    // Image: fade-out and drift up
    tl.to(imgEl, { opacity: 0, y: -20, duration: 0.55, ease: 'power2.in' })
    // Description block (paragraph + link): fade-out slightly after
    tl.to(descEl, { opacity: 0, y: -10, duration: 0.45, ease: 'power2.in' }, '<0.08')
    // Swap content via React state at end of fade-out
    tl.add(() => {
      pendingFadeIn.current = true
      setActiveProject(prev => (prev + 1) % ABOUT_PROJECTS.length)
    })
  }, [])

  /** After React commits new content — fade in image + desc+link together */
  useLayoutEffect(() => {
    if (!pendingFadeIn.current) return
    pendingFadeIn.current = false

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const imgEl = aboutImageRef.current
    const descEl = aboutDescRef.current

    if (!imgEl || !descEl || prefersReduced) {
      isTransitioningRef.current = false
      return
    }

    // Reset to hidden+offset before animating in
    gsap.set(imgEl, { opacity: 0, y: 20 })
    gsap.set(descEl, { opacity: 0, y: 10 })

    gsap.timeline({
      onComplete: () => { isTransitioningRef.current = false },
    })
      .to(imgEl, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
      .to(descEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '<0.08')

  }, [activeProject])

  /**
   * Auto-cycle every 10 seconds — long enough for users to read
   * the full testimonial card AND look around the about image.
   */
  useEffect(() => {
    const id = setInterval(cycleProject, 10000)
    return () => clearInterval(id)
  }, [cycleProject])

  // ────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────
  return (
    <div ref={studioRef} style={{ background: '#020202' }}>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="studio-hero"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '21.4rem 4rem 0rem',
          gap: '12rem',   /* ← 195px → 120px per spec */
          width: '100%',
          background: '#020202',
          boxSizing: 'border-box',
        }}
      >
        {/* Tagline — Britti Sans 80px weight 300 */}
        <h1
          id="studio-hero-tagline"
          style={{
            fontFamily: 'var(--font-britti)',
            fontWeight: 300,
            fontSize: 'clamp(3.6rem, 5.5vw, 8rem)',
            lineHeight: '100%',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            margin: 0,
            width: '100%',
            maxWidth: '99.8rem',
            alignSelf: 'flex-start',
            textAlign: 'left',
          }}
        >
          Built For Dreamers Who Dare To Launch Bold Ideas.
        </h1>

        {/* Hero image — 505px tall, full width */}
        <ImagePlaceholder
          width="100%"
          height="505px"
          src={HeroImageVideo}
          alt="Studione Studio showcase"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 2. TESTIMONIAL SECTION                                    */}
      {/*    Layout (top → bottom):                                  */}
      {/*      a) Heading (left-offset per spec: left 365px)         */}
      {/*      b) Draggable infinite card strip (full width)         */}
      {/*      c) ← → arrows centered below the strip               */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="studio-testimonial"
        style={{
          width: '100%',
          background: '#020202',
          position: 'relative',
          boxSizing: 'border-box',
          paddingTop: '12rem',
          paddingBottom: '8rem',
        }}
      >
        {/* ── Heading — left offset mirrors spec (left: 36.5rem at 1440px) ── */}
        <h2
          id="studio-testimonial-heading"
          style={{
            fontFamily: 'var(--font-britti)',
            fontWeight: 300,
            fontSize: 'clamp(2.8rem, 3.9vw, 5.6rem)',
            lineHeight: '100%',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            margin: 0,
            marginBottom: '8rem',
            paddingLeft: 'clamp(4rem, 25vw, 36.5rem)',
            paddingRight: '4rem',
          }}
        >
          Our Partners Value Our <br />Hard Work.
        </h2>

        {/*
          ── Clip container: hides overflow so partial cards peek in/out ──
          No left/right padding — cards run edge to edge, bridging viewport width.
        */}
        <div
          id="studio-testimonial-track"
          style={{
            overflow: 'hidden',
            width: '100%',
            marginBottom: '4.8rem',
          }}
        >
          {/*
            ── Draggable marquee strip ──────────────────────────────────
            • cursor: grab (grabbing is set inline via JS during drag)
            • user-select: none  — no text highlight during drag
            • touch-action: pan-y — allow vertical scroll on touch devices
              while we intercept horizontal drag via pointer events
            • will-change: transform — pins to GPU compositor layer
            • The rAF loop (above) drives x; GSAP.set writes the transform
          */}
          <div
            ref={marqueeRef}
            id="studio-testimonial-marquee"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1.2rem',
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'pan-y',
              willChange: 'transform',
              paddingLeft: '4rem',   /* card strip indent matches page gutter */
            }}
          >
            {dupedCards.map((card, i) => (
              <TestimonialCard key={`${card.id}-${i}`} card={card} />
            ))}
          </div>
        </div>

        {/* ── Arrow buttons — centered below the card strip ── */}
        <div
          id="studio-testimonial-arrows"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.8rem',
          }}
        >
          <button
            id="testimonial-prev"
            onClick={() => handleMarqueeNav('prev')}
            aria-label="Previous testimonials"
            style={{
              width: '4.8rem',
              height: '4.8rem',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            id="testimonial-next"
            onClick={() => handleMarqueeNav('next')}
            aria-label="Next testimonials"
            style={{
              width: '4.8rem',
              height: '4.8rem',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 3. ABOUT SECTION                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        id="studio-about"
        style={{
          width: '100%',
          background: '#020202',
          position: 'relative',
          boxSizing: 'border-box',
          minHeight: '112rem',
        }}
      >
        {/* ── Intro paragraph — left column ────────────────────── */}
        <p
          id="studio-about-intro"
          style={{
            position: 'absolute',
            width: 'clamp(26rem, 46vw, 69.2rem)',
            left: '3.6rem',
            top: '6.4rem',
            fontFamily: 'var(--font-britti)',
            fontWeight: 300,
            fontSize: 'clamp(1.8rem, 2.2vw, 3.2rem)',
            lineHeight: '125%',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          We work with founders and operators at pivotal moments — launch, growth, repositioning. When the stakes are high and the brand needs to perform, we build identities and experiences that are built to last.
        </p>

        {/* ── Right column — cycling image + description + link ── */}
        <div
          id="studio-about-right"
          style={{
            position: 'absolute',
            right: '4rem',
            top: '34.4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '2.25em',
            width: 'clamp(26rem, 54vw, 79.3rem)',
          }}
        >
          {/*
            Image wrapper: the cursor-following tag floats inside here.
            crosshair cursor hides the OS pointer so only the tag label shows.
          */}
          <div
            ref={aboutImageWrapRef}
            id="studio-about-image-wrap"
            style={{ position: 'relative', width: '100%', cursor: 'crosshair' }}
          >
            {/* Animated image — GSAP fades/translates this element */}
            <div ref={aboutImageRef}>
              <ImagePlaceholder
                width="100%"
                height="clamp(240px, 34vw, 463px)"
                src={currentProject.image}
                alt={`Project: ${currentProject.tag}`}
              />
            </div>

            {/*
              Cursor-following category tag.
              Opacity 0 → 1 on mouseenter, 1 → 0 on mouseleave.
              GSAP quickTo drives x / y at 300ms smoothing.
            */}
            <div
              ref={tagRef}
              id="studio-about-tag"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                padding: '0.625em 0.875em',
                gap: '0.625em',
                background: 'rgba(43,43,43,0.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                opacity: 0,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
                zIndex: 10,
                userSelect: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-britti)',
                  fontWeight: 400,
                  fontSize: '1.6rem',
                  lineHeight: '140%',
                  letterSpacing: '-0.02em',
                  color: '#C0C0C0',
                }}
              >
                {currentProject.tag}
              </span>
            </div>
          </div>

          {/*
            Description block — ref wraps BOTH the paragraph AND the link.
            Both elements fade-out and fade-in together as one unit.
          */}
          <div
            ref={aboutDescRef}
            id="studio-about-desc-wrap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '2.25em',
            }}
          >
            {/* Body text — Inter 18px */}
            <p
              style={{
                fontFamily: 'var(--font-britti)',
                fontWeight: 400,
                fontSize: '1.8rem',
                lineHeight: '140%',
                letterSpacing: '-0.02em',
                color: '#C0C0C0',
                margin: 0,
                maxWidth: '51.9rem',
              }}
            >
              {currentProject.desc}
            </p>

            {/*
              "See More Work" — inside aboutDescRef so it fades WITH the paragraph.
              Work.jsx is pending — link navigates there when it's built.
            */}
            <Link
              to="/work"
              id="studio-about-work-link"
              style={{
                fontFamily: 'var(--font-britti)',
                fontWeight: 400,
                fontSize: '2.4rem',
                lineHeight: '140%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.938em',
                textDecorationLine: 'underline',
                textDecoration: 'underline',
                textTransform: 'capitalize',
                color: '#FFFFFF',
              }}
            >
              See More Work
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 8h16v16M8 24L24 8"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 4. DESIGN PROCESS SECTION                                 */}
      {/* ══════════════════════════════════════════════════════════ */}
      <DesignProcessSection />

      {/* ══════════════════════════════════════════════════════════ */}
      {/* 5. SERVICES SECTION                                       */}
      {/* ══════════════════════════════════════════════════════════ */}
      <ServicesSection />

      {/* ── Responsive overrides ─────────────────────────────────── */}
      <style>{`
        /* Tablet */
        @media (max-width: 64em) {
          #studio-hero                  { padding-left: 2.8rem !important; padding-right: 2.8rem !important; }
          #studio-testimonial-heading   { padding-left: 2.8rem !important; }
          #studio-testimonial-marquee   { padding-left: 2.8rem !important; }
          #studio-about-intro           { left: 2.8rem !important; width: 42vw !important; }
          #studio-about-right           { right: 2.8rem !important; width: 50vw !important; }
          #studio-services-title        { left: 2.8rem !important; }
          #studio-services-card         { left: 2.8rem !important; width: 32rem !important; }
          #studio-services-list         { right: 2.8rem !important; }
        }

        /* ── Mobile (≤767px) ─────────────────────────────────────── */
        @media (max-width: 47.938em) {

          /* 1. HERO — padding: 9.5em 16px 40px, gap: 0.625em */
          #studio-hero {
            padding: 15.2rem 1.6rem 4rem !important;
            gap: 1rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          #studio-hero-tagline {
            font-size: 3.6rem !important;
            font-weight: 400 !important;
            line-height: 120% !important;
            margin-bottom: 4rem !important;
            max-width: 100% !important;
          }
          /* Hero image: 100% wide, 250px tall */
          #studio-hero img,
          #studio-hero > div:last-child {
            width: 100% !important;
            height: 25rem !important;
            margin-top: 0 !important;
          }

          /* 2. TESTIMONIAL */
          #studio-testimonial {
            padding-top: 0 !important;
            padding-bottom: 8rem !important;
          }
          #studio-testimonial-heading {
            padding: 9.6rem 1.6rem 4.8rem !important;
            font-size: 2.4rem !important;
            line-height: 120% !important;
            margin-bottom: 0 !important;
          }
          /* Track: scrollable on mobile (arrows use scrollBy fallback) */
          #studio-testimonial-track {
            overflow-x: auto !important;
            scroll-behavior: smooth !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          #studio-testimonial-track::-webkit-scrollbar { display: none !important; }
          #studio-testimonial-marquee { padding-left: 2rem !important; }
          /* Cards: 272×320 on mobile */
          #studio-testimonial-marquee article {
            width: 27.2rem !important;
            min-width: 27.2rem !important;
            height: 32rem !important;
            padding: 3.2rem !important;
            flex-shrink: 0 !important;
          }
          #studio-testimonial-arrows { margin-top: 4.8rem !important; }

          /* 3. ABOUT */
          #studio-about {
            position: static !important;
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 6.4rem 1.6rem 9.6rem !important;
            gap: 6.4rem !important;
          }
          #studio-about-intro {
            position: static !important;
            width: 100% !important;
            font-size: 2.2rem !important;
            line-height: 130% !important;
            font-weight: 300 !important;
          }
          #studio-about-right {
            position: static !important;
            width: 100% !important;
            gap: 4rem !important;
          }
          #studio-about-image-wrap { width: 100% !important; }
          #studio-about-image-wrap > div > div,
          #studio-about-image-wrap > div > img { height: 25rem !important; }
          #studio-about-tag { display: none !important; }
          #studio-about-desc-wrap { gap: 0.875em !important; }
          #studio-about-desc-wrap p {
            font-size: 1.6rem !important;
            color: #A6A6A6 !important;
            max-width: 100% !important;
          }
          #studio-about-work-link { font-size: 2rem !important; gap: 0.75em !important; }
          #studio-about-work-link svg { width: 3.2rem !important; height: 3.2rem !important; }
          
          /* Services: stack vertically */
          #studio-services {
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            padding-bottom: 6.4rem !important;
            gap: 4.8rem !important;
          }
          
          #studio-services > p {
            padding: 6.4rem 1.6rem 4rem !important;
            font-size: 2.4rem !important;
          }

          #studio-services-title { position: static !important; width: 100% !important; }
          #studio-services-card  {
            position: static !important;
            width: 100% !important;
          }
          #studio-services-card > div:first-child { width: 100% !important; }
          #studio-services-list  {
            position: static !important;
            width: 100% !important;
            align-items: flex-start !important;
          }


          /* Each card: full-bleed, 380px, static (no absolute positioning) */
          .studio-svc-card {
            position: static !important;
            left: 0 !important;
            width: 100% !important;
            height: 38rem !important;
            transform: none !important;
          }
          /* Card inner layout row: shift from right-column to left-edge */
          .studio-svc-inner {
            position: absolute !important;
            left: 1.6rem !important;
            top: 2.4rem !important;
            width: calc(100% - 4rem) !important;
            gap: 1.4rem !important;
          }
          .studio-svc-num  { font-size: 1.4rem !important; }
          .studio-svc-right { width: 100% !important; gap: 1em !important; }
          .studio-svc-title { font-size: 2rem !important; line-height: 100% !important; }
          .studio-svc-img   { height: 22rem !important; border-radius: 0 !important; }
          .studio-svc-desc  { font-size: 1.4rem !important; color: #262626 !important; }
        }
      `}</style>
    </div>
  )
}