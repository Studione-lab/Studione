import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────────
// TESTIMONIAL DATA — all cards equal 320×320px
// ─────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 't1',
    text: '"Studione transformed our brand completely. The work is clean, modern, and immediately resonates. Highly recommended!"',
    name: 'Alex Carter',
    role: 'Product Designer, Base',
    verified: false,
    initials: 'AC',
    avatarBg: '#3A3A5C',
  },
  {
    id: 't2',
    text: '"Studione saved us weeks of back-and-forth. They understood our vision instantly and executed with precision."',
    name: 'Ethan Hunt',
    role: 'Product Designer, Base',
    verified: true,
    initials: 'EH',
    avatarBg: '#5C3A4A',
  },
  {
    id: 't3',
    text: '"I\'ve worked with dozens of studios — Studione is by far the most thoughtful and versatile one yet."',
    name: 'Jordan Kim',
    role: 'Frontend Engineer, Atlas',
    verified: false,
    initials: 'JK',
    avatarBg: '#3A5C4A',
  },
  {
    id: 't4',
    text: '"The design quality is top-tier. It gave our MVP a polished, professional feel right from day one. Incredible team."',
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
    desc: 'We partner with ambitious teams to shape meaningful brands and digital experiences.',
    // image: '/images/services-discovery.png',
    image: '/src/assets/project-1.png'
  },
  {
    id: 'svc-2',
    label: 'Research & Positioning',
    desc: 'Deep market analysis and competitive research to carve out a distinct, ownable position for your brand.',
    // image: '/images/services-research.png',
  },
  {
    id: 'svc-3',
    label: 'Strategy & Briefing',
    desc: 'Translating insights into clear creative briefs that align your team and guide every design decision.',
    // image: '/images/services-strategy.png',
  },
  {
    id: 'svc-4',
    label: 'Visual Direction',
    desc: 'Defining the aesthetic language — typography, colour, motion — that makes your brand instantly recognisable.',
    // image: '/images/services-visual.png',
  },
  {
    id: 'svc-5',
    label: 'Concept Development',
    desc: 'Generating bold creative concepts that push past the expected and bring your vision to life.',
    // image: '/images/services-concept.png',
  },
  {
    id: 'svc-6',
    label: 'Refinement',
    desc: 'Iterative craft — pixel-perfect execution from first draft to production-ready asset.',
    // image: '/images/services-refinement.png',
  },
  {
    id: 'svc-7',
    label: 'Production',
    desc: 'Final delivery across every format and platform, ready to launch with confidence.',
    // image: '/images/services-production.png',
  },
]

// ─────────────────────────────────────────────────────────────────
// ABOUT PROJECTS — auto-cycling content
// ─────────────────────────────────────────────────────────────────
const ABOUT_PROJECTS = [
  {
    id: 'ap-1',
    tag: 'Brand Identity',
    // image: '/images/studio-about-1.png',
    desc: 'Lorem ipsum dolor sit amet consectetur. Mollis metus eget quam hendrerit. Nec malesuada massa in porta proin quisque facilisi. Risus morbi dolor libero velit scelerisque enim.',
  },
  {
    id: 'ap-2',
    tag: 'Web Design',
    // image: '/images/studio-about-2.png',
    desc: 'We craft digital experiences that convert visitors into believers. Our web design process balances aesthetics with strategy for measurable, lasting impact across every screen.',
  },
  {
    id: 'ap-3',
    tag: 'Design System',
    // image: '/images/studio-about-3.png',
    desc: 'Building scalable design foundations that empower your entire product team. Consistent, reusable, and built for growth and long-term collaboration between design and engineering.',
  },
]

// ─────────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────────

