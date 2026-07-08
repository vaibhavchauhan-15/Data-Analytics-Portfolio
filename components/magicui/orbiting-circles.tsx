import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

export interface OrbitingCirclesProps {
  className?: string
  children?: ReactNode
  reverse?: boolean
  duration?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
  /** Freeze the orbit (e.g. when scrolled offscreen or on the hidden breakpoint). */
  paused?: boolean
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  paused = false,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const items = Array.isArray(children) ? children : [children]

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-border-subtle/60 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {items.map((child, index) => {
        const angle = (360 / items.length) * index
        return (
          <div
            key={index}
            style={
              {
                '--duration': calculatedDuration,
                '--radius': radius,
                '--angle': angle,
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                animationPlayState: paused ? 'paused' : undefined,
              } as React.CSSProperties
            }
            className={cn(
              'absolute left-1/2 top-1/2 -ml-[calc(var(--icon-size,30px)/2)] -mt-[calc(var(--icon-size,30px)/2)] flex transform-gpu animate-orbit items-center justify-center rounded-full',
              { '[animation-direction:reverse]': reverse },
              className
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
