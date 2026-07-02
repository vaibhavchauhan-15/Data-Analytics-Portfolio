'use client'

import { useRef, useEffect, type ElementType, type ReactNode } from 'react'
import { gsap, ScrollTrigger, SplitText, EASE, registerGsap } from '@/lib/gsap'
import { prefersReducedMotion, cn } from '@/lib/utils'

interface RevealTextProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

/**
 * Splits its text into words and reveals them upward on scroll into view.
 * Used for all section H2 headings.
 */
export function RevealText({ children, as: Tag = 'h2', className }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
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
  }, [])

  return (
    <Tag ref={ref} data-animate className={cn(className)}>
      {children}
    </Tag>
  )
}
