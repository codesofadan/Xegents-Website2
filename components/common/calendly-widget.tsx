"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

const CALENDLY_URL = "https://calendly.com/business-zainsaeed/ai-discovery"

// NOTE: Calendly's background_color/text_color/primary_color URL params are a
// paid-plan feature — on this account they are silently ignored and the embed
// renders white. The inline embed below forces a dark theme with a CSS invert
// filter instead (and hides the event-details panel, which contains the photo
// that would otherwise look wrong inverted).
const THEME_PARAMS = "hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=9333ea"
const INLINE_PARAMS = `${THEME_PARAMS}&hide_event_type_details=1`

// white → near-black, then rotate hue 180° so Calendly's blue stays blue.
const DARK_FILTER = "invert(0.92) hue-rotate(180deg) contrast(0.95)"

/**
 * Full inline embed — renders the Calendly iframe DIRECTLY instead of letting
 * widget.js scan the DOM and inject it (that scan ran during scroll and caused
 * visible lag). loading="lazy" defers the iframe until it nears the viewport,
 * so it never competes with the page's own load.
 */
export function CalendlyInline() {
  // embed_domain requires window — build the src after mount.
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    setSrc(`${CALENDLY_URL}?embed_type=Inline&embed_domain=${window.location.host}&${INLINE_PARAMS}`)
  }, [])

  return (
    <div
      className="w-full rounded-xl overflow-hidden bg-black"
      style={{ minWidth: "320px", height: "700px" }}
      data-lenis-prevent
    >
      {src && (
        <iframe
          src={src}
          title="Book a free AI discovery call"
          loading="lazy"
          className="w-full h-full border-0"
          style={{ background: "#000", filter: DARK_FILTER }}
        />
      )}
    </div>
  )
}

/** Opens Calendly as a popup — use for buttons/links */
export function CalendlyPopupButton({ className, children }: { className?: string; children: React.ReactNode }) {
  // widget.js needs its stylesheet for the popup overlay; without it the popup
  // renders unstyled and feels broken/slow. Inject the link once.
  useEffect(() => {
    if (document.querySelector('link[href*="assets.calendly.com"]')) return
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://assets.calendly.com/assets/external/widget.css"
    document.head.appendChild(link)
  }, [])

  const open = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    const url = `${CALENDLY_URL}?${THEME_PARAMS}`
    if (w.Calendly) {
      w.Calendly.initPopupWidget({ url })
    } else {
      window.open(url, "_blank")
    }
  }

  return (
    <>
      <button onClick={open} className={className}>
        {children}
      </button>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  )
}
