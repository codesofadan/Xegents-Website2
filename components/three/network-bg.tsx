"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number; y: number
  // constant base velocity — never decays
  bvx: number; bvy: number
  // temporary mouse-repel force — decays
  fx: number; fy: number
  radius: number
  opacity: number
  hue: number
  pulse: number
  pulseSpeed: number
}

const COUNT  = 340
const MR     = 130    // mouse repel radius
const REPEL  = 0.5

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    canvas.width  = W
    canvas.height = H

    const mouse = { x: -9999, y: -9999 }

    const spawn = (): Particle => {
      // Give each particle a random constant direction + speed
      const angle = Math.random() * Math.PI * 2
      const speed = 0.25 + Math.random() * 0.45
      return {
        x:          Math.random() * W,
        y:          Math.random() * H,
        bvx:        Math.cos(angle) * speed,
        bvy:        Math.sin(angle) * speed,
        fx: 0, fy: 0,
        radius:     1.5 + Math.random() * 3.5,
        opacity:    0.22 + Math.random() * 0.45,
        hue:        265 + Math.random() * 40,
        pulse:      Math.random() * Math.PI * 2,
        pulseSpeed: 0.006 + Math.random() * 0.012,
      }
    }

    const particles: Particle[] = Array.from({ length: COUNT }, spawn)

    const onMove  = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    window.addEventListener("mousemove",  onMove,   { passive: true })
    window.addEventListener("mouseleave", onLeave)

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W; canvas.height = H
    }
    window.addEventListener("resize", onResize, { passive: true })

    let frameId: number

    const draw = () => {
      frameId = requestAnimationFrame(draw)

      ctx.fillStyle = "rgb(7,4,15)"
      ctx.fillRect(0, 0, W, H)

      // Ambient blob for depth
      const blob = ctx.createRadialGradient(W * 0.75, H * 0.18, 0, W * 0.75, H * 0.18, W * 0.5)
      blob.addColorStop(0,   "rgba(90,35,180,0.07)")
      blob.addColorStop(0.6, "rgba(60,20,140,0.03)")
      blob.addColorStop(1,   "rgba(0,0,0,0)")
      ctx.fillStyle = blob
      ctx.fillRect(0, 0, W, H)

      for (const p of particles) {
        // Pulse
        p.pulse += p.pulseSpeed
        const alpha = p.opacity * (0.72 + 0.28 * Math.sin(p.pulse))

        // Mouse repel — adds to temporary force
        const dx   = p.x - mouse.x
        const dy   = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MR && dist > 0) {
          const f = (1 - dist / MR) * REPEL
          p.fx += (dx / dist) * f
          p.fy += (dy / dist) * f
        }

        // Decay only the temporary force, base velocity stays constant
        p.fx *= 0.90
        p.fy *= 0.90

        // Move: constant drift + temporary repel
        p.x += p.bvx + p.fx
        p.y += p.bvy + p.fy

        // Wrap around edges
        if (p.x < -40) p.x = W + 40
        if (p.x > W + 40) p.x = -40
        if (p.y < -40) p.y = H + 40
        if (p.y > H + 40) p.y = -40

        const glowR = p.radius * 5

        // Outer glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR)
        g.addColorStop(0,    `hsla(${p.hue},85%,62%,${alpha})`)
        g.addColorStop(0.35, `hsla(${p.hue},80%,50%,${alpha * 0.3})`)
        g.addColorStop(1,    `hsla(${p.hue},70%,40%,0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()

        // Crisp core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 0.55, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},90%,82%,${alpha})`
        ctx.fill()
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("mousemove",  onMove)
      window.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("resize",     onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}
