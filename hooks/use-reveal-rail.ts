"use client"

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

/* ────────────────────────────────────────────────────────────────────────────
   Shared behaviour for a row of cards that reveal detail into one panel below.

   Two problems this solves:

   1. A panel styled like the cards reads as a fifth card, not as the card
      above it opened. The rail — a short accent line that slides to sit under
      whichever card is active and matches its width — tethers the two. It is
      the same device as the navbar's active underline, so the page reuses a
      language it already has.

   2. Defaulting to the first item means the panel is populated before anyone
      has touched anything, which makes it look like static content rather than
      a response. Nothing is active until first hover. After that the panel
      stays open and only swaps contents — opening and closing on every
      mouse-out would strobe.
──────────────────────────────────────────────────────────────────────────── */

export function useRevealRail() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [rail, setRail] = useState({ left: 0, width: 0 })

  const measure = useCallback(() => {
    const grid = gridRef.current
    if (!grid || !activeId) return
    const card = grid.querySelector<HTMLElement>(`[data-reveal-id="${CSS.escape(activeId)}"]`)
    if (!card) return
    const g = grid.getBoundingClientRect()
    const c = card.getBoundingClientRect()
    setRail({ left: c.left - g.left, width: c.width })
  }, [activeId])

  // Layout effect so the rail is already in place on the frame it appears.
  useLayoutEffect(measure, [measure])

  // Card widths change with the grid's column count, so the rail has to
  // re-measure rather than keep a stale offset.
  useEffect(() => {
    if (!activeId) return
    const grid = gridRef.current
    if (!grid) return
    const ro = new ResizeObserver(measure)
    ro.observe(grid)
    window.addEventListener("resize", measure)
    return () => { ro.disconnect(); window.removeEventListener("resize", measure) }
  }, [activeId, measure])

  return { activeId, setActiveId, gridRef, rail, isOpen: activeId !== null }
}
