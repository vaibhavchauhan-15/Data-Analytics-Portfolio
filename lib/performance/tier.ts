/**
 * Turns raw device signals into a performance tier and a set of capability
 * flags. This is the single place where "how good is this device" policy lives —
 * components consume the resulting flags and never re-implement the heuristics.
 */

import type { CapabilityFlags, DeviceProfile, DeviceSignals, MotionLevel, Tier } from './types'

/** Networks on which we refuse to pull heavy assets (video, large images). */
function isSlowNetwork(s: DeviceSignals): boolean {
  return s.saveData || s.effectiveType === 'slow-2g' || s.effectiveType === '2g'
}

/**
 * Weighted score → tier. Higher score = more headroom. Missing signals are
 * treated neutrally so a browser that hides deviceMemory/GPU isn't punished.
 */
function classify(s: DeviceSignals): Tier {
  let score = 0

  // CPU
  if (s.cores >= 8) score += 2
  else if (s.cores >= 4) score += 1
  else score -= 1

  // RAM (0 = unknown → neutral)
  if (s.memory >= 8) score += 2
  else if (s.memory >= 4) score += 1
  else if (s.memory > 0 && s.memory <= 2) score -= 2

  // GPU
  if (s.gpuTier === 'high') score += 2
  else if (s.gpuTier === 'mid') score += 1
  else if (s.gpuTier === 'low') score -= 2
  if (!s.webgl) score -= 2
  if (s.webgpu) score += 1

  // Form factor: small touch screens rarely have thermal headroom for full FX.
  if (s.touch && s.viewportWidth < 768) score -= 1
  if (s.os === 'android' && s.memory > 0 && s.memory < 4) score -= 1

  // Network / data saver forces us down regardless of raw silicon.
  if (isSlowNetwork(s)) score -= 3

  let tier: Tier
  if (score >= 5) tier = 0
  else if (score >= 3) tier = 1
  else if (score >= 1) tier = 2
  else if (score >= -1) tier = 3
  else tier = 4

  // Hard clamp: never claim a high tier on a throttled connection.
  if (isSlowNetwork(s) && tier < 3) tier = 3
  return tier
}

function motionFor(tier: Tier, s: DeviceSignals): MotionLevel {
  if (s.reducedMotion) return 'none'
  if (tier <= 1) return 'full'
  if (tier <= 3) return 'reduced'
  return 'none'
}

const PARTICLES: Record<Tier, number> = { 0: 400, 1: 250, 2: 120, 3: 40, 4: 0 }

/** Derive per-subsystem permissions from the tier and raw signals. */
export function deriveFlags(tier: Tier, s: DeviceSignals): CapabilityFlags {
  const motionLevel = motionFor(tier, s)

  return {
    allowCursor: s.finePointer && s.hover && !s.touch && tier <= 2 && motionLevel !== 'none',
    allowBlur: tier <= 2 && !s.reducedTransparency,
    allowSmoothScroll: tier <= 3 && motionLevel !== 'none',
    motionLevel,
    particleCount: PARTICLES[tier],
  }
}

/**
 * Build the full profile. `overrideTier` (from the dev override) forces a tier
 * while keeping the real hardware signals, so degradation is testable anywhere.
 */
export function createProfile(
  s: DeviceSignals,
  detected: boolean,
  overrideTier?: Tier
): DeviceProfile {
  const tier = overrideTier ?? classify(s)
  return { ...s, ...deriveFlags(tier, s), tier, detected }
}

/**
 * Conservative default used for SSR and the first client render. Assumes a
 * mid-tier device with effects that trigger downloads switched OFF, so nothing
 * heavy ships before detection and there's no hydration mismatch.
 */
export const DEFAULT_PROFILE: DeviceProfile = createProfile(
  {
    cores: 4,
    memory: 0,
    gpu: '',
    gpuTier: 'unknown',
    webgl: false,
    webgpu: false,
    refreshRate: 60,
    effectiveType: 'unknown',
    saveData: false,
    reducedMotion: false,
    reducedTransparency: false,
    finePointer: false,
    hover: false,
    touch: false,
    os: 'unknown',
    browser: 'unknown',
    viewportWidth: 1280,
  },
  false,
  2
)
