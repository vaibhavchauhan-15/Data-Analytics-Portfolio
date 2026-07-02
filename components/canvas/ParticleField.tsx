'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const COLOR = new THREE.Color('#6366F1')

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const { size } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const spread = 8
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread * 1.6
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread
    }
    return arr
  }, [count])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    const pts = ref.current
    if (!pts) return
    // slow orbital drift
    pts.rotation.y += delta * 0.03
    pts.rotation.x += delta * 0.008
    // mouse attraction (damped)
    mouse.current.x += (target.current.x - mouse.current.x) * 0.05
    mouse.current.y += (target.current.y - mouse.current.y) * 0.05
    pts.position.x = mouse.current.x * 0.3
    pts.position.y = -mouse.current.y * 0.3
  })

  void size
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={COLOR}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleField() {
  const [count, setCount] = useState(4000)
  const [visible, setVisible] = useState(true)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCount(window.innerWidth < 768 ? 1200 : 4000)
  }, [])

  // Pause rendering when the hero scrolls offscreen.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      id="particle-canvas"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={[1, 1.75]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Particles count={count} />
      </Canvas>
    </div>
  )
}
