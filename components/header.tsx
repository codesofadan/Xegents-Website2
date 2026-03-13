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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between w-full gap-3">
        <a
          href="https://xegents.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <img
            src="/xegents-logo.png"
            alt="Xegents Logo"
            width={40}
            height={40}
            className="h-8 w-auto sm:h-9 object-contain"
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
          className="px-5 sm:px-6 py-2 bg-foreground text-background rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition-all flex-shrink-0 whitespace-nowrap"
        >
          Get Started
        </button>
      </div>
    </header>
  )
}
