"use client"

import { useEffect, useRef } from "react"

export function CapacityVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; alpha: number }> = []

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.6 + 0.4,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const funnelTop = canvas.height * 0.15
      const funnelBottom = canvas.height * 0.85
      const topWidth = canvas.width * 0.5
      const bottomWidth = canvas.width * 0.12

      // Gradient funnel
      const gradient = ctx.createLinearGradient(0, funnelTop, 0, funnelBottom)
      gradient.addColorStop(0, "rgba(147, 51, 234, 0.2)")
      gradient.addColorStop(0.5, "rgba(88, 28, 224, 0.25)")
      gradient.addColorStop(1, "rgba(59, 130, 246, 0.15)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo((canvas.width - topWidth) / 2, funnelTop)
      ctx.lineTo((canvas.width + topWidth) / 2, funnelTop)
      ctx.lineTo((canvas.width + bottomWidth) / 2, funnelBottom)
      ctx.lineTo((canvas.width - bottomWidth) / 2, funnelBottom)
      ctx.fill()

      // Funnel border
      ctx.strokeStyle = "rgba(147, 51, 234, 0.5)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo((canvas.width - topWidth) / 2, funnelTop)
      ctx.lineTo((canvas.width + topWidth) / 2, funnelTop)
      ctx.lineTo((canvas.width + bottomWidth) / 2, funnelBottom)
      ctx.lineTo((canvas.width - bottomWidth) / 2, funnelBottom)
      ctx.closePath()
      ctx.stroke()

      // Animate particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.fillStyle = `rgba(147, 51, 234, ${p.alpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()

        // Add glow
        ctx.strokeStyle = `rgba(147, 51, 234, ${p.alpha * 0.5})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius + 2, 0, Math.PI * 2)
        ctx.stroke()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="space-y-4 sm:space-y-6">
      <canvas
        ref={canvasRef}
        className="w-full h-48 sm:h-64 rounded-lg border border-accent/20 animate-in fade-in duration-700"
      />
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: "Input Capacity", value: "100%", color: "from-blue-500" },
          { label: "Process Loss", value: "28%", color: "from-red-500" },
          { label: "Output Delivered", value: "72%", color: "from-green-500" },
        ].map((item) => (
          <div key={item.label} className="p-2 sm:p-3 bg-muted/60 rounded-lg border border-accent/20">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p
              className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${item.color} to-amber-400 bg-clip-text text-transparent`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
