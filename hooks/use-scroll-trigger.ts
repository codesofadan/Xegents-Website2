"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollTrigger(options = {}) {
  const elementRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Keep observing for re-trigger on scroll
        }
      },
      {
        threshold: 0.1,
        ...options,
      },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [options])

  return { elementRef, isInView }
}
