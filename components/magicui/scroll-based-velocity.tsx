'use client'

import React, { useEffect, useRef, useState, ComponentPropsWithoutRef } from 'react'
import {
  m,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface VelocityScrollProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
}

interface ScrollVelocityRowProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode
  baseVelocity: number
  direction?: number
}

export const ScrollVelocityContainer = React.forwardRef<
  HTMLDivElement,
  VelocityScrollProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative w-full text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]', className)}
      {...props}
    >
      {children}
    </div>
  )
})
ScrollVelocityContainer.displayName = 'ScrollVelocityContainer'

export const ScrollVelocityRow = React.forwardRef<
  HTMLDivElement,
  ScrollVelocityRowProps
>(({ children, baseVelocity = 5, direction = 1, className, ...props }, ref) => {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  const [repetitions, setRepetitions] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  // Cheap gate so the rAF loop below does no work while parked offscreen. A ref
  // (not state) avoids re-rendering the row on every enter/leave.
  const inViewRef = useRef(false)

  useEffect(() => {
    let raf = 0
    const calculateRepetitions = () => {
      if (containerRef.current && textRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const textWidth = textRef.current.offsetWidth
        const newRepetitions = Math.ceil(containerWidth / textWidth) + 2
        setRepetitions(newRepetitions)
      }
    }
    // Coalesce resize bursts into one layout read per frame.
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(calculateRepetitions)
    }
    calculateRepetitions()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [children])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`)

  const directionFactor = useRef(direction)
  useAnimationFrame((t, delta) => {
    // Skip the spring read + motion-value write entirely when offscreen.
    if (!inViewRef.current) return
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      ref={containerRef}
      className={cn('w-full overflow-hidden whitespace-nowrap', className)}
      {...props}
    >
      <m.div className="inline-flex" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span key={i} ref={i === 0 ? textRef : null} className="inline-block">
            {children}{' '}
          </span>
        ))}
      </m.div>
    </div>
  )
})
ScrollVelocityRow.displayName = 'ScrollVelocityRow'
