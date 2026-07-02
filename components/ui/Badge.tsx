import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

type Variant = 'default' | 'accent' | 'green' | 'amber' | 'outline'

const variants: Record<Variant, string> = {
  default: 'bg-bg-elevated text-text-secondary border border-border-subtle',
  accent: 'bg-accent-primary/10 text-accent-glow border border-accent-primary/30',
  green: 'bg-accent-green/10 text-accent-green border border-accent-green/30',
  amber: 'bg-accent-amber/10 text-accent-amber border border-accent-amber/30',
  outline: 'bg-transparent text-text-secondary border border-border-muted',
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-medium tracking-wide',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
