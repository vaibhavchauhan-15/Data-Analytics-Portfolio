import { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface ProgressiveBlurProps {
  className?: string
  /** Which edge the blur intensifies toward. */
  position?: 'bottom' | 'top' | 'left' | 'right'
  /** Size of the blurred band (e.g. "40%", "120px"). */
  height?: string
  /** Number of stacked blur layers — more = smoother gradient. */
  blurLayers?: number
  /** Max blur radius in px applied to the strongest layer. */
  blurIntensity?: number
}

const GRADIENT_DIRECTION: Record<string, string> = {
  bottom: 'to top',
  top: 'to bottom',
  left: 'to right',
  right: 'to left',
}

/**
 * A layered progressive blur that fades content into a soft edge.
 * Pure CSS (backdrop-filter) — no JS, compositor-friendly.
 */
export function ProgressiveBlur({
  className,
  position = 'bottom',
  height = '30%',
  blurLayers = 6,
  blurIntensity = 4,
}: ProgressiveBlurProps) {
  const direction = GRADIENT_DIRECTION[position] ?? GRADIENT_DIRECTION.bottom
  const layers = Math.max(blurLayers, 2)

  const wrapperStyle: CSSProperties = {
    height: position === 'left' || position === 'right' ? '100%' : height,
    width: position === 'top' || position === 'bottom' ? '100%' : height,
    [position]: 0,
  }

  return (
    <div
      className={cn('pointer-events-none absolute z-10', className)}
      style={wrapperStyle}
      aria-hidden="true"
    >
      {Array.from({ length: layers }).map((_, i) => {
        const start = (i / layers) * 100
        const end = ((i + 1) / layers) * 100
        const mid = (start + end) / 2
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${(i + 1) * (blurIntensity / layers)}px)`,
              WebkitBackdropFilter: `blur(${(i + 1) * (blurIntensity / layers)}px)`,
              maskImage: `linear-gradient(${direction}, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${mid}%, rgba(0,0,0,1) ${end}%, rgba(0,0,0,0) ${Math.min(end + 10, 100)}%)`,
              WebkitMaskImage: `linear-gradient(${direction}, rgba(0,0,0,0) ${start}%, rgba(0,0,0,1) ${mid}%, rgba(0,0,0,1) ${end}%, rgba(0,0,0,0) ${Math.min(end + 10, 100)}%)`,
            }}
          />
        )
      })}
    </div>
  )
}
