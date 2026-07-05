'use client'

import { useEffect } from 'react'

export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return

    // Cache the scrollable distance so the per-scroll handler never reads
    // layout (scrollHeight forces a reflow). Recompute only on resize/mutation.
    let max = 0
    let ticking = false

    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight
    }

    const render = () => {
      ticking = false
      const pct = max > 0 ? window.scrollY / max : 0
      bar.style.transform = `scaleX(${pct})`
    }

    const onScroll = () => {
      // Coalesce multiple scroll events into one paint per frame.
      if (!ticking) {
        ticking = true
        requestAnimationFrame(render)
      }
    }

    measure()
    render()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', measure)

    // Section reveals change page height as content animates in; keep `max`
    // accurate without polling every frame.
    const ro = new ResizeObserver(measure)
    ro.observe(document.documentElement)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      ro.disconnect()
    }
  }, [])

  return <div id="scroll-progress" aria-hidden="true" />
}
