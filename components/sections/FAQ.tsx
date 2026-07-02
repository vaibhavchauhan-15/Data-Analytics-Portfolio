'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { SITE_CONFIG } from '@/lib/config'
import { faq } from '@/lib/data/faq'
import { cn } from '@/lib/utils'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  if (!SITE_CONFIG.showFAQ) return null

  return (
    <section id="faq" className="section border-t border-border-subtle">
      <div className="container-x max-w-3xl">
        <SectionHeader eyebrow="// 14. FAQ" title="Questions, answered" align="center" />

        <div className="mt-12 divide-y divide-border-subtle border-y border-border-subtle">
          {faq.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-text-primary md:text-lg">
                    {item.question}
                  </span>
                  <Plus
                    className={cn(
                      'h-5 w-5 flex-shrink-0 text-accent-primary transition-transform duration-300',
                      isOpen && 'rotate-45'
                    )}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-text-secondary md:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
