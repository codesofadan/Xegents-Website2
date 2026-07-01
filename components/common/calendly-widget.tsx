"use client"

import Script from "next/script"

const CALENDLY_URL = "https://calendly.com/business-zainsaeed/ai-discovery"

/** Full inline embed — use inside a section that has room for 700px height */
export function CalendlyInline() {
  return (
    <>
      <div
        className="calendly-inline-widget w-full rounded-xl overflow-hidden"
        data-url={`${CALENDLY_URL}?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=07040f&text_color=fafaf7&primary_color=9333ea`}
        style={{ minWidth: "320px", height: "700px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  )
}

/** Opens Calendly as a popup — use for buttons/links */
export function CalendlyPopupButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const open = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    if (w.Calendly) {
      w.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      window.open(CALENDLY_URL, "_blank")
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
