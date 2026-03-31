"use client"

import { useMemo } from "react"

export function AnimatedStars() {
  // Generate random stars
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes float-stars {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(${Math.random() * 10 - 5}px); opacity: 1; }
        }
        @keyframes fade-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .star-particle {
          animation: float-stars 4s ease-in-out infinite;
        }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-br from-background via-purple-950/20 to-background">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-purple-800/5 to-purple-900/10"
          style={{
            animation: "fade-pulse 8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Animated stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-accent/80 star-particle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 3}px rgba(147, 51, 234, 0.6)`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
