'use client'

import dynamic from 'next/dynamic'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import type { Application } from '@splinetool/runtime'
import { KineticText } from '@/components/ui/kinetic-text'
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import { SITE_CONFIG } from '@/lib/config'
import { prefersReducedMotion } from '@/lib/utils'


// Spline 3D scene — lazy-loaded, client-only. Falls back to the hero background
// while the runtime + scene download.
const Spline = dynamic(() => import('@splinetool/react-spline/next'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-hero-bg" />,
})

const SPLINE_SCENE = 'https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode'

// Cap the WebGL backing resolution. The scene is exported with an "Auto" pixel
// ratio, so on 2x/3x displays the runtime renders at full devicePixelRatio —
// 4–9x the fragment work of a 1x buffer, which is the main source of hero
// stutter. 1.5 keeps edges crisp while roughly halving GPU load on Hi-DPI.
const CAP_DPR = 1.5

/**
 * The Spline runtime exposes no public pixel-ratio setter, but its internal
 * Three.js renderer does. We walk the loaded app to find that renderer (the one
 * object owning BOTH `setPixelRatio` and a numeric `_pixelRatio`) and cap it.
 *
 * Fully defensive: typed arrays / DOM nodes are skipped, the walk is depth- and
 * step-bounded to stay off the scene's giant object graph, and everything is
 * wrapped so a future runtime shape change degrades to a no-op instead of
 * throwing. The cap is a one-time set — the renderer reads `_pixelRatio` on
 * every resize, so it survives window resizes without re-applying.
 */
function capPixelRatio(app: unknown, cap = CAP_DPR) {
  const target = Math.min(window.devicePixelRatio || 1, cap)
  const seen = new Set<unknown>()
  const queue: unknown[] = [app]
  let steps = 0

  while (queue.length && steps++ < 4000) {
    const node = queue.shift()
    if (
      !node ||
      typeof node !== 'object' ||
      seen.has(node) ||
      ArrayBuffer.isView(node) ||
      node instanceof Node
    ) {
      continue
    }
    seen.add(node)
    const obj = node as Record<string, unknown>

    if (
      typeof obj.setPixelRatio === 'function' &&
      typeof obj._pixelRatio === 'number'
    ) {
      if (obj._pixelRatio > target) {
        try {
          ;(obj.setPixelRatio as (n: number) => void)(target)
        } catch {
          /* best-effort optimization — ignore */
        }
      }
      return
    }

    for (const key in obj) queue.push(obj[key])
  }
}

/**
 * The 3D scene runs its own requestAnimationFrame loop that keeps burning GPU
 * even when it's offscreen or the tab is hidden. We gate it: the loop only runs
 * when the hero is in view AND the tab is visible — otherwise `app.stop()` fully
 * halts rendering. Scrolling the hero out of view stops it; scrolling back
 * resumes without re-downloading the scene.
 *
 * Isolated into its own component (and memoized) so its refs/effects never
 * re-render the static hero copy beside it.
 */
const SplineBackground = memo(function SplineBackground() {
  const appRef = useRef<Application | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useRef(true)
  const tabVisible = useRef(true)
  // Only mount the 3D scene once we've confirmed motion is allowed. Starting
  // false skips the heavy runtime + scene download entirely for reduced-motion
  // users, and defers it a tick for everyone else (it's lazy-loaded anyway).
  const [play, setPlay] = useState(false)

  const sync = useCallback(() => {
    const app = appRef.current
    if (!app) return
    if (inView.current && tabVisible.current) app.play()
    else app.stop()
  }, [])

  const handleLoad = useCallback(
    (app: Application) => {
      appRef.current = app
      capPixelRatio(app)
      sync()
    },
    [sync]
  )

  useEffect(() => {
    if (prefersReducedMotion()) return
    setPlay(true)

    const el = wrapRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting
        sync()
      },
      { threshold: 0 }
    )
    io.observe(el)

    const onVisibility = () => {
      tabVisible.current = document.visibilityState === 'visible'
      sync()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [sync])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      {play && (
        <Spline scene={SPLINE_SCENE} onLoad={handleLoad} className="h-full w-full" />
      )}
    </div>
  )
})

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-end overflow-hidden bg-hero-bg font-sora"
    >
      {/* 3D background — gated to viewport + tab visibility */}
      <SplineBackground />

      {/* Dark overlay for legibility */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />

      {/* Content — anchored bottom-left. pointer-events-none lets clicks reach the
          3D scene; interactive children re-enable pointer events. */}
      <div className="relative z-10 w-full max-w-[90%] px-6 pb-10 pt-32 sm:max-w-md md:px-10 lg:max-w-2xl">
        {/* Kinetic heading — each letter thickens (with a stroke) on hover and
            nudges its neighbours. Uses the variable-axis Sora so the weight
            transition morphs smoothly instead of snapping between instances. */}
        <div
          className="mb-2 animate-fade-up opacity-0 md:mb-4"
          style={{ animationDelay: '0.2s' }}
        >
          <KineticText
            text="Vaibhav"
            className="pointer-events-auto text-[clamp(3rem,8vw,6rem)] uppercase leading-[1.05] tracking-[-0.05em] text-text-primary [font-family:var(--font-sora-flex)] [font-optical-sizing:auto]"
          />
          <KineticText
            as="span"
            text="Data"
            className="pointer-events-auto text-[clamp(3rem,8vw,6rem)] uppercase leading-[1.05] tracking-[-0.05em] text-accent-primary [font-family:var(--font-sora-flex)] [font-optical-sizing:auto]"
          />
        </div>

        <p
          className="mb-3 animate-fade-up text-[clamp(1.125rem,2.5vw,1.875rem)] font-light text-text-primary/80 opacity-0 md:mb-6"
          style={{ animationDelay: '0.4s' }}
        >
          I turn raw data into decisions.
        </p>

        <p
          className="mb-4 animate-fade-up text-[clamp(0.875rem,1.5vw,1.25rem)] font-light text-text-muted opacity-0 md:mb-8"
          style={{ animationDelay: '0.55s' }}
        >
          Power BI dashboards built for clarity. Python pipelines that turn messy data
          into clean, trustworthy tables. SQL and ML systems designed to answer real
          business questions. All of it done right, not just fast.
        </p>

        <div
          className="flex animate-fade-up flex-wrap gap-3 font-bold opacity-0"
          style={{ animationDelay: '0.7s' }}
        >
          <a
            href="#contact"
            className="pointer-events-auto cursor-pointer rounded-sm bg-accent-primary px-6 py-3 text-sm text-accent-foreground transition-all hover:brightness-110 active:scale-[0.97] md:px-8 md:py-4"
          >
            Book a Call
          </a>
          <a
            href="#projects"
            className="pointer-events-auto cursor-pointer rounded-sm bg-white px-6 py-3 text-sm text-[#121212] transition-all hover:brightness-90 active:scale-[0.97] md:px-8 md:py-4"
          >
            My Work
          </a>
        </div>

        <div
          className="mt-4 animate-fade-up opacity-0 md:mt-6"
          style={{ animationDelay: '0.85s' }}
        >
          <div className="pointer-events-auto inline-flex items-center rounded-full border border-border-subtle bg-bg-surface/40 px-4 py-1.5 backdrop-blur transition-colors hover:bg-bg-surface/70">
            <span className="relative mr-2.5 flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-primary" />
            </span>
            <AnimatedShinyText className="text-xs font-medium">
              Open to work · {SITE_CONFIG.location} · Data Analyst
            </AnimatedShinyText>
          </div>
        </div>
      </div>
    </section>
  )
}
