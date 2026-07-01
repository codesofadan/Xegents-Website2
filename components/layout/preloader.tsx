"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LETTERS = ["X", "E", "G", "E", "N", "T", "S"]

const SCATTER = LETTERS.map((_, i) => ({
  x: [-280, 180, -160, 320, -240, 200, -300][i],
  y: [-200, -160, 220, 140, -180, 240, -120][i],
  r: [-90, 60, -120, 80, 110, -70, 100][i],
}))

export function Preloader() {
  const [built,   setBuild]   = useState(0)
  const [scatter, setScatter] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setBuild(i)
      if (i >= LETTERS.length) {
        clearInterval(interval)
        // Hold 1.6s, then scatter, then fade
        setTimeout(() => setScatter(true),  1600)
        setTimeout(() => setVisible(false), 2400) // start 1s slow fade after scatter
      }
    }, 90)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-1">
            {LETTERS.map((letter, idx) => (
              <motion.span
                key={idx}
                className="text-5xl sm:text-7xl font-black tracking-tighter select-none"
                initial={{ opacity: 0, y: 24 }}
                animate={
                  scatter
                    ? { opacity: 0, x: SCATTER[idx].x, y: SCATTER[idx].y, rotate: SCATTER[idx].r, scale: 0.2 }
                    : idx < built
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 24 }
                }
                transition={
                  scatter
                    ? { duration: 0.65, ease: [0.55, 0, 1, 0.45], delay: idx * 0.025 }
                    : { duration: 0.28, ease: "easeOut" }
                }
                style={{ color: idx === 0 ? "rgb(147,51,234)" : "white" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="mt-7 h-px bg-accent/50 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: scatter ? 160 : (built / LETTERS.length) * 160 }}
            transition={{ duration: 0.12 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
