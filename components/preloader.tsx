"use client"

import { useEffect, useState } from "react"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 bg-background z-[999] flex items-center justify-center">
      {/* Simple AI tech-driven background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
        {/* Subtle animated grid lines for tech feel */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(0deg, transparent 24%, rgba(155, 89, 182, .05) 25%, rgba(155, 89, 182, .05) 26%, transparent 27%, transparent 74%, rgba(155, 89, 182, .05) 75%, rgba(155, 89, 182, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(155, 89, 182, .05) 25%, rgba(155, 89, 182, .05) 26%, transparent 27%, transparent 74%, rgba(155, 89, 182, .05) 75%, rgba(155, 89, 182, .05) 76%, transparent 77%, transparent)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* AI Tech Scanner effect */}
        <div className="flex flex-col items-center gap-6">
          {/* Scanning circles */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            {/* Outer scan ring */}
            <div
              className="absolute inset-0 rounded-full border border-primary/60"
              style={{
                animation: "scan 3s linear infinite",
              }}
            ></div>

            {/* Middle scan ring */}
            <div
              className="absolute inset-2 rounded-full border border-accent/40"
              style={{
                animation: "scan 4s linear infinite reverse",
              }}
            ></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/xegents-logo.png"
                alt="Xegents Logo"
                width={60}
                height={60}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                loading="eager"
                onError={(e) => {
                  console.log("[v0] Preloader logo error")
                  if (e.currentTarget.src !== "/xegents-logo.png") {
                    e.currentTarget.src = "/xegents-logo.png"
                  }
                }}
              />
            </div>
          </div>

          {/* Loading text */}
          <div className="text-center space-y-2">
            <p className="text-xs sm:text-sm text-muted-foreground">AI Transformation Loading...</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-40 sm:w-48 h-0.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{
              animation: "progress 2.5s ease-in-out forwards",
            }}
          ></div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes progress {
          0% {
            width: 0;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
