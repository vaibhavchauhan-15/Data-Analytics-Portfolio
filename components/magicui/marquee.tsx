'use client'

import { cn } from '@/lib/utils'
import { useInViewport } from '@/lib/hooks/useInViewport'
import { usePerformance } from '@/components/providers/PerformanceProvider'
import type { ComponentPropsWithoutRef } from 'react'

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  // Two copies is enough to cover the viewport and hand off seamlessly; the
  // original template's 4 quadrupled the DOM and paint area for no benefit.
  repeat = 2,
  ...props
}: MarqueeProps) {
  const [ref, inView] = useInViewport<HTMLDivElement>()
  const { motionLevel, detected } = usePerformance()

  // On the lowest tier / reduced motion, render a single non-animated copy. This
  // halves the DOM and drops the infinite compositor loop entirely (the CSS layer
  // also freezes `.animate-marquee`, but this avoids the duplicate nodes too).
  const staticMode = detected && motionLevel === 'none'
  const copies = staticMode ? 1 : repeat

  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className
      )}
    >
      {Array.from({ length: copies }).map((_, i) => (
        <div
          key={i}
          // Pause the CSS animation entirely while scrolled offscreen so the
          // compositor isn't ticking translateX forever. Only set the inline
          // value when paused, so `group-hover` pause still wins when visible.
          style={inView || staticMode ? undefined : { animationPlayState: 'paused' }}
          className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
            'flex-row': !vertical,
            'flex-col': vertical,
            // Only attach the infinite animation when not in static mode.
            'animate-marquee': !vertical && !staticMode,
            'animate-marquee-vertical': vertical && !staticMode,
            'group-hover:[animation-play-state:paused]': pauseOnHover && !staticMode,
            '[animation-direction:reverse]': reverse && !staticMode,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
