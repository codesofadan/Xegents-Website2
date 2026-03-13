"use client"

import { useEffect, useState } from "react"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-background z-[999] flex items-center justify-center">
      <div className="relative z-10 flex flex-col items-center justify-center gap-6">
        {/* Simple logo with clean fade-in */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="relative"
            style={{
              animation: "logoReveal 1s ease-out 0.2s both",
            }}
          >
            <img
              src="/xegents-logo.png"
              alt="Xegents Logo"
              width={60}
              height={60}
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
              loading="eager"
              onError={(e) => {
                if (e.currentTarget.src !== "/xegents-logo.png") {
                  e.currentTarget.src = "/xegents-logo.png"
                }
              }}
            />
          </div>
        </div>

        {/* Minimal progress line */}
        <div className="w-32 h-px bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-foreground/40"
            style={{
              animation: "progressClean 1.8s ease-in-out forwards",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes logoReveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progressClean {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
