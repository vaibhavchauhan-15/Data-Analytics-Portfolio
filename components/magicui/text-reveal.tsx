'use client'

import { FC, ReactNode, useRef } from 'react'
import { m, MotionValue, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TextRevealProps {
  children: string
  className?: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: targetRef })

  if (typeof children !== 'string') {
    throw new Error('TextReveal: children must be a string')
  }

  const words = children.split(' ')

  return (
    <div ref={targetRef} className={cn('relative z-0 h-[140vh] md:h-[200vh]', className)}>
      <div className="sticky top-0 mx-auto flex h-[60%] max-w-4xl items-center bg-transparent px-4 py-6 md:h-[50%] md:py-[2rem]">
        <span className="flex flex-wrap p-4 text-xl font-bold leading-tight text-text-primary/20 md:p-6 md:text-2xl lg:text-3xl">
          {words.map((word, i) => {
            const start = i / words.length
            const end = start + 1 / words.length
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </span>
      </div>
    </div>
  )
}

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-1.5">
      <span className="absolute opacity-30">{children}</span>
      <m.span style={{ opacity }} className="text-text-primary">
        {children}
      </m.span>
    </span>
  )
}
