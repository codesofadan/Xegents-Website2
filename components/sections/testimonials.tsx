"use client"

/* ────────────────────────────────────────────────────────────────────────────
   ⚠️  CURRENTLY HIDDEN — "What founders say after we ship."

   This section is not on the site right now. It is commented out at its call
   site in app/(marketing)/page.tsx, NOT here: the import and the <Testimonials />
   element are both commented there.

   Nothing in this file has been removed or changed to hide it. All six quotes,
   the desktop marquee, the stacked mobile layout and the pause control are
   intact and working — the component simply is not being rendered.

   TO BRING IT BACK: uncomment those two lines in page.tsx. That is the entire
   job; nothing in this file needs touching.
──────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"


const TESTIMONIALS = [
  {
    quote:
      "I used to lose entire weekends writing blogs for clients. Now one command runs the whole pipeline: research, drafting, fact-checking, even the WordPress upload. Ten agents doing what my team of three couldn't keep up with.",
    name: "Asim",
    role: "Content Agency Owner",
    system: "BlogOS",
    stat: "1 post/day, same team",
  },
  {
    quote:
      "The 660-point audit that used to take us two weeks now lands in ten minutes as a consulting-grade PDF. Prospects sign before the competition has even sent their first email.",
    name: "Umer",
    role: "SEO Agency Founder",
    system: "SEO-AUDIT-OS",
    stat: "2 weeks → 10 min",
  },
  {
    quote:
      "From finding the lead to booking the call, the pipeline runs itself: personalised emails, a free-value PDF for every prospect, and reply detection. I just show up to the meetings.",
    name: "Hasan",
    role: "B2B Consultant",
    system: "LeadGen OS",
    stat: "Pipeline on autopilot",
  },
  {
    quote:
      "Quotations, itineraries, follow-ups: the automation answers enquiries while we sleep. We reply in minutes now instead of the next morning, and our bookings show it.",
    name: "Hamza",
    role: "Travel Agency Owner",
    system: "Travel Automation",
    stat: "Replies in minutes",
  },
  {
    quote:
      "SEO AIOS runs our entire SEO operation: audits, content and rank tracking. What needed five different tools and two juniors is now one system that never misses a check.",
    name: "Haseeb",
    role: "SEO Lead",
    system: "SEO AIOS",
    stat: "5 tools → 1 system",
  },
  {
    quote:
      "We plugged SEO AIOS into three client accounts and rankings started moving within weeks. It catches the technical issues humans skim past, every single time.",
    name: "Danyal",
    role: "Agency Partner",
    system: "SEO AIOS",
    stat: "3 clients, rankings up",
  },
]

// Rendered twice so the track can loop seamlessly.
const LOOP = [...TESTIMONIALS, ...TESTIMONIALS]

/* Where the marquee stops being a marquee.
   Above this the six quotes drift past on a 38-second loop, which reads as
   ambient proof. Below it a 320px card fills the screen, so the same drift is
   a card sliding out from under you while you are still on the second line —
   and so is any control that makes you drag or step through them. Below this
   width they simply stack, one under another, and you read them. */
