"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { posts } from "@/lib/blog-data"

gsap.registerPlugin(ScrollTrigger)

export function BlogPageClient() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.1 }
      )
    }, containerRef)
    return () => { try { ctx.revert() } catch (_) {} }
  }, [])

  const [featured, ...rest] = posts

  return (
    <div ref={containerRef} className="min-h-screen pt-36 pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-16 sm:mb-20">
          <p className="text-[10px] font-medium text-accent uppercase tracking-[0.22em] mb-4">Insights</p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.04] text-white mb-4">
            The Xegents <span className="gradient-text">Blog.</span>
          </h1>
          <p className="text-base text-foreground/45 max-w-sm leading-relaxed">
            Case studies, process breakdowns, and strategy pieces on AI automation in business.
          </p>
        </div>

        {/* ── Featured post ── */}
        <Link href={`/blog/${featured.slug}`} className="block mb-6 group">
          <div className="glass-card overflow-hidden">
            <div className="grid sm:grid-cols-[1fr_1.4fr] h-full">
              {/* Image */}
              <div className="relative aspect-[4/3] sm:aspect-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
              </div>
              {/* Content */}
              <div className="p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent/15 text-accent">
                      {featured.category}
                    </span>
                    <span className="text-[11px] text-foreground/35">{featured.date}</span>
                    <span className="text-[11px] text-foreground/35">·</span>
                    <span className="text-[11px] text-foreground/35">{featured.readTime}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug text-white mb-4 group-hover:text-accent/90 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-sm text-foreground/50 leading-relaxed">{featured.excerpt}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent mt-6 group-hover:gap-3 transition-all">
                  Read full case study →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* ── Post grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="glass-card overflow-hidden h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-600"
                  />
                </div>
                {/* Text */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-accent/10 text-accent">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-foreground/30">{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold tracking-tight leading-snug text-white mb-2 group-hover:text-accent/90 transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-[12px] text-foreground/40 leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-[10px] text-foreground/25 mt-auto pt-4 border-t border-border">
                    <span>{post.date}</span>
                    <span className="text-accent font-semibold group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold mb-1">Want this thinking applied to your business?</p>
            <p className="text-sm text-foreground/40">30 minutes. No pitch. We map your highest-ROI AI move.</p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 px-7 py-3 bg-accent text-white rounded-lg font-semibold text-sm hover:bg-accent/85 transition-colors whitespace-nowrap"
          >
            Book a Discovery Call →
          </Link>
        </div>

      </div>
    </div>
  )
}
