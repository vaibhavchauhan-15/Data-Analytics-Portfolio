'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

/** Mono eyebrow label like `// 02. ABOUT`. Reveals on scroll into view. */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'section-label inline-block font-mono text-xs font-semibold uppercase tracking-wider text-accent-primary',
        className
      )}
    >
      {children}
    </motion.span>
  )
}