const STACK_Q = "(max-width: 1023.98px)"

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  // Header reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".testi-header-el",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )
    }, sectionRef)
    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  // Slow, continuous left → right rotation of the comments
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    const build = () => {
      tweenRef.current?.kill()
      tweenRef.current = null
      gsap.set(track, { x: 0 })
      if (reduce) return
      /* Below 1024px the cards are a static vertical list. A GSAP transform
         over that would slide the whole column sideways, so the tween is
         simply never built — gsap.set above has already parked x at 0. */
      if (window.matchMedia(STACK_Q).matches) return
      // Distance from the start of copy 1 to the start of copy 2 = one full,
      // gap-inclusive tile width → shifting by it tiles perfectly (no jump).
      // Subtract the first child's own offset so the track's px padding isn't
      // counted into the period (which would nudge the seam each loop).
      const first = track.children[0] as HTMLElement | undefined
      const dup = track.children[TESTIMONIALS.length] as HTMLElement | undefined
      if (!first || !dup) return
      const shift = dup.offsetLeft - first.offsetLeft
      if (shift <= 0) return
      // Start shifted left, animate back to 0 → content travels left → right.
      gsap.set(track, { x: -shift })
      tweenRef.current = gsap.to(track, {
        x: 0,
        duration: 38,
        ease: "none",
        repeat: -1,
      })
    }

    build()

    let lastW = window.innerWidth
    const onResize = () => {
      if (window.innerWidth === lastW) return // ignore vertical-only changes
      lastW = window.innerWidth
      build()
    }
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      tweenRef.current?.kill()
    }
  }, [])

  /* WCAG 2.2.2 (Pause, Stop, Hide). This is a 38-second auto-scrolling region
     and the only way to stop it was hovering a mouse over it — the cards are
     plain divs, so there was no keyboard path either, and on a phone none at
     all. A visible toggle is the only control that works for every input. */
  const [paused, setPaused] = useState(false)
  const pause = () => tweenRef.current?.pause()
  const resume = () => { if (!paused) tweenRef.current?.resume() }
  const toggle = () => {
    setPaused((p) => {
      const next = !p
      if (next) tweenRef.current?.pause()
      else tweenRef.current?.resume()
      return next
    })
  }

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="testi-header-el text-xs font-medium text-accent uppercase tracking-widest mb-3">Client Results</p>
            <h2 className="testi-header-el text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
              What founders say <span className="gradient-text">after we ship.</span>
            </h2>
          </div>
          <div className="testi-header-el flex items-end gap-4">
            <p className="text-sm text-foreground/45 max-w-xs leading-relaxed">
              Numbers from real engagements. No stock photos, no made-up stats.
            </p>
            {/* WCAG 2.2.2, and only above lg — below it there is no animation
                left to pause, so a pause button would be a control that does
                nothing. The arrows underneath are the control there. */}
            <button
              type="button"
              onClick={toggle}
              aria-pressed={paused}
              aria-label={paused ? "Play the testimonial marquee" : "Pause the testimonial marquee"}
              className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-foreground/60 transition-colors hover:border-accent/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:grid"
            >
              {paused ? (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Wide: a rotating marquee (left → right).
          Narrow: the same six cards, stacked and still. */}
      <div
        className="relative"
        role="region"
        aria-label="Client testimonials"
        onPointerEnter={(e) => { if (e.pointerType !== "touch") pause() }}
        onPointerLeave={(e) => { if (e.pointerType !== "touch") resume() }}
      >
        <div ref={trackRef} className="testi-track flex gap-5 w-max px-4 sm:px-6 will-change-transform">
          {LOOP.map((t, i) => (
            <div
              key={i}
              aria-hidden={i >= TESTIMONIALS.length}
              data-dupe={i >= TESTIMONIALS.length}
              /* 320px was a FIXED width inside a 288px container on a 320px
                 screen — a 32px horizontal overflow on an SE and a Fold cover
                 display. min() caps it at the viewport and is a no-op at every
                 width above 376px, so nothing else moves. */
              className="testi-card glass-card w-[min(85vw,320px)] sm:w-[380px] shrink-0 p-7 flex flex-col justify-between gap-6 hover:border-accent/25 transition-colors"
            >
              {/* Quote */}
              <div>
                <svg className="w-6 h-6 text-accent/40 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-border">
                <div className="flex items-center gap-3">
                  {/* Initial avatar — no stock photos */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border border-accent/25 bg-gradient-to-br from-accent/25 to-accent/5 text-accent font-black text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold leading-tight">{t.name}</p>
                    <p className="text-xs text-foreground/45 leading-tight">{t.role} · {t.system}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {t.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div aria-hidden className="testi-fade pointer-events-none absolute inset-y-0 left-0 w-[8%] z-10"
             style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div aria-hidden className="testi-fade pointer-events-none absolute inset-y-0 right-0 w-[8%] z-10"
             style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
      </div>

      <style>{`
        /* ── Narrow: six quotes, stacked ───────────────────────────────────
           No drift, no scroller, no arrows. A quote you have to drag or step
           through is a quote most people will not read; six of them one under
           another is longer but it is the version that actually gets read.
           Every rule is inside a max-width query, so the wide layout — where
           the marquee still runs — never sees one of them. */
        @media (max-width: 1023.98px) {
          .testi-track {
            flex-direction: column;
            width: auto;
            /* Nothing transforms this any more, so the layer promotion is
               pure cost: six cards of GPU texture held for no reason. */
            will-change: auto;
          }
          .testi-card { width: 100%; }
          /* The second copy exists only so the loop has something to tile
             with. With no loop it is six duplicate quotes of dead page. */
          .testi-card[data-dupe="true"] { display: none; }
          /* Edge fades belong to a moving row. Nothing moves now. */
          .testi-fade { display: none; }
        }
      `}</style>
    </section>
  )
}
