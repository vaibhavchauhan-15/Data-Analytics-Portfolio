import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href?: string
  cta?: string
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn('grid w-full auto-rows-[22rem] grid-cols-3 gap-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) {
  return (
    <div
      key={name}
      className={cn(
        'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
        // in-theme surface + border
        'bg-bg-surface border border-border-subtle',
        '[box-shadow:var(--shadow-md)] transition-all duration-300 hover:border-border-muted',
        className
      )}
      {...props}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <Icon className="h-12 w-12 origin-left transform-gpu text-accent-primary transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="font-display text-xl font-semibold text-text-primary">{name}</h3>
        <p className="max-w-lg text-text-secondary">{description}</p>
      </div>

      {href && cta && (
        <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-1 text-sm font-medium text-accent-glow transition-colors hover:text-accent-primary"
          >
            {cta}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] dark:group-hover:bg-white/[.03]" />
    </div>
  )
}
