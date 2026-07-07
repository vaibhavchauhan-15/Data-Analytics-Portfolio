'use client'

import { useEffect, useMemo, useRef, useState, ElementType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn, prefersReducedMotion } from '@/lib/utils'

type CharacterSet = string[] | readonly string[]

interface HyperTextProps {
  children: string
  className?: string
  duration?: number
  delay?: number
  as?: ElementType
  startOnView?: boolean
  animateOnHover?: boolean
  characterSet?: CharacterSet
}

const DEFAULT_CHARACTER_SET: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const getRandomInt = (max: number): number => Math.floor(Math.random() * max)

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = 'div',
  startOnView = true,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}: HyperTextProps) {
  const MotionComponent = useMemo(
    () => motion(Component as ElementType),
    [Component]
  )

  const [displayText, setDisplayText] = useState<string[]>(() => children.split(''))
  const [isAnimating, setIsAnimating] = useState(false)
  const iterationCount = useRef(0)
  const elementRef = useRef<HTMLElement>(null)

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating && !prefersReducedMotion()) {
      iterationCount.current = 0
      setIsAnimating(true)
    }
  }

  // Kick off animation on view / mount
  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!startOnView) {
      const timeout = setTimeout(() => setIsAnimating(true), delay)
      return () => clearTimeout(timeout)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsAnimating(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '-30% 0px -30% 0px' }
    )
    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [delay, startOnView])

  // Scramble loop
  useEffect(() => {
    if (!isAnimating) return
    const maxIterations = children.length
    const startTime = performance.now()
    let animationFrameId: number

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      setDisplayText((currentText) =>
        currentText.map((letter, index) =>
          letter === ' '
            ? letter
            : index <= progress * maxIterations
              ? children[index]
              : characterSet[getRandomInt(characterSet.length)]
        )
      )

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [children, duration, isAnimating, characterSet])

  return (
    <MotionComponent
      ref={elementRef}
      className={cn('overflow-hidden py-0.5 text-4xl font-bold', className)}
      onMouseEnter={handleAnimationTrigger}
      {...props}
    >
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span key={index} className={cn('font-mono')}>
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  )
}
