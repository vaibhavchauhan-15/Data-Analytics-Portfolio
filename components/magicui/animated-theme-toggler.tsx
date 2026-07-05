'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, SunDim } from 'lucide-react'
import { flushSync } from 'react-dom'
import { cn } from '@/lib/utils'

type StartViewTransition = (cb: () => void) => { ready: Promise<void> }

interface AnimatedThemeTogglerProps {
  className?: string
}

export function AnimatedThemeToggler({ className }: AnimatedThemeTogglerProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => setMounted(true), [])

  const isDark = theme !== 'light'

  const toggle = async () => {
    const next = isDark ? 'light' : 'dark'
    const doc = document as Document & {
      startViewTransition?: StartViewTransition
    }

    if (!buttonRef.current || !doc.startViewTransition) {
      setTheme(next)
      return
    }

    await doc
      .startViewTransition(() => {
        flushSync(() => setTheme(next))
      })
      .ready

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 550,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }

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
