'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { gsap } from '@/lib/gsap'
import { prefersReducedMotion } from '@/lib/utils'

interface AnimatedCounterProps {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
}

export function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0)
  const hasRun = useRef(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  useEffect(() => {
    if (!inView || hasRun.current) return
    hasRun.current = true

    if (prefersReducedMotion()) {
      setValue(target)
      return
    }

    const obj = { val: 0 }
    const tween = gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => setValue(Math.round(obj.val)),
    })
    return () => {
      tween.kill()
    }
  }, [inView, target, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  )
}
