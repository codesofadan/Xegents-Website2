"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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

   TOUCH AND REDUCED MOTION. Hover is not an input on a phone, and falling
   logos you cannot catch are a trap. Below lg — and for anyone who asks for
   reduced motion at any width — this becomes a still grid with the detail
   already showing.
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
    line: "Point of sale and full accounting in one system — multi-branch, cloud-hosted, offline-tolerant.",
    url: "https://mssalepoint.com/",
  },
  {
    id: "barioo",
    name: "Barioo",
    logo: "/logos/barioo.png",
    w: 94, h: 94,
    sector: "ERP-Integrated POS",
    line: "Point of sale built on top of an ERP — inventory, access and statistics in one place.",
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

/* Two copies per column, half a cycle apart, plus a per-column offset so the
   six columns are not marching in step. All arithmetic, no Math.random — this
   renders on the server first and a random value would hydrate mismatched. */
const ITEMS = BRANDS.flatMap((brand, i) => {
  const c = COLUMNS[i]
  return [0, 1].map((copy) => ({
    key: `${brand.id}-${copy}`,
    brand,
    x: c.x,
    size: c.size,
    dur: c.dur,
    dir: c.dir,
    delay: -(copy * 0.5 * c.dur + i * 1.3),
  }))
})

/** Detail card footprint. Needed before paint, to pick the side it opens on. */
const CARD_W = 268
const CARD_H = 168

type Active = { key: string; brandId: string; left: number; top: number } | null

export function GroupCompanies() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState<Active>(null)

  const activeBrand = BRANDS.find((b) => b.id === active?.brandId) ?? null

  /* Twelve looping animations. None of them run off-screen. */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  /* Measure where the disc is, then open the card on whichever side has room.
     The rect is read in the same tick the freeze is requested, so it is the
     position the disc is about to hold. */
  const open = useCallback((key: string, brandId: string, itemEl: HTMLElement) => {
    const stage = stageRef.current
    if (!stage) return
    const s = stage.getBoundingClientRect()
    const d = itemEl.getBoundingClientRect()
    const cx = d.left + d.width / 2 - s.left
    const cy = d.top + d.height / 2 - s.top
    const r = d.width / 2

    const openRight = s.width - (cx + r) >= CARD_W + 26
    const left = openRight ? cx + r + 20 : cx - r - 20 - CARD_W
    const top = Math.max(8, Math.min(s.height - CARD_H - 8, cy - CARD_H / 2))

    setActive({ key, brandId, left, top })
  }, [])

  const close = useCallback(() => setActive(null), [])

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
            They have trusted Xegents. <span className="gradient-text">Would you?</span>
          </h2>
          <p className="gc-header mt-4 text-sm sm:text-base text-foreground/55 leading-relaxed">
            Six technology businesses — POS and ERP, security, networking, hosting and
            cross-border commerce — running across nine countries.
          </p>
        </div>

        {/* ── The rain (lg and up, motion allowed) ────────────────────────── */}
        <div
          ref={stageRef}
          className="gc-reveal rf-stage relative hidden lg:block"
          data-hold={active ? "true" : "false"}
        >
          <div className="rf-rain">
            {ITEMS.map((it) => (
              <div
                key={it.key}
                className="rf-item"
                data-dir={it.dir}
                data-active={active?.key === it.key ? "true" : "false"}
                style={{
                  left: `${it.x}%`,
                  ["--disc" as string]: `calc(var(--disc-base) * ${it.size})`,
                  animationDuration: `${it.dur}s`,
                  animationDelay: `${it.delay}s`,
                } as React.CSSProperties}
                onMouseEnter={(e) => open(it.key, it.brand.id, e.currentTarget)}
                onMouseLeave={close}
              >
                <a
                  href={it.brand.url}
                  target="_blank"
                  rel="noopener noreferrer external"
                  aria-label={`${it.brand.name} — ${it.brand.sector}. Opens in a new tab.`}
                  className="rf-disc focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
                  onFocus={(e) => open(it.key, it.brand.id, e.currentTarget.parentElement as HTMLElement)}
                  onBlur={close}
                >
                  {/* alt is empty on purpose — the anchor's aria-label already
                      names this link, and a filled alt would announce twice */}
                  <Image
                    src={it.brand.logo}
                    alt=""
                    width={it.brand.w}
                    height={it.brand.h}
                    sizes="180px"
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
              className="rf-card glass-panel"
              aria-hidden="true"
              style={{ left: active.left, top: active.top, width: CARD_W }}
            >
              <p className="rf-card-eyebrow">{activeBrand.sector}</p>
              <p className="rf-card-name">{activeBrand.name}</p>
              <p className="rf-card-line">{activeBrand.line}</p>
              <p className="rf-card-cta">
                Visit site <span aria-hidden="true">↗</span>
              </p>
            </div>
          )}
        </div>

        {/* ── Grid (below lg, or reduced motion at any width) ─────────────── */}
        <div className="gc-reveal rf-grid grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:hidden">
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
          width: var(--disc);
          height: var(--disc);
          margin-left: calc(var(--disc) / -2);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .rf-item[data-dir="down"] { animation-name: rf-down; }
        .rf-item[data-dir="up"]   { animation-name: rf-up; }

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
          margin-top: 11px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: oklch(0.78 0.15 292);
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
