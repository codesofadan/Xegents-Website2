"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { useDismiss } from "@/hooks/use-dismiss"
import Image from "next/image"
import { gsap, ScrollTrigger } from "@/lib/gsap"


/* ────────────────────────────────────────────────────────────────────────────
   THE GROUP — brand rain.

   THE MOTION IS THE CONTENT. The marks are the weather. Point at any one of
   them and the whole shower freezes — not just that disc — and its detail
   opens beside it. Move away and everything resumes from exactly where it
   stopped.

   COLUMNS ARE FIXED, HEIGHT IS NOT. Each brand owns one column and never
   leaves it, so the six are always readable as six and never trade places.
   Within its column a brand is free to travel the full height of the stage,
   which is what makes this rain rather than a grid that jiggles.

   TWO COPIES PER COLUMN, AND THAT IS THE TRICK. Real rain has to wrap: a disc
   that falls out of the bottom must come back in at the top, and while it is
   doing that its brand is missing from the stage. Running two copies of each
   mark half a cycle apart means one is always mid-column while the other is at
   the seam — so all six brands are legible at every instant, and none of them
   has to stop moving to achieve it. Twelve discs, six brands.

   DIRECTION IS MIXED. Three columns fall, three rise. Everything travelling
   one way reads as a machine; alternating it reads as weather. The choice is
   fixed per column rather than random, so it is stable across a reload.

   PARALLAX. Smaller discs are further away, so they also move slower. Speed
   and size move together — untying them is what makes fake depth look fake.

   WHY animation-play-state AND NOT JS. Pausing a CSS animation freezes it at
   its current computed transform and resumes from that same point; there is no
   snap and no bookkeeping. A rAF loop would have to track twelve positions
   itself and would jitter the moment the main thread got busy. One CSS
   property does the whole thing, on the compositor.

   WHY DISCS. Circles, because a circle reads the same however it is moving —
   a rounded rectangle adrift looks like a card that lost its layout. Circles
   are also generous to wide logos: WonHost is 4.4:1 and still clears the curve
   comfortably, because the chord across the vertical centre is the full
   diameter.

   WHY SIX, AND WHICH SIX. Eight brands were in scope. Two of them — Closet
   Control (fashion) and Oud Amber (fragrance) — are consumer retail rather
   than technology, and they pulled this section away from the point. The six
   that remain are the technology businesses.

   THE PARENT IS NOT NAMED HERE, ON PURPOSE. This section is Xegents' own
   client proof, and the ownership story is told once, properly, in the section
   directly above it. Repeating it here would blur a client claim into a
   corporate-structure claim, and the two do different jobs. Two of the six
   still link to barionsystems.com because that is genuinely where those
   product pages live — an href, not a mention.

   THE MARKS. Every logo is a third-party asset drawn for white paper. Forced
   to monochrome, three fail outright — SecureResi, Barioo and WonHost all use
   knockout type, so inverting them fills the counters and leaves a white blob.
   They get a lit disc instead, in full colour.

   IT THINS RATHER THAN SHRINKS. Six columns across a 358px phone would put
   the lane centres 57px apart while the discs are 80-96px wide — every
   neighbour overlapping by half a disc. Folding into three columns × two
   half-height zones was the first answer and it was wrong: a disc overshoots
   its lane by its own diameter plus 30px, which is half a zone, so the upper
   row visibly slid over the lower one.

   The fix is fewer objects, not cleverer lanes. Below 1024px HALF THE DISCS
   COME OFF THE STAGE — one copy per brand instead of two, six instead of
   twelve — and the stage goes back to a single full-height zone. Brand i takes
   column i % 3, so each column carries exactly two brands. They share a
   direction and a duration and sit half a cycle apart, which holds them a
   constant ~300px away from each other against a disc that is at most 86px
   wide. Overlap is not tuned out; it is arithmetically unavailable.

   Twelve objects in three columns is a traffic jam. Six is weather.

   It is still one DOM tree with no JS width check — the second copy is hidden
   in CSS and the compact geometry rides on custom properties every item
   already carries.

   TOUCH. Hover is not an input on a phone, and a moving disc that navigates
   the instant a finger lands on it is a trap. On a coarse pointer the first
   tap opens the card and freezes the shower; the card's own "Visit site" link
   is the only thing that leaves the site.

   REDUCED MOTION. Twelve wrapping discs cannot be made still and still make
   sense — there is nowhere for the duplicates to sit — so anyone who asks for
   reduced motion gets the still grid instead, at any width.
──────────────────────────────────────────────────────────────────────────── */

