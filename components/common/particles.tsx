"use client"

import { useMemo } from "react"

export function AnimatedStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.4 + 0.3,
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes float-star {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33%  { transform: translateY(-18px) translateX(6px); }
          66%  { transform: translateY(-8px) translateX(-8px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: var(--star-base-opacity); }
          50%       { opacity: 1; }
        }
      `}</style>

      {/* Subtle purple ambient layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(147,51,234,0.07) 0%, transparent 65%), " +
            "radial-gradient(ellipse 60% 45% at 80% 70%, rgba(168,85,247,0.05) 0%, transparent 60%)",
          animation: "pulse-glow 10s ease-in-out infinite",
        }}
      />

      {/* Particles */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: `rgba(147, 51, 234, ${star.opacity})`,
            boxShadow: `0 0 ${star.size * 4}px ${star.size}px rgba(147, 51, 234, ${star.opacity * 0.5})`,
            animation: `float-star ${star.duration}s ease-in-out infinite, pulse-glow ${star.duration * 0.8}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
