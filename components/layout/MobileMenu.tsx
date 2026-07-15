'use client'

import { AnimatePresence, m } from 'framer-motion'
import { X } from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/config'
import { Button } from '@/components/ui/Button'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[60] flex flex-col bg-bg-base/95 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between px-4 py-5">
            <span className="inline-flex items-end font-display text-lg font-extrabold leading-none tracking-tight text-text-primary">
              <video
                src="/media/logovideo.webm"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
                className="logo-video block h-[1.15em] w-auto select-none"
              />
              <span className="-ml-[0.06em]">aibhav</span>
              <span className="text-accent-primary">.</span>
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-md border border-border-subtle text-text-secondary"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
            {NAV_LINKS.map((link, i) => (
              <m.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="border-b border-border-subtle py-4 font-display text-2xl font-semibold text-text-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
              >
                {link.label}
              </m.a>
            ))}
          </nav>

          <div className="px-6 pb-10">
            <a href={SITE_CONFIG.resumeUrl} download className="block">
              <Button className="w-full" size="lg">
                Download Resume
              </Button>
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
