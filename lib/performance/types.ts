/**
 * Shared types for the adaptive rendering engine.
 *
 * A single `DeviceProfile` is computed once on the client, classified into a
 * performance `Tier`, and handed to every component through context so the whole
 * site scales its visual complexity to the device instead of each component
 * guessing independently.
 */

/** 0 = Ultra High End … 4 = Ultra Low. Lower number = more visual budget. */
export type Tier = 0 | 1 | 2 | 3 | 4

/** How much animation a component is allowed to run. */
export type MotionLevel = 'full' | 'reduced' | 'none'

export type GpuTier = 'high' | 'mid' | 'low' | 'unknown'

/** Raw capability signals read straight off the platform (no policy applied). */
export interface DeviceSignals {
  /** navigator.hardwareConcurrency, or 4 when unknown. */
  cores: number
  /** navigator.deviceMemory in GB, or 0 when unknown. */
  memory: number
  /** Unmasked WebGL renderer string, or '' when unavailable. */
  gpu: string
  gpuTier: GpuTier
  webgl: boolean
  webgpu: boolean
  /** Estimated display refresh rate in Hz (60 until measured). */
  refreshRate: number
  /** navigator.connection.effectiveType, or 'unknown'. */
  effectiveType: string
  saveData: boolean
  reducedMotion: boolean
  reducedTransparency: boolean
  finePointer: boolean
  hover: boolean
  touch: boolean
  os: 'windows' | 'macos' | 'ios' | 'android' | 'linux' | 'unknown'
  browser: 'chrome' | 'safari' | 'firefox' | 'edge' | 'samsung' | 'unknown'
  viewportWidth: number
}

/** Policy flags derived from the tier + signals; what each subsystem may do. */
export interface CapabilityFlags {
  /** Custom cursor + follow-glow layers. */
  allowCursor: boolean
  /** backdrop-filter / blur() surfaces (else fall back to solid gradients). */
  allowBlur: boolean
  /** Lenis smooth scroll (else native inertial scroll). */
  allowSmoothScroll: boolean
  motionLevel: MotionLevel
  /** Adaptive particle budget for any point-cloud effect. */
  particleCount: number
}

export interface DeviceProfile extends DeviceSignals, CapabilityFlags {
  tier: Tier
  /** false while serving the SSR/default profile; true once client-detected. */
  detected: boolean
}

export interface PerfContextValue {
  profile: DeviceProfile
}
