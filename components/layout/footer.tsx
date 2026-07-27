"use client"

import { useEffect, useRef, useState } from "react"

function MailIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <span className="[&>svg]:h-4 [&>svg]:w-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 186.6-186.6 186.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
      </svg>
    </span>
  )
}

function YoutubeIcon() {
  return (
    <span className="[&>svg]:h-4 [&>svg]:w-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 576 512">
        <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
      </svg>
    </span>
  )
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <circle cx="17.5" cy="6.5" r="1.5"></circle>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  )
}

export function Footer() {
  const [visible, setVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const el = footerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)

    return () => observer.disconnect()
  }, [])

  const reveal = visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"

  return (
    <footer ref={footerRef} className="border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="space-y-8 sm:space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16">
            {/* Left section */}
            <div className={`space-y-3 flex-shrink-0 transition-all duration-700 ${reveal}`}>
              <a
                href="https://xegents.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Xegents — opens xegents.com in a new tab"
                className="inline-block opacity-100 transition-opacity"
              >
                <img
                  src="/xegents-logo.png"
                  alt="Xegents Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                  loading="eager"
                  onError={(e) => {
                    if (e.currentTarget.src !== "/xegents-logo.png") {
                      e.currentTarget.src = "/xegents-logo.png"
                    }
                  }}
                />
              </a>
              <p className="text-xs sm:text-sm text-foreground leading-relaxed max-w-md">
                We find the work your team shouldn't be doing, and assign it to AI.
              </p>
              <p className="text-xs text-foreground leading-tight">
                ~{" "}
                <a
                  href="https://www.instagram.com/zainsaeeed/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors font-medium"
                >
                  Zain Saeed
                </a>{" "}
                | Founder, Xegents
              </p>
            </div>

            {/* Right section - Contact */}
            <div className={`space-y-3 flex-shrink-0 transition-all duration-700 delay-100 ${reveal}`}>
              {/* h3, not h4 — the nearest heading above is an h2, and skipping
                  a level breaks the document outline for screen readers. */}
              <h3 className="text-xs font-medium text-foreground uppercase tracking-wider">Contact</h3>
              <div className="flex flex-col">
                <a
                  href="mailto:business.zainsaeed@gmail.com"
                  className="flex min-h-11 items-center gap-2 text-xs sm:text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  <MailIcon />
                  <span>business.zainsaeed@gmail.com</span>
                </a>
                <a
                  href="tel:+923088040606"
                  className="flex min-h-11 items-center gap-2 text-xs sm:text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  <PhoneIcon />
                  <span>+92 308 804 0606</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t border-border mt-10 sm:mt-14 pt-6 sm:pt-8 transition-all duration-700 delay-200 ${reveal}`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-left text-xs text-foreground/70">
              &copy; {new Date().getFullYear()} Xegents. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2">
              {[
                {
                  icon: WhatsAppIcon,
                  label: "WhatsApp",
                  href: "https://wa.me/923088040606",
                },
                {
                  icon: YoutubeIcon,
                  label: "YouTube",
                  href: "https://www.youtube.com/@zainsaeeed",
                },
                {
                  icon: InstagramIcon,
                  label: "Instagram",
                  href: "https://www.instagram.com/zainsaeeed/",
                },
                {
                  icon: FacebookIcon,
                  label: "Facebook",
                  href: "https://www.facebook.com/zainsaeeeed/",
                },
                {
                  icon: LinkedinIcon,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/zainsaeeed/",
                },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-lg text-foreground/70 hover:text-foreground transition-colors"
                    title={social.label}
                    aria-label={social.label}
                  >
                    <Icon />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
