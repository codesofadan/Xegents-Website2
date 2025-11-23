"use client"

import { useEffect, useRef } from "react"

export function Robot3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / 10
      const y = (e.clientY - rect.top - rect.height / 2) / 10

      container.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`
    }

    const handleMouseLeave = () => {
      container.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }

    window.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center transition-transform duration-100 animate-in fade-in"
      style={{ transformStyle: "preserve-3d" }}
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .robot-head {
          animation: float 3s ease-in-out infinite;
        }
        .robot-eyes {
          animation: blink 2s ease-in-out infinite;
        }
        .robot-body {
          animation: float 2.5s ease-in-out infinite;
        }
        .robot-arm {
          animation: float 2s ease-in-out infinite;
        }
        .robot-leg {
          animation: float 2s ease-in-out infinite;
        }
        .robot-chest {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .robot-light {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        .glow-orb {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 200 320"
        className="w-full h-full max-w-sm"
        style={{ filter: "drop-shadow(0 0 40px rgba(147, 51, 234, 0.4))" }}
      >
        {/* Head */}
        <rect
          x="70"
          y="20"
          width="60"
          height="60"
          fill="none"
          stroke="url(#purpleGradient)"
          strokeWidth="2"
          rx="8"
          className="robot-head"
        />

        {/* Eyes */}
        <circle cx="85" cy="45" r="4" fill="currentColor" className="text-accent robot-eyes" />
        <circle cx="115" cy="45" r="4" fill="currentColor" className="text-accent robot-eyes" />

        {/* Body */}
        <rect
          x="60"
          y="90"
          width="80"
          height="90"
          fill="none"
          stroke="url(#purpleGradient)"
          strokeWidth="2"
          rx="6"
          className="robot-body"
        />

        {/* Left Arm */}
        <line
          x1="60"
          y1="110"
          x2="20"
          y2="140"
          stroke="url(#cyanGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          className="robot-arm"
        />
        <circle cx="20" cy="140" r="6" fill="none" stroke="url(#cyanGradient)" strokeWidth="2" className="robot-arm" />

        {/* Right Arm */}
        <line
          x1="140"
          y1="110"
          x2="180"
          y2="140"
          stroke="url(#cyanGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          className="robot-arm"
          style={{ animationDelay: "0.5s" }}
        />
        <circle
          cx="180"
          cy="140"
          r="6"
          fill="none"
          stroke="url(#cyanGradient)"
          strokeWidth="2"
          className="robot-arm"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Left Leg */}
        <line
          x1="80"
          y1="180"
          x2="70"
          y2="270"
          stroke="url(#purpleGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          className="robot-leg"
        />
        <rect
          x="65"
          y="270"
          width="10"
          height="15"
          fill="none"
          stroke="url(#purpleGradient)"
          strokeWidth="2"
          className="robot-leg"
        />

        {/* Right Leg */}
        <line
          x1="120"
          y1="180"
          x2="130"
          y2="270"
          stroke="url(#purpleGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          className="robot-leg"
          style={{ animationDelay: "0.5s" }}
        />
        <rect
          x="125"
          y="270"
          width="10"
          height="15"
          fill="none"
          stroke="url(#purpleGradient)"
          strokeWidth="2"
          className="robot-leg"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Chest Panel */}
        <rect
          x="80"
          y="110"
          width="40"
          height="40"
          fill="none"
          stroke="url(#cyanGradient)"
          strokeWidth="1.5"
          rx="4"
          className="robot-chest"
        />

        {/* Chest Light */}
        <circle cx="100" cy="130" r="3" fill="currentColor" className="text-secondary robot-light" />

        {/* Gradients */}
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="1" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow orbs */}
      <div className="absolute top-10 right-10 w-20 h-20 rounded-full border border-accent/30 opacity-50 glow-orb" />
      <div
        className="absolute bottom-10 left-5 w-16 h-16 rounded-full border border-primary/30 opacity-40 glow-orb"
        style={{ animationDelay: "0.5s" }}
      />
    </div>
  )
}
