"use client"

import { useState, useEffect } from "react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToBooking = () => {
    const element = document.getElementById("booking-section")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-3 left-3 right-3 z-50 transition-all duration-300 header-animation rounded-3xl ${
        isScrolled
          ? "glass-card backdrop-blur-xl border border-accent/30 shadow-lg shadow-accent/20"
          : "border border-transparent"
      }`}
    >
      <div className="px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 flex items-center justify-between w-full gap-3">
        <a
          href="https://xegents.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity transform hover:scale-105 flex-shrink-0"
        >
          <img
            src="/xegents-logo.png"
            alt="Xegents Logo"
            width={40}
            height={40}
            className="h-8 w-auto sm:h-10 object-contain transition-all"
            loading="eager"
            onError={(e) => {
              if (e.currentTarget.src !== "/xegents-logo.png") {
                e.currentTarget.src = "/xegents-logo.png"
              }
            }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8"></nav>

        <button
          onClick={scrollToBooking}
          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-xs sm:text-sm font-semibold hover:shadow-lg hover:shadow-accent/40 transition-all transform hover:scale-105 text-foreground flex-shrink-0 whitespace-nowrap"
        >
          Get Started
        </button>
      </div>
    </header>
  )
}
