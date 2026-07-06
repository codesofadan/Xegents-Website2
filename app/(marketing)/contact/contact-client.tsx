"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CalendlyPopupButton } from "@/components/common/calendly-widget"

gsap.registerPlugin(ScrollTrigger)

function MailIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 186.6-186.6 186.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
  )
}

const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet",
]

export function ContactPageClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState({
    name: "", email: "", company: "", message: "", budget: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-hero-el",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: "power3.out", delay: 0.2 }
      )
      gsap.fromTo(".contact-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-card", start: "top 85%" } }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSending(false)
    setSubmitted(true)
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 px-4 sm:px-6 bg-black/30">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16 sm:mb-20 text-center max-w-2xl mx-auto">
          <p className="contact-hero-el text-xs font-medium text-accent uppercase tracking-widest mb-4">Get In Touch</p>
          <h1 className="contact-hero-el text-4xl sm:text-6xl font-black tracking-tighter leading-none mb-6 text-white">
            Let's talk about <span className="gradient-text">your business.</span>
          </h1>
          <p className="contact-hero-el text-base text-foreground/75 leading-relaxed">
            Tell us what you're working on. We'll identify the highest-ROI AI move and give you a roadmap — no fluff, no sell pitch.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* Form */}
          <div className="contact-card lg:col-span-3 glass-card p-8 sm:p-10">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <h3 className="text-xl font-bold mb-2">Message sent.</h3>
                <p className="text-foreground/60 text-sm">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-2">Name *</label>
                    <input
                      required
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-2">Email *</label>
                    <input
                      required
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                      placeholder="you@company.com"
                      className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-2">Company</label>
                  <input
                    type="text"
                    value={formState.company}
                    onChange={(e) => setFormState((s) => ({ ...s, company: e.target.value }))}
                    placeholder="Your company or industry"
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-2">Budget Range</label>
                  <select
                    value={formState.budget}
                    onChange={(e) => setFormState((s) => ({ ...s, budget: e.target.value }))}
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-accent/60 transition-colors appearance-none"
                  >
                    <option value="" className="bg-background">Select a range</option>
                    {BUDGET_OPTIONS.map((o) => (
                      <option key={o} value={o} className="bg-background">{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-2">What are you working on? *</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                    placeholder="Describe your current workflow, what's broken, or what you want to automate..."
                    className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder-foreground/30 focus:outline-none focus:border-accent/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-accent text-accent-foreground rounded-lg font-semibold text-sm hover:bg-accent/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-accent-foreground/40 border-t-accent-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right sidebar */}
          <div className="contact-card lg:col-span-2 space-y-5">

            {/* Book a call */}
            <div className="glass-card p-7 border border-accent/20">
              <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">Prefer to talk?</p>
              <h3 className="text-xl font-black mb-2">Book a 30-min discovery call</h3>
              <p className="text-sm text-foreground/60 mb-5 leading-relaxed">
                Pick a time that works. We'll map your biggest bottleneck and show you what AI could fix — free, no obligation.
              </p>
              <CalendlyPopupButton className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-accent-foreground rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors">
                Pick a Time →
              </CalendlyPopupButton>
            </div>

            {/* Direct contact */}
            <div className="glass-card p-7">
              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-4">Direct</p>
              <div className="space-y-3">
                <a
                  href="mailto:business.zainsaeed@gmail.com"
                  className="flex items-center gap-3 text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  <span className="text-accent"><MailIcon /></span>
                  business.zainsaeed@gmail.com
                </a>
                <a
                  href="tel:+923088040606"
                  className="flex items-center gap-3 text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  <span className="text-accent"><PhoneIcon /></span>
                  +92 308 804 0606
                </a>
                <a
                  href="https://wa.me/923088040606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-foreground/70 hover:text-foreground transition-colors"
                >
                  <span className="text-accent"><WhatsAppIcon /></span>
                  Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="glass-card p-7">
              <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-4">Follow</p>
              <div className="flex gap-3">
                {[
                  { icon: LinkedinIcon, label: "LinkedIn", href: "https://www.linkedin.com/in/zainsaeeed/" },
                  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/zainsaeeed/" },
                  { icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/923088040606" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-foreground/50 hover:text-accent hover:border-accent/40 transition-colors"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
