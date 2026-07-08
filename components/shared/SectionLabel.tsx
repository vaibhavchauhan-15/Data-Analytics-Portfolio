'use client'

import { m } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePerformance } from '@/components/providers/PerformanceProvider'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

const LABEL_CLASS =
  'section-label inline-block font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary'

/** Mono eyebrow label like `// 02. ABOUT`. Reveals on scroll into view; static on
 *  the lowest tier / reduced motion. */
export function SectionLabel({ children, className }: SectionLabelProps) {
  const { motionLevel, detected } = usePerformance()

  if (detected && motionLevel === 'none') {
    return <span className={cn(LABEL_CLASS, className)}>{children}</span>
  }

  return (
    <m.span
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(LABEL_CLASS, className)}
    >
      {children}
    </m.span>
  )
}
