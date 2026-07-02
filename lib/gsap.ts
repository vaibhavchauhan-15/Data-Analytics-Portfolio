'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// SplitText & DrawSVGPlugin became free in GSAP 3.13 and ship with the npm package.
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

let registered = false

export function registerGsap() {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin)
  registered = true
}

export const EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
  back: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.5)',
} as const

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin }
