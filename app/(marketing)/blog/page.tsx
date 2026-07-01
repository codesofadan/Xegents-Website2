"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const posts = [
  {
    slug: "how-we-saved-real-estate-agency-18-hours-week",
    category: "Case Study",
    title: "How We Saved a Real Estate Agency 18 Hours Per Agent Per Week",
    excerpt:
      "A 6-agent agency was losing $340K/year to manual admin. Here's exactly what we automated, in what order, and what it cost them.",
    date: "Dec 2024",
    readTime: "8 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80&fit=crop&crop=center",
  },
  {
    slug: "the-ai-audit-what-we-look-for-in-week-one",
    category: "Process",
    title: "The AI Audit: What We Actually Look For in Week One",
    excerpt:
      "Most consultants interview people and write reports. We shadow workflows and time tasks. The difference is about $200K in findings.",
    date: "Nov 2024",
    readTime: "6 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop&crop=center",
  },
  {
    slug: "why-your-ai-chatbot-failed",
    category: "Strategy",
    title: "Why Your AI Chatbot Failed (And What to Build Instead)",
    excerpt:
      "Generic chatbots trained on your website don't work. Here's the architecture of an AI agent that actually takes actions inside your business.",
    date: "Nov 2024",
    readTime: "7 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&fit=crop&crop=center",
  },
  {
    slug: "n8n-vs-make-vs-zapier-which-for-which-job",
    category: "Technical",
    title: "n8n vs Make vs Zapier — Which Tool for Which Job",
    excerpt:
      "We've built automations on all three. Here's a decision framework based on complexity, data volume, and team technical level.",
    date: "Oct 2024",
    readTime: "5 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop&crop=center",
  },
  {
    slug: "the-28-percent-inefficiency-problem",
    category: "Strategy",
    title: "The 28% Problem: Why Most Companies Waste Nearly a Third of Their Operations Budget",
    excerpt:
      "Every dollar you invest in operations, 28 cents disappears into friction, manual handoffs, and processes nobody's touched in years.",
    date: "Oct 2024",
    readTime: "9 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop&crop=center",
  },
]

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".blog-hero-el",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: "power3.out", delay: 0.2 }
      )

      gsap.utils.toArray<HTMLElement>(".blog-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
            delay: (i % 3) * 0.08,
          }
        )
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const [featured, ...rest] = posts

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 px-4 sm:px-6 bg-black/30">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 sm:mb-20 text-center max-w-2xl mx-auto">
          <p className="blog-hero-el text-xs font-medium text-accent uppercase tracking-widest mb-4">Insights</p>
          <h1 className="blog-hero-el text-4xl sm:text-6xl font-black tracking-tighter leading-none mb-6 text-white">
            The Xegents <span className="gradient-text">Blog</span>
          </h1>
          <p className="blog-hero-el text-base text-foreground/75 max-w-xl mx-auto">
            Real case studies, process breakdowns, and strategy pieces on AI automation in business.
          </p>
        </div>

        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="blog-card block mb-6 group">
          <div className="glass-card overflow-hidden hover:border-accent/40 transition-colors">
            {/* Image */}
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent/80 text-white mb-3 inline-block">
                  {featured.category}
                </span>
                <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight mb-2 text-white group-hover:text-accent/90 transition-colors">
                  {featured.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                  <span className="ml-auto text-accent font-semibold">Read post →</span>
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Post grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card block group">
              <div className="glass-card overflow-hidden h-full flex flex-col hover:border-accent/30 transition-colors">
                {/* Card image */}
                <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Card text */}
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-accent/10 text-accent self-start mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold tracking-tight leading-snug mb-3 group-hover:text-accent transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-foreground/50 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-[11px] text-foreground/35 mt-auto pt-4 border-t border-border">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-foreground/50 text-sm">More posts coming. Want to be notified?</p>
          <a href="/contact" className="inline-flex items-center gap-2 mt-3 text-accent font-semibold hover:gap-3 transition-all">
            Get in touch →
          </a>
        </div>
      </div>
    </div>
  )
}
