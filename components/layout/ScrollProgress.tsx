'use client'

import { useEffect } from 'react'

export function ScrollProgress() {
  useEffect(() => {
    let raf = 0
    const bar = document.getElementById('scroll-progress')
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0
      if (bar) bar.style.width = `${pct}%`
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <div id="scroll-progress" aria-hidden="true" />
}
