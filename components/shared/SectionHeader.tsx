import { RevealText } from './RevealText'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  /** @deprecated eyebrow labels removed in favour of the giant BackgroundTitle; kept so existing callers still type-check. */
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      <RevealText className="max-w-3xl text-2xl font-bold leading-tight md:text-3xl">
        {title}
      </RevealText>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-base text-text-secondary md:text-lg',
            align === 'center' && 'mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
