'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, registerGsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'

/**
 * Initializes Lenis smooth scrolling and connects it to the GSAP ticker so
 * ScrollTrigger stays in sync. Disabled when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsap()

    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      // Duration + exponential ease-out gives the long, buttery glide people mean
      // by "super smooth". Lenis integrates this frame-rate independently, so it
      // stays consistent on 60Hz and 120Hz+ displays.
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      orientation: 'vertical',
      smoothWheel: true,
      // Native inertial scrolling already feels great on touch; leave it alone.
      syncTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Allow in-page anchor links to use Lenis for smooth navigation.
    const handleAnchor = (e: Event) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]')
      if (!target) return
      const href = target.getAttribute('href')
      if (!href || href === '#') return
      const el = document.querySelector(href)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -80 })
      }
    }
    document.addEventListener('click', handleAnchor)

    return () => {
      document.removeEventListener('click', handleAnchor)
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
