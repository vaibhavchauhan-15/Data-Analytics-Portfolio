'use client'

import { useRef, useEffect, type ElementType, type ReactNode } from 'react'
import { gsap, ScrollTrigger, SplitText, EASE, registerGsap } from '@/lib/gsap'
import { prefersReducedMotion, cn } from '@/lib/utils'
import { usePerformance } from '@/components/providers/PerformanceProvider'

interface RevealTextProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

/**
 * Splits its text into words and reveals them upward on scroll into view.
 * Used for all section H2 headings. Skips the SplitText + ScrollTrigger work
 * entirely on the lowest tier (motionLevel === 'none') and for reduced motion,
 * rendering the heading statically instead.
 */
export function RevealText({ children, as: Tag = 'h2', className }: RevealTextProps) {
  const { motionLevel, detected } = usePerformance()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion() || (detected && motionLevel === 'none')) {
      el.classList.add('is-ready')
      return
    }

    registerGsap()
    let split: SplitText | null = null
    const ctx = gsap.context(() => {
      el.classList.add('is-ready')
      split = new SplitText(el, { type: 'words', wordsClass: 'reveal-word' })
      gsap.set(split.words, { display: 'inline-block' })
      gsap.fromTo(
        split.words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.04,
          ease: EASE.expo,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      )
    }, el)

    return () => {
      split?.revert()
      ctx.revert()
    }
  }, [detected, motionLevel])

  return (
    <Tag ref={ref} data-animate className={cn(className)}>
      {children}
    </Tag>
  )
}
