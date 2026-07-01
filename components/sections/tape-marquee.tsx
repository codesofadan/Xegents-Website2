"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const PHRASES = ["WE FIND THE WORK", "YOUR TEAM SHOULDN'T BE DOING", "ASSIGN IT TO AI"]
const SEP = "★"
const REPS = 10

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
      style={{ height: "320px", position: "relative" }}
    >
      {/*
        TOP tape: wrapper top=140px, rotate -8° (gentle diagonal).
        BOTTOM tape: wrapper top=180px, rotate +8°.

        Crossing at: x = viewport_center - 40/(2*tan8°) ≈ viewport_center - 142px
          ≈ 40% from left at 1440px. Both tapes fully visible across the viewport.
        Cross-point X is scroll-invariant; only Y shifts as tapes drift in opposite directions.
      */}

      {/* TOP tape outer — GSAP moves x, no rotation here */}
      <div
        className="tape-top-wrap"
        style={{ position: "absolute", left: 0, right: 0, top: "140px" }}
      >
        <TapeStrip segs={TOP_SEGS} rotate="-5deg" />
      </div>

      {/* BOTTOM tape outer */}
      <div
        className="tape-bot-wrap"
        style={{ position: "absolute", left: 0, right: 0, top: "160px" }}
      >
        <TapeStrip segs={BOT_SEGS} rotate="5deg" />
      </div>
    </div>
  )
}
