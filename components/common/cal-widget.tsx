"use client"

import { useEffect } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"

const CAL_LINK = "zainsaeeed/ai-session"
const NAMESPACE = "ai-session"

/**
 * Inline Cal.com embed for the booking section. Unlike the old Calendly embed
 * (which needed a CSS invert filter to fake a dark theme), Cal.com supports a
 * native "dark" theme, so it just gets themed directly. `cal-brand` matches the
 * site's purple accent (#9333ea).
 */
export function CalInline() {
  useEffect(() => {
    ;(async () => {
      const cal = await getCalApi({ namespace: NAMESPACE })
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#9333ea" },
          dark: { "cal-brand": "#9333ea" },
        },
      })
    })()
  }, [])

  return (
    <div
      className="w-full rounded-xl overflow-hidden bg-black"
      style={{ minWidth: "320px", height: "700px" }}
      data-lenis-prevent
    >
      <Cal
        namespace={NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
      />
    </div>
  )
}
