'use client'

import { useEffect, useRef, useState } from 'react'

interface Options {
  /** Grow the observed box so animations spin up just before they scroll in
   *  and wind down shortly after they leave. Smoother than gating at the edge. */
  rootMargin?: string
  /** Value returned before the observer reports (or when IO is unavailable). */
  initial?: boolean
}

/**
 * Reports whether the referenced element is in (or near) the viewport.
 *
 * The single biggest scroll cost on this page came from infinite animations
 * (marquees, orbits, morph/shimmer rAF loops) that kept running while parked
 * offscreen. Gate those on this hook and pause when it returns false.
 *
 * SSR-safe: returns `initial` on the server and until the observer fires.
 */
export function useInViewport<T extends HTMLElement = HTMLDivElement>({
  rootMargin = '200px',
  initial = false,
}: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(initial)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return [ref, inView] as const
}

/** SSR-safe media-query subscription. Returns false until mounted. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
