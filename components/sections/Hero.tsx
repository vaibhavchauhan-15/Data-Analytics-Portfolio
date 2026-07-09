'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { Application } from '@splinetool/runtime'

import { KineticText } from '@/components/ui/kinetic-text'
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text'
import { usePerformance } from '@/components/providers/PerformanceProvider'
import { SITE_CONFIG } from '@/lib/config'

// The Spline runtime is a heavy (~1MB+) WebGL bundle. Load it on the client only,
// after the hero has painted, so it never delays the LCP heading or hydration.
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

const SCENE = 'https://prod.spline.design/yGpWjXfQ97agmFQ2/scene.splinecode'

export function Hero() {
  const { allowSpline, detected } = usePerformance()
  const [mountScene, setMountScene] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const appRef = useRef<Application | null>(null)

  useEffect(() => {
    // Wait for device classification, then only download the ~1MB Spline runtime
    // on tiers that can afford it. Low-end / data-saver / reduced-motion visitors
    // get the static gradient poster instead (rendered below when !mountScene).
    if (!detected || !allowSpline) return

    const start = () => setMountScene(true)

    // Defer the runtime until the browser is idle so first paint finishes first.
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 })
      return () => window.cancelIdleCallback?.(id)
    }
    const t = setTimeout(start, 600)
    return () => clearTimeout(t)
  }, [detected, allowSpline])

  // Pause the WebGL render loop whenever the hero is scrolled out of view, and
  // resume it when it returns. Combined with `renderOnDemand`, this keeps the
  // rest of the page buttery — nothing renders in the background.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        const app = appRef.current
        if (!app) return
        if (entry.isIntersecting) app.play()
        else app.stop()
      },
      { threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-native-cursor
      className="relative flex min-h-screen items-end overflow-hidden bg-hero-bg font-sora"
    >
      {/* Interactive 3D Spline model (z-0). The canvas is enlarged and anchored
          toward the top-right (extends ~15% past the top and right edges, which
          `overflow-hidden` clips) so the model shifts up/right and zooms slightly
          — filling the gaps the scene's centered camera would otherwise leave.
          `pointer-events-auto` lets visitors drag / orbit it, while the text
          column above keeps its buttons clickable. `renderOnDemand` only paints
          frames on change (interaction/animation) instead of a constant loop. */}
      {/* Static gradient poster — the graceful fallback when the WebGL scene is
          suppressed (low tier / data-saver / reduced motion). Mirrors the scene's
          accent-lit, top-right-weighted look with a pure-CSS radial gradient, so
          the hero still feels intentional at zero GPU/network cost. */}
      {!mountScene && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-[radial-gradient(120%_100%_at_85%_-10%,rgba(57,255,20,0.28),transparent_55%),radial-gradient(90%_80%_at_100%_0%,rgba(57,255,20,0.12),transparent_60%)]"
        />
      )}

      <div className="pointer-events-auto absolute -bottom-[10%] -left-[140%] -right-0 -top-[15%] z-0 sm:bottom-0 sm:left-0 sm:-right-[15%]">
        {mountScene && (
          <Spline
            scene={SCENE}
            renderOnDemand
            onLoad={(app) => {
              appRef.current = app
              setSceneReady(true)
            }}
            className={`h-full w-full transition-opacity duration-1000 ease-out ${
              sceneReady ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Dark overlay for legibility. `pointer-events-none` so it never blocks
          interaction with the Spline model beneath it. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />

      {/* Content — anchored bottom-left, on the top layer above the model. The
          wrapper lets pointer events fall through to the model; only the actual
          interactive children (headings, buttons, badge) re-enable them. */}
      <div className="pointer-events-none relative z-10 w-full max-w-[92%] px-6 pb-28 pt-28 sm:max-w-md sm:pb-12 sm:pt-32 md:px-10 lg:max-w-2xl">
        {/* Kinetic heading — each letter thickens (with a stroke) on hover and
            nudges its neighbours. Uses the variable-axis Sora so the weight
            transition morphs smoothly instead of snapping between instances. */}
        <div
          className="mb-2 animate-fade-up opacity-0 md:mb-4"
          style={{ animationDelay: '0.2s' }}
        >
          <KineticText
            text="Vaibhav"
            className="
  pointer-events-auto
  bg-gradient-to-b
  from-black
  to-gray-300/80
  bg-clip-text
  text-transparent
  dark:from-white
  dark:to-slate-900/10
  text-[clamp(3rem,8vw,6rem)]
  uppercase
  leading-[1.05]
  tracking-[-0.05em]
  whitespace-pre-wrap
  text-center
  [font-family:var(--font-sora-flex)]
  [font-optical-sizing:auto]
"
          />
          <KineticText
            as="span"
            text="Data Analyst"
            className="pointer-events-auto text-[clamp(2rem,6vw,4rem)] uppercase leading-[1.05] tracking-[-0.05em] text-accent-primary [font-family:var(--font-sora-flex)] [font-optical-sizing:auto]"
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
