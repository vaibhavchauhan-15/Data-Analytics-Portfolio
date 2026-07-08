'use client'

import { useMemo } from 'react'
import { m, type Transition } from 'framer-motion'
import { cn } from '@/lib/utils'

type StaggerFrom = 'first' | 'last' | 'center'

interface Text3DFlipProps {
  children: string
  className?: string
  textClassName?: string
  flipTextClassName?: string
  rotateDirection?: 'top' | 'bottom' | 'left' | 'right'
  staggerDuration?: number
  staggerFrom?: StaggerFrom
  transition?: Transition
}

const AXIS: Record<string, { axis: 'X' | 'Y'; sign: number }> = {
  top: { axis: 'X', sign: 1 },
  bottom: { axis: 'X', sign: -1 },
  left: { axis: 'Y', sign: -1 },
  right: { axis: 'Y', sign: 1 },
}

export default function Text3DFlip({
  children,
  className,
  textClassName,
  flipTextClassName,
  rotateDirection = 'top',
  staggerDuration = 0.03,
  staggerFrom = 'first',
  transition = { type: 'spring', damping: 25, stiffness: 160 },
}: Text3DFlipProps) {
  const letters = useMemo(() => children.split(''), [children])
  const { axis, sign } = AXIS[rotateDirection] ?? AXIS.top

  const delayFor = (i: number) => {
    if (staggerFrom === 'last') return (letters.length - 1 - i) * staggerDuration
    if (staggerFrom === 'center') {
      const mid = (letters.length - 1) / 2
      return Math.abs(i - mid) * staggerDuration
    }
    return i * staggerDuration
  }

  return (
    <span
      className={cn('group inline-flex flex-wrap [perspective:600px]', className)}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          className="relative inline-block [transform-style:preserve-3d]"
          aria-hidden="true"
        >
          {/* Front face */}
          <m.span
            className={cn('inline-block [backface-visibility:hidden]', textClassName)}
            initial={{ rotateX: 0, rotateY: 0 }}
            whileInView={{
              [`rotate${axis}`]: sign * 360,
            }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ ...transition, delay: delayFor(i) }}
          >
            {letter === ' ' ? ' ' : letter}
          </m.span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
      {/* flipTextClassName kept for API compatibility */}
      <span className={cn('hidden', flipTextClassName)} aria-hidden="true" />
    </span>
  )
}
