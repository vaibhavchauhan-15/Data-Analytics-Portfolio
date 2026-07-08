'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, registerGsap } from '@/lib/gsap'
import { usePerformance } from '@/components/providers/PerformanceProvider'

/**
 * Initializes Lenis smooth scrolling and connects it to the GSAP ticker so
 * ScrollTrigger stays in sync. Gated on the performance tier: skipped entirely on
 * low-end / reduced-motion devices (native scroll), and given a shorter, cheaper
 * glide on mid tiers.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { allowSmoothScroll, tier, detected } = usePerformance()

  useEffect(() => {
    registerGsap()

    // Wait for classification before deciding; skip on unsupported tiers so those
    // visitors get the browser's native (cheaper) inertial scroll.
    if (!detected || !allowSmoothScroll) return

    const lenis = new Lenis({
      // Duration + exponential ease-out gives the long, buttery glide people mean
      // by "super smooth". Lenis integrates this frame-rate independently, so it
      // stays consistent on 60Hz and 120Hz+ displays. Shorten it on Tier 3 to cut
      // the number of interpolated frames per wheel tick.
      duration: tier >= 3 ? 0.9 : 1.2,
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
  }, [detected, allowSmoothScroll, tier])

  return <>{children}</>
}
