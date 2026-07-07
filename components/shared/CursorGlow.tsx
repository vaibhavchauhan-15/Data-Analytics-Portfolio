'use client'

import { useEffect, useState } from 'react'

/** Mouse-following radial glow. Desktop + fine-pointer only; respects reduced motion. */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return
    setEnabled(true)

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let glowX = mouseX
    let glowY = mouseY
    let raf = 0
    let running = false

    const el = document.getElementById('cursor-glow')

    const animate = () => {
      glowX += (mouseX - glowX) * 0.12
      glowY += (mouseY - glowY) * 0.12
      if (el) {
        // translate3d keeps this on the compositor (GPU), off the main thread.
        el.style.transform = `translate3d(${glowX - 300}px, ${glowY - 300}px, 0)`
      }

      // Stop looping once the glow has caught up to the cursor. This frees the
      // frame budget during scroll instead of running rAF forever while idle.
      if (Math.abs(mouseX - glowX) < 0.5 && Math.abs(mouseY - glowY) < 0.5) {
        running = false
        return
      }
      raf = requestAnimationFrame(animate)
    }

    const kick = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(animate)
      }
    }

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Fade the glow out over `[data-native-cursor]` regions (e.g. the hero).
      if (el) {
        const onNative = !!(e.target as HTMLElement | null)?.closest?.(
          '[data-native-cursor]'
        )
        el.style.opacity = onNative ? '0' : ''
      }
      kick()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    kick()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null
  return <div id="cursor-glow" aria-hidden="true" />
}
