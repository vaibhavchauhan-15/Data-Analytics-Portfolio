'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, SunDim } from 'lucide-react'
import { flushSync } from 'react-dom'
import { cn } from '@/lib/utils'

const DURATION = 450

interface AnimatedThemeTogglerProps {
  className?: string
}

/**
 * Circular View-Transitions theme toggle.
 *
 * The switch is driven entirely by the View Transitions API: the browser
 * snapshots the old + new theme as GPU bitmaps and we animate a single
 * `clip-path` circle on the compositor. That means the reveal stays at 60fps
 * no matter how heavy the page is (Three.js / Spline / GSAP), and no per-element
 * color transitions run underneath (see `disableTransitionOnChange` in the
 * ThemeProvider). Falls back to an instant swap when VT / reduced-motion apply.
 */
export function AnimatedThemeToggler({ className }: AnimatedThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  const toggle = useCallback(() => {
    const button = buttonRef.current
    const next = isDark ? 'light' : 'dark'

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // No VT support / reduced motion → just swap instantly.
    if (
      !button ||
      prefersReducedMotion ||
      typeof document.startViewTransition !== 'function'
    ) {
      setTheme(next)
      return
    }

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next))
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: DURATION,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }, [isDark, setTheme])

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        'grid h-full w-full place-items-center text-text-secondary transition-colors hover:text-text-primary',
        className
      )}
    >
      {mounted ? (
        isDark ? (
          <SunDim className="h-[18px] w-[18px]" aria-hidden="true" />
        ) : (
          <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
        )
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  )
}
