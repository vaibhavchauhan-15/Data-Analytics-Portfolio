'use client'

import type { CSSProperties, ComponentPropsWithoutRef, FC } from 'react'
import { cn } from '@/lib/utils'
import { useInViewport } from '@/lib/hooks/useInViewport'

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<'span'> {
  shimmerWidth?: number
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  const [ref, inView] = useInViewport<HTMLSpanElement>()

  return (
    <span
      ref={ref}
      style={
        {
          '--shiny-width': `${shimmerWidth}px`,
          // Animating `background-position` forces a repaint every frame — pause
          // it while offscreen instead of shimmering into an empty viewport.
          animationPlayState: inView ? undefined : 'paused',
        } as CSSProperties
      }
      className={cn(
        'mx-auto max-w-md text-text-secondary',
        // Shine effect
        'animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]',
        // Shine gradient — neon accent sweep, in-theme
        'bg-gradient-to-r from-transparent via-accent-primary/90 via-50% to-transparent',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
