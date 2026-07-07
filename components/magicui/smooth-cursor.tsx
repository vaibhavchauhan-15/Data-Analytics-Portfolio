'use client'

import { useEffect, useRef, useState, type JSX } from 'react'
import {
  motion,
  useSpring,
  type SpringOptions,
} from 'framer-motion'
import { prefersReducedMotion } from '@/lib/utils'

interface Position {
  x: number
  y: number
}

interface SmoothCursorProps {
  cursor?: JSX.Element
  springConfig?: SpringOptions
}

function DefaultCursorSVG() {
  return (
    <svg
      width="22"
      height="26"
      viewBox="0 0 50 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))' }}
    >
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8322 10.4125 44.1263L24.3757 38.8804C24.8829 38.6885 25.4385 38.6885 25.9422 38.8804L39.8121 44.1263C41.6849 44.8322 43.4884 42.9759 42.6817 41.1495Z"
        fill="var(--accent-primary)"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 8.03488 46.1382 10.803 45.077L24.7662 39.8311C25.0679 39.7169 25.3999 39.7169 25.7016 39.8311L39.5715 45.077C42.3661 46.1444 45.0808 43.4322 43.7146 40.6933Z"
        stroke="white"
        strokeOpacity="0.85"
        strokeWidth="2.25825"
      />
    </svg>
  )
}

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 },
}: SmoothCursorProps) {
  const [enabled, setEnabled] = useState(false)
  // Hide the custom cursor over regions that opt back into the native cursor
  // (e.g. the interactive Spline hero), so drag/orbit feels natural there.
  const [hidden, setHidden] = useState(false)
  const overNative = useRef(false)
  const lastMousePos = useRef<Position>({ x: 0, y: 0 })
  const velocity = useRef<Position>({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)
  const previousAngle = useRef(0)
  const accumulatedRotation = useRef(0)

  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const rotation = useSpring(0, { ...springConfig, damping: 60, stiffness: 300 })
  const scale = useSpring(1, { ...springConfig, stiffness: 500, damping: 35 })

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer || prefersReducedMotion()) return
    setEnabled(true)
    document.body.style.cursor = 'none'

    let rafId: number | null = null

    const updateVelocity = (currentPos: Position) => {
      const now = performance.now()
      const dt = now - lastUpdateTime.current
      if (dt > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / dt,
          y: (currentPos.y - lastMousePos.current.y) / dt,
        }
      }
      lastUpdateTime.current = now
      lastMousePos.current = currentPos
    }

    const smoothMouseMove = (e: MouseEvent) => {
      const currentPos = { x: e.clientX, y: e.clientY }
      updateVelocity(currentPos)

      const speed = Math.hypot(velocity.current.x, velocity.current.y)
      cursorX.set(currentPos.x)
      cursorY.set(currentPos.y)

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90
        let angleDiff = currentAngle - previousAngle.current
        if (angleDiff > 180) angleDiff -= 360
        if (angleDiff < -180) angleDiff += 360
        accumulatedRotation.current += angleDiff
        rotation.set(accumulatedRotation.current)
        previousAngle.current = currentAngle
        scale.set(0.95)

        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => {
          scale.set(1)
        })
      }
    }

    let throttle: number | null = null
    const throttled = (e: MouseEvent) => {
      // Yield to the OS cursor while over a `[data-native-cursor]` region.
      const onNative = !!(e.target as HTMLElement | null)?.closest?.(
        '[data-native-cursor]'
      )
      if (onNative !== overNative.current) {
        overNative.current = onNative
        document.body.style.cursor = onNative ? '' : 'none'
        setHidden(onNative)
      }

      if (throttle) return
      throttle = requestAnimationFrame(() => {
        smoothMouseMove(e)
        throttle = null
      })
    }

    window.addEventListener('mousemove', throttled, { passive: true })

    return () => {
      window.removeEventListener('mousemove', throttled)
      document.body.style.cursor = 'auto'
      if (rafId) cancelAnimationFrame(rafId)
      if (throttle) cancelAnimationFrame(throttle)
    }
  }, [cursorX, cursorY, rotation, scale])

  if (!enabled) return null

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        translateX: cursorX,
        translateY: cursorY,
        rotate: rotation,
        scale,
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform',
        opacity: hidden ? 0 : 1,
        transition: 'opacity 0.15s ease',
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div style={{ transform: 'translate(-50%, -50%)' }}>{cursor}</div>
    </motion.div>
  )
}