/** Placeholder tile identical to Home.jsx pattern */
function ImagePlaceholder({ width, height, src, alt = '', style = {} }) {
  if (src) {
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
        padding: '32px',
        gap: '8px',
        width: '320px',
        minWidth: '320px',
        height: '320px',
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
          fontSize: '15px',
          lineHeight: '150%',
          letterSpacing: '-0.2px',
          color: '#5E5E5E',
          margin: 0,
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {card.text}
      </p>

      {/* Profile row */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px', width: '100%' }}>
        {/* Avatar */}
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '100px',
            background: card.avatarBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '11px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.75)',
            fontFamily: "'Inter', system-ui",
          }}
        >
          {card.initials}
        </div>

        {/* Name + role */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span
              style={{
                fontFamily: "'Inter', system-ui",
                fontWeight: 500,
                fontSize: '15px',
                lineHeight: '150%',
                letterSpacing: '-0.2px',
                color: '#000000',
              }}
            >
              {card.name}
            </span>
            {card.verified && (
              <span
                title="Verified"
                style={{
                  width: '14px', height: '14px',
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
              fontSize: '13px',
              lineHeight: '150%',
              letterSpacing: '-0.1px',
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
  const hoverRef    = useRef(null)     // onMouseEnter: pause cycle + show card
  const hoverEndRef = useRef(null)     // onMouseLeave: restore card + resume cycle
  const intervalRef = useRef(null)
  const isAnimRef   = useRef(false)
  const activeRef   = useRef(0)        // service index currently at slot 0

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

      // ── HOVER: pause cycle + show that item's card (no list movement) ─
      function onHoverItem(svcIdx) {
        clearInterval(intervalRef.current)   // pause auto-cycle
        setColors(svcIdx)                    // highlight hovered item
        fadeCard(svcIdx)                     // cross-fade card content
      }

      // ── HOVER END: restore to true active + resume cycle ────────────
      function onHoverEnd() {
        const activeSvcIdx = slotOrder[0]    // actual item at slot 0
        setColors(activeSvcIdx)
        fadeCard(activeSvcIdx)
        restartCycle()
      }

      hoverRef.current    = onHoverItem
      hoverEndRef.current = onHoverEnd

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

  const svc = SERVICES[activeIdx]

  return (
    <section
      id="studio-design-process"
      style={{
        width: '100%',
        background: '#020202',
        position: 'relative',
        boxSizing: 'border-box',
        minHeight: '949px',
        overflow: 'hidden',
      }}
    >
      {/* ── Section title ─────────────────────────────────────── */}
      <p
        id="studio-services-title"
        style={{
          position: 'absolute',
          left: '40px',
          top: '96px',
          width: 'clamp(220px, 55vw, 793px)',
          fontFamily: 'var(--font-britti)',
          fontWeight: 400,
          fontSize: '32px',
          lineHeight: '120%',
          color: '#FFFFFF',
          margin: 0,
        }}
      >
        <span style={{ color: '#FFFFFF' }}>
          From concept to craft, our dedicated team transforms emotion into expression,{' '}
        </span>
        <span style={{ color: '#6B6B6B' }}>
          distilling bold ideas into standout strategies that elevate brands to new heights.
        </span>
      </p>

      {/* ── Card — left column, static ───────────────────────── */}
      <div
        id="studio-services-card"
        style={{
          position: 'absolute',
          left: '40px',
          top: '328px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '20px',
          width: '387px',
        }}
      >
        <div
          ref={cardImgRef}
          style={{ width: '387px', height: '260px', overflow: 'hidden', flexShrink: 0 }}
        >
          {svc.image ? (
            <img
              src={svc.image}
              alt={svc.label}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
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
            alignItems: 'flex-start', gap: '16px',
            width: '100%', maxWidth: '387px',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 400, fontSize: '18px',
              lineHeight: '140%', letterSpacing: '-0.02em',
              color: '#C0C0C0', margin: 0,
            }}
          >
            {svc.desc}
          </p>
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
          right: '40px',
          top: '341px',
          width: 'clamp(280px, 43vw, 623px)',
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
              onMouseEnter={() => hoverRef.current?.(i)}
              onMouseLeave={() => hoverEndRef.current?.()}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '64px',
                fontFamily: 'var(--font-britti)',
                fontWeight: 300,
                fontSize: 'clamp(28px, 4.4vw, 64px)',
                lineHeight: '64px',       /* exact item height — no extra gap from line-height */
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
    desc: 'Building the visual language that defines your brand — typography, colour, and form — across every touchpoint.',
    bg: '#EAEEED',
  },
  {
    id: 'sc-2',
    num: '02',
    title: 'Brand narratives',
    desc: 'Crafting the stories that give your brand purpose, voice, and enduring resonance with the audiences that matter.',
    bg: '#5EDDE6',
  },
  {
    id: 'sc-3',
    num: '03',
    title: 'Digital products',
    desc: 'Designing functional, beautiful digital experiences that solve real problems and feel effortless to use at any scale.',
    bg: '#EAEEED',
  },
  {
    id: 'sc-4',
    num: '04',
    title: 'Websites',
    desc: 'Creating websites that communicate brand clarity, inspire confidence, and drive meaningful user engagement.',
    bg: '#FA4A47',
  },
  {
    id: 'sc-5',
    num: '05',
    title: 'Prototypes',
    desc: 'Developing interactive models to test and validate how the brand behaves in real use before it ever ships.',
    bg: '#F7D066',
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
  const sectionRef   = useRef(null)
  const cardsWrapRef = useRef(null)
  const cardRefs     = useRef([])
  const tlRef        = useRef(null)

  const CARD_H  = 556    // px — full card height
  const TAB_H   = 69     // px — visible strip per collapsed card
  const TOP_0   = 189    // px — first card top offset within section
  const N       = SERVICES_CARDS.length   // 5

  // ── Initial setup & Scroll-driven reveal ────────────────────────
  useLayoutEffect(() => {
    const section = sectionRef.current
    const cardsWrap = cardsWrapRef.current
    if (!section || !cardsWrap || cardRefs.current.some(c => !c)) return

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
          start: 'top 80px',
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
        trigger: section,
        start: 'top 10%',
        end:   'bottom 10%',
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
    <section
      ref={sectionRef}
      id="studio-services"
      style={{
        width: '100%',
        background: '#020202',
        position: 'relative',
        boxSizing: 'border-box',
        paddingBottom: '200px', // extra space for scroll
      }}
    >
      {/* ── "What we offer" title — natural flow, scrolls away ───── */}
      <p
        style={{
          padding: '128px 0 100px 40px',
          fontFamily: 'var(--font-britti)',
          fontWeight: 400,
          fontSize: '32px',
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
        style={{
          position: 'relative',
          width: '100%',
          height: '900px', // height of the full-open stack
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
              left: '40px',
              top: i * TAB_H,
              width: 'calc(100% - 80px)',
              height: CARD_H,
              background: card.bg,
              zIndex: i + 1,
              willChange: 'transform',
              cursor: 'default',
              overflow: 'hidden',
            }}
          >
          {/* Content row: pinned at left:285px top:36px */}
          <div
            style={{
              position: 'absolute',
              left: '325px',
              top: '36px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: '51px',
              width: '581px',
            }}
          >
            {/* Number */}
            <span
              style={{
                fontFamily: 'var(--font-britti)',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '40px',
                color: '#1B1B1B',
                flexShrink: 0,
                width: '27px',
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
                gap: '48px',
                width: '508px',
              }}
            >
              {/* Service title */}
              <h3
                style={{
                  fontFamily: 'var(--font-britti)',
                  fontWeight: 400,
                  fontSize: '55.3px',
                  lineHeight: '56px',
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
                  gap: '32px',
                  width: '100%',
                }}
              >
                {/* Image placeholder */}
                <div
                  style={{
                    width: '100%',
                    height: '248px',
                    background: '#D0D0D0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <svg width="44" height="44" viewBox="0 0 40 40" fill="none" opacity="0.35">
                    <rect x="4" y="4" width="32" height="32" rx="4" stroke="#666" strokeWidth="1.5" />
                    <circle cx="14" cy="14" r="3" stroke="#666" strokeWidth="1.5" />
                    <path d="M4 28l9-9 6 6 4-4 13 13" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif",
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '140%',
                    letterSpacing: '1px',
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
    </section>
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

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
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
          padding: '214px 40px 0px',
          gap: '120px',   /* ← 195px → 120px per spec */
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
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            lineHeight: '100%',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            margin: 0,
            width: '100%',
          }}
        >
          Built For Dreamers Who Dare<br />To Launch Bold Ideas.
        </h1>

        {/* Hero image — 505px tall, full width */}
        <ImagePlaceholder
          width="100%"
          height="505px"
          src={undefined /* '/images/studio-hero.png' */}
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
          paddingTop: '120px',
          paddingBottom: '80px',
        }}
      >
        {/* ── Heading — left offset mirrors spec (left: 365px at 1440px) ── */}
        <h2
          id="studio-testimonial-heading"
          style={{
            fontFamily: 'var(--font-britti)',
            fontWeight: 300,
            fontSize: 'clamp(28px, 3.9vw, 56px)',
            lineHeight: '100%',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            margin: 0,
            marginBottom: '80px',
            paddingLeft: 'clamp(40px, 25vw, 365px)',
            paddingRight: '40px',
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
            marginBottom: '48px',
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
              gap: '12px',
              cursor: 'grab',
              userSelect: 'none',
              touchAction: 'pan-y',
              willChange: 'transform',
              paddingLeft: '40px',   /* card strip indent matches page gutter */
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
            gap: '8px',
          }}
        >
          <button
            id="testimonial-prev"
            onClick={() => handleMarqueeNav('prev')}
            aria-label="Previous testimonials"
            style={{
              width: '48px',
              height: '48px',
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
              width: '48px',
              height: '48px',
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
          minHeight: '1120px',
        }}
      >
        {/* ── Intro paragraph — left column ────────────────────── */}
        <p
          id="studio-about-intro"
          style={{
            position: 'absolute',
            width: 'clamp(260px, 46vw, 692px)',
            left: '36px',
            top: '64px',
            fontFamily: 'var(--font-britti)',
            fontWeight: 300,
            fontSize: 'clamp(18px, 2.2vw, 32px)',
            lineHeight: '125%',
            textTransform: 'capitalize',
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          We Partner With Seed-Stage Founders Looking To Shake Up The Market.
          Whether It&apos;s Developing Your Brand Or Launching Your MVP, We Offer
          The Insight And Drive Necessary To Elevate Your Vision.
        </p>

        {/* ── Right column — cycling image + description + link ── */}
        <div
          id="studio-about-right"
          style={{
            position: 'absolute',
            right: '40px',
            top: '344px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '36px',
            width: 'clamp(260px, 54vw, 793px)',
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
                padding: '10px 14px',
                gap: '10px',
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
                  fontFamily: "'Inter', system-ui",
                  fontWeight: 400,
                  fontSize: '16px',
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
              gap: '36px',
            }}
          >
            {/* Body text — Inter 18px */}
            <p
              style={{
                fontFamily: "'Inter', system-ui",
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '140%',
                letterSpacing: '-0.02em',
                color: '#C0C0C0',
                margin: 0,
                maxWidth: '519px',
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
                fontSize: '24px',
                lineHeight: '140%',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
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
        @media (max-width: 1024px) {
          #studio-hero                  { padding-left: 28px !important; padding-right: 28px !important; }
          #studio-testimonial-heading   { padding-left: 28px !important; }
          #studio-testimonial-marquee   { padding-left: 28px !important; }
          #studio-about-intro           { left: 28px !important; width: 42vw !important; }
          #studio-about-right           { right: 28px !important; width: 50vw !important; }
          #studio-services-title        { left: 28px !important; }
          #studio-services-card         { left: 28px !important; width: 320px !important; }
          #studio-services-list         { right: 28px !important; }
        }

        /* Mobile */
        @media (max-width: 768px) {
          #studio-hero {
            padding: 110px 20px 0px !important;
            gap: 60px !important;
          }
          #studio-testimonial-heading {
            padding-left: 20px !important;
            margin-bottom: 48px !important;
          }
          #studio-testimonial-marquee { padding-left: 20px !important; }

          /* About: revert to normal document flow */
          #studio-about {
            position: static !important;
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            padding: 64px 20px !important;
            gap: 64px !important;
          }
          #studio-about-intro  { position: static !important; width: 100% !important; }
          #studio-about-right  { position: static !important; width: 100% !important; }

          /* Services: stack vertically */
          #studio-services {
            min-height: auto !important;
            display: flex !important;
            flex-direction: column !important;
            padding: 64px 20px !important;
            gap: 48px !important;
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
        }
      `}</style>
    </div>
  )
}
