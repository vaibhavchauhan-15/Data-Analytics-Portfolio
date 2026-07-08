/**
 * Platform capability detection. Every function here is SSR-safe (guards
 * `window`/`navigator`) and side-effect free apart from the throwaway canvas used
 * to sniff the GPU. Detection runs once, after mount, inside PerformanceProvider.
 */

import type { DeviceSignals, GpuTier } from './types'

/** Read the unmasked WebGL renderer string via a short-lived context. */
function readGpu(): { gpu: string; gpuTier: GpuTier; webgl: boolean } {
  if (typeof document === 'undefined') return { gpu: '', gpuTier: 'unknown', webgl: false }
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return { gpu: '', gpuTier: 'unknown', webgl: false }

    const dbg = gl.getExtension('WEBGL_debug_renderer_info')
    const raw = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : ''
    const g = raw.toLowerCase()

    let gpuTier: GpuTier = 'unknown'
    if (g) {
      // Software rasterizers → treat as the floor.
      if (/swiftshader|llvmpipe|software|microsoft basic/.test(g)) gpuTier = 'low'
      // Discrete / modern integrated → high.
      else if (/nvidia|geforce|rtx|radeon|rx \d|apple m\d|apple gpu|adreno (6|7|8)|mali-g7|iris xe/.test(g))
        gpuTier = 'high'
      // Older mobile / low-power integrated → low.
      else if (/adreno (3|4|5)|mali-[gt][0-5]|powervr|intel hd|uhd graphics 6/.test(g))
        gpuTier = 'low'
      else gpuTier = 'mid'
    }
    // Release the context promptly instead of waiting for GC.
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return { gpu: raw, gpuTier, webgl: true }
  } catch {
    return { gpu: '', gpuTier: 'unknown', webgl: false }
  }
}

function detectOsBrowser(): Pick<DeviceSignals, 'os' | 'browser'> {
  if (typeof navigator === 'undefined') return { os: 'unknown', browser: 'unknown' }
  const ua = navigator.userAgent
  const u = ua.toLowerCase()

  let os: DeviceSignals['os'] = 'unknown'
  if (/iphone|ipad|ipod/.test(u) || (u.includes('mac') && 'ontouchend' in document)) os = 'ios'
  else if (u.includes('android')) os = 'android'
  else if (u.includes('win')) os = 'windows'
  else if (u.includes('mac')) os = 'macos'
  else if (u.includes('linux')) os = 'linux'

  let browser: DeviceSignals['browser'] = 'unknown'
  if (u.includes('samsungbrowser')) browser = 'samsung'
  else if (u.includes('edg/')) browser = 'edge'
  else if (u.includes('firefox') || u.includes('fxios')) browser = 'firefox'
  else if (u.includes('chrome') || u.includes('crios')) browser = 'chrome'
  else if (u.includes('safari')) browser = 'safari'

  return { os, browser }
}

function mq(query: string): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(query).matches
}

/** Synchronously gather every capability signal available at call time. */
export function detectSignals(): DeviceSignals {
  const nav = typeof navigator !== 'undefined' ? navigator : undefined
  const conn = (nav as unknown as { connection?: { effectiveType?: string; saveData?: boolean } })
    ?.connection

  const { gpu, gpuTier, webgl } = readGpu()

  return {
    cores: nav?.hardwareConcurrency ?? 4,
    memory: (nav as unknown as { deviceMemory?: number })?.deviceMemory ?? 0,
    gpu,
    gpuTier,
    webgl,
    webgpu: typeof navigator !== 'undefined' && 'gpu' in navigator,
    refreshRate: 60,
    effectiveType: conn?.effectiveType ?? 'unknown',
    saveData: !!conn?.saveData,
    reducedMotion: mq('(prefers-reduced-motion: reduce)'),
    reducedTransparency: mq('(prefers-reduced-transparency: reduce)'),
    finePointer: mq('(pointer: fine)'),
    hover: mq('(hover: hover)'),
    touch: typeof navigator !== 'undefined' && (navigator.maxTouchPoints ?? 0) > 0,
    ...detectOsBrowser(),
    viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1280,
  }
}

/**
 * Estimate refresh rate by timing a handful of animation frames. Async and
 * best-effort — resolves to 60 if the sample looks unreliable. Used to unlock
 * 120fps-class targets on high-refresh displays.
 */
export function measureRefreshRate(): Promise<number> {
  return new Promise((resolve) => {
    if (typeof requestAnimationFrame === 'undefined') return resolve(60)
    const samples: number[] = []
    let last = 0
    let frames = 0
    const tick = (t: number) => {
      if (last) samples.push(t - last)
      last = t
      if (++frames < 12) {
        requestAnimationFrame(tick)
        return
      }
      samples.sort((a, b) => a - b)
      const median = samples[Math.floor(samples.length / 2)] || 16.7
      const hz = Math.round(1000 / median)
      // Snap to the common panel rates so noise doesn't report 118 or 63.
      const snapped = [60, 75, 90, 120, 144, 165, 240].reduce((best, r) =>
        Math.abs(r - hz) < Math.abs(best - hz) ? r : best
      )
      resolve(snapped)
    }
    requestAnimationFrame(tick)
  })
}
