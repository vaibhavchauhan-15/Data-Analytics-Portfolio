'use client'

import { useCallback, useEffect, useRef } from 'react'
import { cn, prefersReducedMotion } from '@/lib/utils'
import { usePerformance } from '@/components/providers/PerformanceProvider'

const morphTime = 1.5
const cooldownTime = 0.5

const useMorphingText = (texts: string[], staticMode: boolean) => {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current]
      if (!current1 || !current2) return

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      const invertedFraction = 1 - fraction
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

      current1.textContent = texts[textIndexRef.current % texts.length]
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length]
    },
    [texts]
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / morphTime
    if (fraction > 1) {
      cooldownRef.current = cooldownTime
      fraction = 1
    }
    setStyles(fraction)
    if (fraction === 1) {
      textIndexRef.current++
    }
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const [current1, current2] = [text1Ref.current, text2Ref.current]
    if (current1 && current2) {
      current2.style.filter = 'none'
      current2.style.opacity = '100%'
      current1.style.filter = 'none'
      current1.style.opacity = '0%'
    }
  }, [])

  useEffect(() => {
    // Skip the expensive blur+opacity rAF loop on the lowest tier as well as for
    // reduced-motion users — the SVG-threshold blur is the priciest paint here.
    if (staticMode || prefersReducedMotion()) {
      // Static: show the first text, no animation.
      if (text1Ref.current) {
        text1Ref.current.textContent = texts[0]
        text1Ref.current.style.opacity = '100%'
        text1Ref.current.style.filter = 'none'
      }
      if (text2Ref.current) text2Ref.current.style.opacity = '0%'
      return
    }

    let animationFrameId = 0
    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate)
      const dt = timeRef.current ? (now - timeRef.current) / 1000 : 0
      timeRef.current = now

      cooldownRef.current -= dt
      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }

    // The morph is an infinite blur+opacity rAF loop — the single most expensive
    // per-frame paint on the page. Only run it while the text is on screen.
    const start = () => {
      if (animationFrameId) return
      timeRef.current = 0 // reset dt so re-entering doesn't jump
      animationFrameId = requestAnimationFrame(animate)
    }
    const stop = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = 0
    }

    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      start()
      return () => stop()
    }
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: '100px' }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      stop()
    }
  }, [doMorph, doCooldown, texts, staticMode])

  return { containerRef, text1Ref, text2Ref }
}

interface MorphingTextProps {
  texts: string[]
  className?: string
}

export function MorphingText({ texts, className }: MorphingTextProps) {
  const { motionLevel, detected } = usePerformance()
  const { containerRef, text1Ref, text2Ref } = useMorphingText(
    texts,
    detected && motionLevel === 'none'
  )
  return (
    <div
      ref={containerRef}
      className={cn(
        'relative mx-auto h-16 w-full max-w-screen-md text-center font-sans text-[40pt] font-bold leading-none [filter:url(#morph-threshold)] md:h-24 lg:text-[6rem]',
        className
      )}
    >
      <span
        ref={text1Ref}
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
      />
      <span
        ref={text2Ref}
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
      />
      <svg
        id="morph-svg-filter"
        className="fixed h-0 w-0"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="morph-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
