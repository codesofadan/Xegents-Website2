"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import Image from "next/image"

const BARION_URL = "https://barionsystems.com/"

/* ────────────────────────────────────────────────────────────────────────────
   PARENT COMPANY — the credibility beat between "what we build" and "the
   numbers".

   THE RELATIONSHIP IS OWNERSHIP. This said "We are trusted by Barion Systems"
   under a "Backed By" label, and both were wrong: Barion owns Xegents, it is
   not a customer and not merely a backer. "Trusted by" actively understates
   the claim — a supplier can be trusted, a subsidiary is part of the group —
   and on a page whose whole job is credibility, understating a real ownership
   tie throws away the strongest signal on it. The eyebrow is gone entirely;
   the headline now carries the fact on its own.

   THE FRAME. The job this section does was not landing: it read as one more
   band of text on a page made of bands of text, and an ownership claim that
   looks like body copy does not get believed. A trust signal has to look like
   a credential.

   SO IT IS NOW A PLATE. The whole block sits on one piece of real glass,
   lifted off the page, lit along its top edge, with an accent hairline across
   the top and a soft aura behind it. That is the standard pattern for an
   affiliation badge — the claim is set apart from the prose around it and
   given a surface of its own, so the eye stops on it.

   REAL GLASS, NOT `.glass-card`. That class is opaque: the stylesheet says
   "NO blur, NO glass" in as many words. `.glass-panel` is the genuine
   material — translucent over a barrier layer, actual backdrop blur, top-lit
   hairline, and a solid fallback when the OS asks for reduced transparency.

   STILL NO AMBIENT MOTION. The mark does not spin, pulse or drift; the rings
   are held. That was asked for explicitly and it is also correct — a badge
   that fidgets reads as an advert. The one scroll reveal stays, because every
   other section on the page has one and dropping it would make this the odd
   one out.

   LOGO NOTE: /barion-systems-logo.png is Barion's own white-knockout mark,
   109×64 native, rendered at 96px — never upscaled. The medallion supplies
   the presence so the asset never has to stretch.
──────────────────────────────────────────────────────────────────────────── */

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block h-3 w-3 ml-1 -translate-y-px opacity-70"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

function BarionLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href={BARION_URL}
      target="_blank"
      rel="noopener noreferrer external"
      title="Barion Systems — the technology group that owns Xegents"
      aria-label="Visit the Barion Systems website (opens in a new tab)"
      className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent/85 hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-sm"
    >
      {children}
      <ExternalIcon />
    </a>
  )
}

export function ParentCompany() {

  const sectionRef = useRef<HTMLElement>(null)

  /* Reduced motion reveals immediately instead of animating in. Read after
     mount, never during render — matchMedia in render is a hydration mismatch. */
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    setReduce(!!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
  }, [])
  const inView = useInView(sectionRef, { threshold: 0.12, once: true }) || reduce

  const reveal = inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"

  return (
    <section
      id="parent-company"
      ref={sectionRef}
      className="scroll-mt-28 pt-8 sm:pt-10 pb-10 sm:pb-14 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative">

          {/* Aura — the light the glass has to bend. A backdrop blur over a
              flat colour is indistinguishable from a flat colour. */}
          <div
            aria-hidden="true"
            className="pc-aura pointer-events-none absolute -inset-x-6 -inset-y-10 sm:-inset-x-10"
          />

          <div className={`pc-plate glass-panel relative transition-all duration-700 ${reveal}`}>

            {/* Credential hairline — a single lit rule across the top edge.
                Sits inside the panel's own radius, hence the inset. */}
            <span aria-hidden="true" className="pc-rule" />

            <div className="p-6 sm:p-10 lg:p-12">

              {/* Header row — title block left, mark right, one baseline. */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 sm:gap-10">
                <div>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tighter leading-tight">
                    Xegents owned by <span className="gradient-text">Barion Systems.</span>
                  </h2>
                </div>

                {/* The mark — glass medallion. Glow and rings only, held still. */}
                <a
                  href={BARION_URL}
                  target="_blank"
                  rel="noopener noreferrer external"
                  aria-label="Visit the Barion Systems website (opens in a new tab)"
                  className="pc-medallion group relative grid h-32 w-32 sm:h-40 sm:w-40 shrink-0 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle,oklch(0.60_0.22_292/0.30),transparent_66%)] blur-lg transition-opacity duration-500 group-hover:opacity-90"
                  />
                  <span aria-hidden="true" className="pc-ring pointer-events-none absolute inset-0 rounded-full" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-[15%] rounded-full border border-white/[0.07]"
                  />
                  <Image
                    src="/barion-systems-logo.png"
                    alt="Barion Systems"
                    width={109}
                    height={64}
                    className="relative w-20 sm:w-24 h-auto transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none"
                  />
                </a>
              </div>

              {/* Rule between the claim and the evidence. */}
              <div aria-hidden="true" className="pc-divider my-8 sm:my-10" />

              {/* Body — statement left, detail right. Two columns keep a
                  readable measure while still using the full width. */}
              <div className="grid lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-16">
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-foreground/90 leading-snug text-balance">
                  Thirteen years of shipped systems. Nine countries. One engineering group.
                </p>

                <div className="space-y-4">
                  <p className="text-sm sm:text-base text-foreground/60 leading-relaxed">
                    Xegents is owned by <BarionLink>Barion Systems</BarionLink>, an independent
                    technology group founded in{" "}
                    <strong className="font-semibold text-foreground/90">2013</strong> and
                    headquartered in Kuala Lumpur. Seven companies now sit under it, spanning POS and
                    ERP, security and visitor management, enterprise networking, hosting, and
                    cross-border e-commerce.
                  </p>
                  <p className="text-sm sm:text-base text-foreground/60 leading-relaxed">
                    It operates in{" "}
                    <strong className="font-semibold text-foreground/90">9+ countries</strong>,
                    including Malaysia, Pakistan, the USA, the UK, the UAE and Australia. Its
                    software already runs inside some of Kuala Lumpur&apos;s largest retail and
                    commercial developments. That engineering bench is what stands behind every AI
                    system we ship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pc-aura {
          background:
            radial-gradient(ellipse 55% 70% at 82% 20%, oklch(0.60 0.22 292 / 0.20), transparent 62%),
            radial-gradient(ellipse 60% 80% at 12% 78%, oklch(0.55 0.20 292 / 0.13), transparent 66%);
          filter: blur(18px);
        }

        .pc-plate { border-radius: 24px; }

        /* A lit rule across the top edge, brightest at the shoulder where the
           mark sits. Inset so it never pokes past the panel's rounded corner. */
        .pc-rule {
          position: absolute;
          top: 0;
          left: 12%;
          right: 12%;
          height: 1px;
          background: linear-gradient(to right,
            transparent,
            oklch(0.72 0.18 292 / 0.75) 45%,
            oklch(0.80 0.14 292 / 0.55) 62%,
            transparent);
        }

        .pc-divider {
          height: 1px;
          background: linear-gradient(to right,
            oklch(1 0 0 / 0.13),
            oklch(1 0 0 / 0.05) 55%,
            transparent);
        }

        .pc-ring {
          border: 1px solid oklch(1 0 0 / 0.12);
          box-shadow: inset 0 1px 0 0 oklch(1 0 0 / 0.16);
          transition: border-color 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .pc-medallion:hover .pc-ring,
        .pc-medallion:focus-visible .pc-ring {
          border-color: oklch(0.60 0.22 292 / 0.45);
        }

        @media (max-width: 640px) {
          .pc-plate { border-radius: 18px; }
        }
      `}</style>
    </section>
  )
}
