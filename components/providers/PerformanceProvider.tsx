'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { LazyMotion } from 'framer-motion'
import { detectSignals, measureRefreshRate } from '@/lib/performance/detect'
import { createProfile, DEFAULT_PROFILE } from '@/lib/performance/tier'
import type { DeviceProfile, PerfContextValue, Tier } from '@/lib/performance/types'

const PerfContext = createContext<PerfContextValue>({ profile: DEFAULT_PROFILE })

// Code-split the Framer feature bundle into an async chunk loaded after hydration.
const loadMotionFeatures = () =>
  import('@/lib/performance/motionFeatures').then((mod) => mod.default)

/** Dev-only tier override: `?perf=4` in the URL or `localStorage.perfTier`. */
function readOverride(): Tier | undefined {
  if (typeof window === 'undefined') return undefined
  const fromUrl = new URLSearchParams(window.location.search).get('perf')
  const raw = fromUrl ?? window.localStorage.getItem('perfTier')
  if (raw == null) return undefined
  const n = Number(raw)
  return n >= 0 && n <= 4 ? (n as Tier) : undefined
}

/** Reflect the active profile onto <html> so pure-CSS effects can adapt. */
function syncDocument(profile: DeviceProfile) {
  const root = document.documentElement
  root.dataset.perfTier = String(profile.tier)
  root.classList.toggle('perf-no-blur', !profile.allowBlur)
  root.classList.toggle('perf-motion-none', profile.motionLevel === 'none')
  root.classList.toggle('perf-motion-reduced', profile.motionLevel === 'reduced')
}

/**
 * Detects device capability once on the client, classifies it into a tier, and
 * exposes the resulting profile through context. Also wraps the tree in
 * `LazyMotion` so Framer Motion ships only its DOM feature set.
 *
 * SSR renders the conservative DEFAULT_PROFILE; a post-mount effect upgrades to
 * the real profile, so nothing heavy loads before we know the device and there's
 * no hydration mismatch.
 */
export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<DeviceProfile>(DEFAULT_PROFILE)

  useEffect(() => {
    const override = readOverride()
    const signals = detectSignals()
    const detected = createProfile(signals, true, override)
    setProfile(detected)
    syncDocument(detected)

    // Refine refresh rate asynchronously; only re-render if it actually changes.
    let cancelled = false
    measureRefreshRate().then((hz) => {
      if (cancelled || hz === detected.refreshRate) return
      const next = createProfile({ ...signals, refreshRate: hz }, true, override)
      setProfile(next)
      syncDocument(next)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo<PerfContextValue>(() => ({ profile }), [profile])

  return (
    <PerfContext.Provider value={value}>
      <LazyMotion features={loadMotionFeatures} strict={false}>
        {children}
      </LazyMotion>
    </PerfContext.Provider>
  )
}

/** Full performance profile for the current device. */
export function usePerformance(): DeviceProfile {
  return useContext(PerfContext).profile
}

/** Convenience accessor for just the tier (0 = ultra-high … 4 = ultra-low). */
export function useTier(): Tier {
  return useContext(PerfContext).profile.tier
}
