"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"


const PHRASES = ["WE FIND THE WORK", "YOUR TEAM SHOULDN'T BE DOING", "ASSIGN IT TO AI"]
const SEP = "★"
/* Measured, not guessed. Each repetition is ~1172px of type at the largest
   breakpoint, and the strip is `100% + 900px` wide and scroll-scrubbed +/-220px
   — so at a 1920px viewport it needs 2.78 repetitions to stay full. Four gives
   a margin and still fills a 390px phone seven times over.

   It was 10, which rendered 60 spans per strip and 120 across the two. That is
   a tenth of the page's entire element count, every one of them a nowrap text
   node the browser has to measure, all of it clipped and never seen. */
const REPS = 4

function buildSegments(order: number[]) {
  const out: { text: string; star: boolean }[] = []
  for (let i = 0; i < REPS; i++) {
    order.forEach((idx) => {
      out.push({ text: PHRASES[idx], star: false })
      out.push({ text: SEP, star: true })
    })
  }
  return out
}

const TOP_SEGS = buildSegments([0, 1, 2])
const BOT_SEGS = buildSegments([2, 0, 1])

function TapeStrip({ segs, rotate }: { segs: typeof TOP_SEGS; rotate: string }) {
  return (
    <div
      className="flex items-center bg-white border-y-[3px] border-black py-3.5 sm:py-5"
      style={{
        // wider than viewport so moving ±200px never shows a gap
        width: "calc(100% + 900px)",
        marginLeft: "-450px",   // (100% + 900 - 100%) / -2 = -450px → centered
        transform: `rotate(${rotate})`,
        transformOrigin: "center center",
      }}
    >
      {segs.map((s, i) => (
        <span
          key={i}
          className={`flex-shrink-0 select-none font-black uppercase whitespace-nowrap ${
            s.star
              ? "px-5 text-accent text-xl sm:text-2xl"
              : "px-5 text-black text-sm sm:text-xl tracking-[0.15em]"
          }`}
        >
          {s.text}
        </span>
      ))}
    </div>
  )
}

export function TapeMarquee() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP only touches x on the OUTER wrapper.
      // CSS handles rotation on the INNER tape — pivot never drifts.
      gsap.to(".tape-top-wrap", {
        x: 220,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1.2,
        },
      })
      gsap.to(".tape-bot-wrap", {
        x: -220,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1.2,
        },
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none overflow-hidden"
      style={{ height: "230px", position: "relative" }}
    >
      {/*
        TOP tape: wrapper top=70px, rotate -5° (gentle diagonal).
        BOTTOM tape: wrapper top=90px, rotate +5°.

        Crossing at: x = viewport_center - 40/(2*tan8°) ≈ viewport_center - 142px
          ≈ 40% from left at 1440px. Both tapes fully visible across the viewport.
        Cross-point X is scroll-invariant; only Y shifts as tapes drift in opposite directions.
      */}

      {/* TOP tape outer — GSAP moves x, no rotation here */}
      <div
        className="tape-top-wrap"
        style={{ position: "absolute", left: 0, right: 0, top: "70px" }}
      >
        <TapeStrip segs={TOP_SEGS} rotate="-5deg" />
      </div>

      {/* BOTTOM tape outer */}
      <div
        className="tape-bot-wrap"
        style={{ position: "absolute", left: 0, right: 0, top: "90px" }}
      >
        <TapeStrip segs={BOT_SEGS} rotate="5deg" />
      </div>
    </div>
  )
}