type Brand = {
  id: string
  name: string
  logo: string
  /** intrinsic px, so next/image never guesses and never upscales */
  w: number
  h: number
  sector: string
  line: string
  url: string
}

const BRANDS: Brand[] = [
  {
    id: "mssalepoint",
    name: "MSSalePoint",
    logo: "/logos/mssalepoint.png",
    w: 80, h: 62,
    sector: "POS & Accounting",
    line: "Point of sale and full accounting in one system. Multi-branch, cloud-hosted, offline-tolerant.",
    url: "https://mssalepoint.com/",
  },
  {
    id: "barioo",
    name: "Barioo",
    logo: "/logos/barioo.png",
    w: 94, h: 94,
    sector: "ERP-Integrated POS",
    line: "Point of sale built on top of an ERP, with inventory, access and statistics in one place.",
    url: "https://barioo.com/",
  },
  {
    id: "secureresi",
    name: "SecureResi",
    logo: "/logos/secureresi.png",
    w: 107, h: 41,
    sector: "Security Management",
    line: "Visitor, guard and building security management across residential and commercial sites.",
    url: "https://secureresi.com/",
  },
  {
    id: "network-world",
    name: "Network World",
    logo: "/logos/network-world.png",
    w: 70, h: 58,
    sector: "Networking & Infrastructure",
    line: "Enterprise networking, CCTV, security and round-the-clock server management.",
    url: "https://barionsystems.com/network.html",
  },
  {
    id: "wonhost",
    name: "WonHost",
    logo: "/logos/wonhost.png",
    w: 460, h: 104,
    sector: "Hosting & Domains",
    line: "Domains, shared hosting, VPS and dedicated servers, run across its own fleet of machines.",
    url: "https://wonhost.com/my/",
  },
  {
    id: "pakmalls",
    name: "Pak Malls",
    logo: "/logos/pakmalls.png",
    w: 99, h: 30,
    sector: "Cross-Border E-Commerce",
    line: "The e-commerce bridge built between the Pakistani and Malaysian markets.",
    url: "https://barionsystems.com/pakmall.html",
  },
]

/** One column per brand, in BRANDS order. `x` is the column centre as a % of
 *  stage width, `size` multiplies the base diameter, and `dir` is fixed so the
 *  mix of risers and fallers is identical on every load. Note that size and
 *  dur move together — the small discs are the slow ones. */
const COLUMNS = [
  { x: 8,  size: 1.00, dur: 8.2,  dir: "down" },
  { x: 25, size: 0.84, dur: 10.8, dir: "up" },
  { x: 41, size: 0.94, dur: 9.0,  dir: "up" },
  { x: 58, size: 0.88, dur: 10.1, dir: "down" },
  { x: 75, size: 1.00, dur: 8.6,  dir: "up" },
  { x: 91, size: 0.90, dur: 9.7,  dir: "down" },
] as const

/** Three lanes for a narrow screen. Brand i takes column i % 3, so each lane
 *  carries exactly two brands: 0 and 3, 1 and 4, 2 and 5.
 *
 *  DIRECTION AND DURATION ARE PER COLUMN, NOT PER BRAND, and that is
 *  load-bearing rather than tidy. The two brands in a lane sit half a cycle
 *  apart. Half a cycle only means a constant separation if they are travelling
 *  the same way at the same speed — give one of them the opposite direction
 *  and they close on each other and meet head-on at the quarter mark, which is
 *  a collision in the middle of the stage rather than the drift it looks like
 *  on paper.
 *
 *  Same direction, same duration, half a cycle apart ⇒ they are always ~300px
 *  apart on a 460px stage, against a disc at most 86px across. */
const COLUMNS_SM = [
  { x: 18, dur: 9.4,  dir: "down" },
  { x: 50, dur: 10.6, dir: "up" },
  { x: 82, dur: 8.8,  dir: "down" },
] as const

/** Diameter multiplier per brand. Free to vary inside a lane — the pair's
 *  separation only dips from 303px to 294px across the whole size range, which
 *  is still three and a half discs of clearance. */
const SIZES_SM = [1.00, 0.92, 0.96, 0.94, 1.00, 0.90] as const

/* Two copies per column, half a cycle apart, plus a per-column offset so the
   six columns are not marching in step. All arithmetic, no Math.random — this
   renders on the server first and a random value would hydrate mismatched.

   Below 1024px copy 1 is hidden and the half-cycle offset comes from the BRAND
   index instead: brands 0-2 lead, brands 3-5 follow half a cycle behind in the
   same lane. The (i % 3) term staggers the three lanes against each other and,
   because it is identical for both brands in a lane, leaves their relative
   offset untouched. */
