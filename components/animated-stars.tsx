"use client"

export function AnimatedStars() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Subtle grain texture overlay for premium feel */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Very subtle top-to-bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/[0.02] via-transparent to-foreground/[0.01]" />
    </div>
  )
}
