'use client'

import { m, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePerformance } from '@/components/providers/PerformanceProvider'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'article' | 'section' | 'span'
}

/** Generic fade-up on scroll into view. Honors reduced motion and drops to a
 *  static element on the lowest tier (motionLevel === 'none'). Uses the `m`
 *  component so it rides the LazyMotion feature bundle. */
export function Reveal({ children, delay = 0, y = 30, className, as = 'div' }: RevealProps) {
  const { motionLevel, detected } = usePerformance()

  if (detected && motionLevel === 'none') {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = m[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}