const ITEMS = BRANDS.flatMap((brand, i) => {
  const c = COLUMNS[i]
  const sm = COLUMNS_SM[i % 3]
  return [0, 1].map((copy) => ({
    key: `${brand.id}-${copy}`,
    brand,
    copy,
    x: c.x,
    size: c.size,
    dur: c.dur,
    dir: c.dir,
    delay: -(copy * 0.5 * c.dur + i * 1.3),
    // compact layout — every item carries BOTH sets and CSS picks one. A JS
    // width check here would hydrate mismatched and flash on load.
    xSm: sm.x,
    sizeSm: SIZES_SM[i],
    durSm: sm.dur,
    dirSm: sm.dir,
    delaySm: -(Math.floor(i / 3) * 0.5 * sm.dur + (i % 3) * 1.4),
  }))
})

/** Detail card footprint. Needed before paint, to pick the side it opens on. */
const CARD_W = 268
const CARD_H = 168

type Active =
  | { key: string; brandId: string; dock: false; left: number; top: number }
  | { key: string; brandId: string; dock: true; atBottom: boolean }
  | null

export function GroupCompanies() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Active>(null)

  const activeBrand = BRANDS.find((b) => b.id === active?.brandId) ?? null
  const cardRef = useRef<HTMLDivElement>(null)
  /* Remembered from pointerdown, because `click` does not carry pointerType. */
  const pointerType = useRef<string>("mouse")

  /* Twelve looping animations. None of them run off-screen. */
  const visible = useInView(sectionRef)

  /* Measure where the disc is, then open the card on whichever side has room.
     The rect is read in the same tick the freeze is requested, so it is the
     position the disc is about to hold. */
  const open = useCallback((key: string, brandId: string, itemEl: HTMLElement) => {
    const stage = stageRef.current
    if (!stage) return
    const s = stage.getBoundingClientRect()

    /* Which layout is CSS using? Read it from a custom property rather than
       re-testing the width in JS. One source of truth means the card can never
       position itself for a layout the stylesheet is not actually rendering. */
    const dock = getComputedStyle(stage).getPropertyValue("--rf-card-mode").trim() === "dock"

    const d = itemEl.getBoundingClientRect()
    const cy = d.top + d.height / 2 - s.top

    if (dock) {
      /* 268px beside a disc needs 294px of clearance, which a 358px stage
         never has — the old maths flipped left every time and landed at a
         negative offset, i.e. off-screen. Docked full-width to the half of the
         stage the disc is NOT in, so the card never covers its own subject.
         Anchored to an edge, so nothing has to be measured. */
      setActive({ key, brandId, dock: true, atBottom: cy < s.height / 2 })
      return
    }

    const cx = d.left + d.width / 2 - s.left
    const r = d.width / 2
    const openRight = s.width - (cx + r) >= CARD_W + 26
    const left = openRight ? cx + r + 20 : cx - r - 20 - CARD_W
    const top = Math.max(8, Math.min(s.height - CARD_H - 8, cy - CARD_H / 2))

    setActive({ key, brandId, dock: false, left, top })
  }, [])

  const close = useCallback(() => setActive(null), [])

  /* Touch has no pointerleave, so without this a tapped disc would hold the
     whole shower frozen for the rest of the visit. */
  useDismiss(active !== null, close, [stageRef, cardRef])

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      gsap.fromTo(".gc-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } })

      if (reduce) {
        gsap.set(".gc-reveal", { opacity: 1 })
        return
      }

      /* Opacity only. The discs own their own transform, and a transform on an
         ancestor would fight the rain. */
      gsap.fromTo(".gc-reveal",
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".gc-reveal", start: "top 88%", toggleActions: "play none none none" } })
    }, sectionRef)

    /* ScrollTrigger measures start positions at creation. A hash jump to
       /#group — one of the four routes the 404 page offers — can land past
       that start without a recompute, leaving the stage stuck at opacity 0. */
    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(refresh)
    window.addEventListener("load", refresh)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("load", refresh)
      try { ctx.revert() } catch (_) {}
    }
  }, [])

  return (
    <section
      id="group"
      ref={sectionRef}
      data-anim={visible ? "on" : "off"}
      className="scroll-mt-28 py-24 sm:py-32 px-4 sm:px-6 border-t border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <p className="gc-header text-xs font-medium text-accent uppercase tracking-widest mb-3">
            Trusted By
          </p>
          <h2 className="gc-header text-3xl sm:text-5xl font-black tracking-tighter leading-tight text-balance">
            They have trusted us. <span className="gradient-text">Would you?</span>
          </h2>
          <p className="gc-header mt-4 text-sm sm:text-base text-foreground/55 leading-relaxed">
            Six technology businesses running across nine countries: POS and ERP, security,
            networking, hosting and cross-border commerce.
          </p>
        </div>

        {/* ── The rain — every width, wherever motion is allowed ────────── */}
        <div
          ref={stageRef}
          className="gc-reveal rf-stage relative"
          data-hold={active ? "true" : "false"}
        >
          <div className="rf-rain">
            {ITEMS.map((it) => (
              <div
                key={it.key}
                className="rf-item"
                data-dir={it.dir}
                data-dir-sm={it.dirSm}
                data-copy={it.copy}
                data-active={active?.key === it.key ? "true" : "false"}
                style={{
                  ["--x" as string]: `${it.x}%`,
                  ["--x-sm" as string]: `${it.xSm}%`,
                  ["--disc" as string]: `calc(var(--disc-base) * ${it.size})`,
                  ["--disc-sm" as string]: `calc(var(--disc-base) * ${it.sizeSm})`,
                  ["--dur" as string]: `${it.dur}s`,
                  ["--dur-sm" as string]: `${it.durSm}s`,
                  ["--delay" as string]: `${it.delay}s`,
                  ["--delay-sm" as string]: `${it.delaySm}s`,
                } as React.CSSProperties}
                onPointerEnter={(e) => { if (e.pointerType !== "touch") open(it.key, it.brand.id, e.currentTarget) }}
                onPointerLeave={(e) => { if (e.pointerType !== "touch") close() }}
              >
                <a
                  href={it.brand.url}
                  target="_blank"
                  rel="noopener noreferrer external"
                  aria-label={`${it.brand.name} — ${it.brand.sector}. Opens in a new tab.`}
                  className="rf-disc focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
                  onFocus={(e) => open(it.key, it.brand.id, e.currentTarget.parentElement as HTMLElement)}
                  onPointerDown={(e) => { pointerType.current = e.pointerType }}
                  /* On a coarse pointer the first tap must OPEN, not navigate —
                     otherwise a finger that lands on a moving disc is thrown
                     straight off the site with no chance to read anything. The
                     card's own "Visit site" link is the way out. Semantically
                     this is a compromise: an <a href> that does not navigate.
                     The clean shape is a <button aria-expanded> on the disc with
                     the link inside the card, but that changes desktop
                     behaviour, so it is raised separately rather than smuggled
                     in here. */
                  onClick={(e) => {
                    if (pointerType.current === "touch") {
                      e.preventDefault()
                      open(it.key, it.brand.id, e.currentTarget.parentElement as HTMLElement)
                    }
                  }}
                >
                  {/* alt is empty on purpose — the anchor's aria-label already
                      names this link, and a filled alt would announce twice */}
                  <Image
                    src={it.brand.logo}
                    alt=""
                    width={it.brand.w}
                    height={it.brand.h}
                    sizes="(max-width: 1023px) 260px, 200px"
                    className="rf-mark"
                  />
                </a>
              </div>
            ))}
          </div>

          {/* Detail — opens beside the frozen disc. Deliberately inert: drifting
              the pointer onto it would otherwise count as leaving the disc and
              close the very thing being read. */}
          {activeBrand && active && (
            <div
              ref={cardRef}
              className="rf-card glass-panel"
              data-dock={active.dock ? "true" : "false"}
              data-at-bottom={active.dock && active.atBottom ? "true" : "false"}
              style={
                active.dock
                  ? undefined
                  : { left: active.left, top: active.top, width: CARD_W }
              }
            >
              <p className="rf-card-eyebrow">{activeBrand.sector}</p>
              <p className="rf-card-name">{activeBrand.name}</p>
              <p className="rf-card-line">{activeBrand.line}</p>

              {/* On a fine pointer the card is inert scenery and the disc
                  itself is the link. On touch the disc no longer navigates, so
                  this has to be the real way out — and it needs a 44px target
                  and a close control, because "tap outside" is undiscoverable
                  when the whole stage is covered in tap targets. */}
              <a
                href={activeBrand.url}
                target="_blank"
                rel="noopener noreferrer external"
                className="rf-card-cta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Visit site <span aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                onClick={close}
                aria-label={`Close ${activeBrand.name} details`}
                className="rf-card-close focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* ── Still grid — the reduced-motion fallback, at any width ─────── */}
        <div className="gc-reveal rf-grid hidden grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
          {BRANDS.map((b) => (
            <a
              key={b.id}
              href={b.url}
              target="_blank"
              rel="noopener noreferrer external"
              aria-label={`${b.name} — ${b.sector}. Opens in a new tab.`}
              className="flex flex-col items-center text-center"
            >
              <span className="rf-cell-disc">
                <Image src={b.logo} alt="" width={b.w} height={b.h} sizes="140px" className="rf-cell-mark" />
              </span>
              <span className="mt-3 block text-[10px] font-bold uppercase tracking-widest text-accent">
                {b.sector}
              </span>
              <span className="mt-1 block text-sm font-black tracking-tight text-foreground">
                {b.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        /* Narrower than the container on purpose: twelve objects spread across
           the full 1280px read as scattered litter rather than weather. */
        .rf-stage {
          --disc-base: 96px;
          --stage-h: 440px;
          --rf-card-mode: beside;     /* read back by open() — see the comment there */
          height: var(--stage-h);
          max-width: 1000px;
          margin-inline: auto;
        }
        @media (min-width: 1280px) {
          .rf-stage { --disc-base: 106px; --stage-h: 470px; }
        }

        /* Soft top and bottom edges. Every disc has to re-enter somewhere, and
           a hard clip at the seam is the tell that gives the loop away. */
        .rf-rain {
          position: absolute;
          inset: 0;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0, #000 14%, #000 86%, transparent 100%);
        }

        .rf-item {
          position: absolute;
          top: 0;
          left: var(--x);
          width: var(--disc);
          height: var(--disc);
          margin-left: calc(var(--disc) / -2);
          animation-duration: var(--dur);
          animation-delay: var(--delay);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .rf-item[data-dir="down"] { animation-name: rf-down; }
        .rf-item[data-dir="up"]   { animation-name: rf-up; }

        /* One full-height fall, at every width. A disc enters a disc-and-30px
           above the stage and leaves 30px below it, so both the entry and the
           exit happen behind the mask. The compact layout changes --stage-h,
           never these — the keyframes are the same ones at every width. */
        @keyframes rf-down {
          from { transform: translate3d(0, calc(var(--disc) * -1 - 30px), 0); }
          to   { transform: translate3d(0, calc(var(--stage-h) + 30px), 0); }
        }
        @keyframes rf-up {
          from { transform: translate3d(0, calc(var(--stage-h) + 30px), 0); }
          to   { transform: translate3d(0, calc(var(--disc) * -1 - 30px), 0); }
        }

        /* Declared AFTER the animation properties above so they actually win —
           the shorthand form resets play-state, and this page has been bitten
           by that once already.
           HOLD is the whole interaction: point at one disc and the entire
           shower stops where it stands, then carries on from exactly there. */
        .rf-stage[data-hold="true"] .rf-item,
        [data-anim="off"] .rf-item { animation-play-state: paused; }
        /* will-change holds a compositor layer per disc — twelve of them, about
           3MB of GPU texture at dpr 3. Hand them back when nothing is moving. */
        [data-anim="off"] .rf-item { will-change: auto; }

        /* ── Compact: three lanes, six discs ────────────────────────────────
           Nothing here is a new mechanism. The travel, the keyframes and the
           stage mask are the same ones the wide layout has used all along —
           this block just hands them a smaller stage, a narrower set of lanes
           and half as many objects.

           min(86px, 24vw) is what keeps it working at 320px: on a Fold cover
           screen the discs shrink to 77px rather than overflowing. */
        @media (max-width: 1023.98px) {
          .rf-stage {
            --disc-base: min(86px, 24vw);
            --stage-h: 460px;
            --rf-card-mode: dock;
            max-width: none;
          }

          /* Half the shower comes off the stage. Twelve objects in three lanes
             is a traffic jam; six is weather. Hiding rather than not rendering
             keeps one DOM tree across the breakpoint — no JS width check, so
             nothing can hydrate wrong. */
          .rf-item[data-copy="1"] { display: none; }

          .rf-item {
            left: var(--x-sm);
            width: var(--disc-sm);
            height: var(--disc-sm);
            margin-left: calc(var(--disc-sm) / -2);
            animation-duration: var(--dur-sm);
            animation-delay: var(--delay-sm);
          }
          /* Direction is dealt per lane rather than inherited per brand, so
             these have to override the wide rules — they come later in the
             sheet, which is how they win. */
          .rf-item[data-dir-sm="down"] { animation-name: rf-down; }
          .rf-item[data-dir-sm="up"]   { animation-name: rf-up; }
        }

        .rf-disc {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(180deg, oklch(1 0 0 / 0.96), oklch(0.92 0.005 265 / 0.88));
          border: 1px solid oklch(1 0 0 / 0.45);
          box-shadow:
            inset 0 1px 0 0 oklch(1 0 0),
            0 18px 40px -18px oklch(0 0 0 / 0.9);
          opacity: 0.88;
          transition: opacity   320ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 420ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .rf-mark {
          width: 100%;
          height: 100%;
          object-fit: contain;
          /* percentage padding on a square box keeps the inset circular */
          padding: 16%;
        }
        .rf-item[data-active="true"] .rf-disc {
          opacity: 1;
          transform: scale(1.14);
          box-shadow:
            inset 0 1px 0 0 oklch(1 0 0),
            0 0 0 3px oklch(0.60 0.22 292 / 0.40),
            0 0 46px -6px oklch(0.60 0.22 292 / 0.85),
            0 18px 40px -18px oklch(0 0 0 / 0.9);
        }
        /* everything not being pointed at recedes */
        .rf-stage[data-hold="true"] .rf-item[data-active="false"] .rf-disc { opacity: 0.38; }

        .rf-card {
          position: absolute;
          z-index: 20;
          padding: 16px 18px 15px;
          border-radius: 16px;
          pointer-events: none;
          animation: rf-card-in 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes rf-card-in {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: none; }
        }
        .rf-card-eyebrow {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: oklch(0.78 0.15 292);
        }
        .rf-card-name {
          margin-top: 4px;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: oklch(0.97 0.003 260);
        }
        .rf-card-line {
          margin-top: 8px;
          font-size: 11.5px;
          line-height: 1.55;
          color: oklch(0.86 0.004 260);
        }
        .rf-card-cta {
          display: inline-flex;
          align-items: center;
          margin-top: 11px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: oklch(0.78 0.15 292);
        }
        .rf-card-close { display: none; }

        /* ── Docked card ──────────────────────────────────────────────────
           268px beside a disc needs 294px of clearance, which a 358px stage
           never has: the old placement flipped left every time and landed at a
           negative offset, i.e. entirely off-screen. Docked to whichever half
           of the stage the disc is NOT in, so the card never hides its own
           subject, and anchored to an edge so nothing needs measuring. */
        .rf-card[data-dock="true"] {
          left: 8px;
          right: 8px;
          width: auto;
          top: 8px;
          padding: 14px 16px 14px;
        }
        .rf-card[data-dock="true"][data-at-bottom="true"] {
          top: auto;
          bottom: 8px;
        }

        /* On a coarse pointer the disc no longer navigates, so the card has to
           be the way out — which means it must accept taps. On a fine pointer
           it stays inert, because drifting the cursor onto it would read as
           leaving the disc and close the thing being read. */
        @media (pointer: coarse) {
          .rf-card { pointer-events: auto; }
          .rf-card-cta {
            min-height: 44px;
            font-size: 11px;
            padding-right: 44px;
          }
          .rf-card-close {
            display: grid;
            place-items: center;
            position: absolute;
            top: 6px;
            right: 6px;
            width: 44px;
            height: 44px;
            border-radius: 999px;
            color: oklch(0.86 0.004 260);
          }
          .rf-card-close svg { width: 16px; height: 16px; }
        }

        /* ── the still grid ──────────────────────────────────────────────── */
        .rf-cell-disc {
          display: block;
          position: relative;
          width: 100%;
          max-width: 132px;
          aspect-ratio: 1;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(180deg, oklch(1 0 0 / 0.96), oklch(0.92 0.005 265 / 0.88));
          border: 1px solid oklch(1 0 0 / 0.40);
          box-shadow: 0 14px 32px -16px oklch(0 0 0 / 0.9);
        }
        .rf-cell-mark {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 16%;
        }

        /* Reduced motion gets the grid at every width. Twelve wrapping discs
           cannot be made still and still make sense — there is nowhere for the
           duplicates to sit — so the honest fallback is the layout that was
           built to work without motion in the first place. */
        @media (prefers-reduced-motion: reduce) {
          .rf-stage { display: none; }
          .rf-grid  { display: grid; }
        }
      `}</style>
    </section>
  )
}
