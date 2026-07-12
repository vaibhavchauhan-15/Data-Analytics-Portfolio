'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { m } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2, User, AtSign, MessageSquare, ChevronDown, Check } from 'lucide-react'
import { BackgroundTitle } from '@/components/shared/BackgroundTitle'
import Text3DFlip from '@/components/magicui/text-3d-flip'
import { Button } from '@/components/ui/Button'
import { useInViewport } from '@/lib/hooks/useInViewport'
import { SITE_CONFIG } from '@/lib/config'
import { contactSchema, SUBJECT_OPTIONS, type ContactInput } from '@/lib/schema'

const CONTACT_LINKS = [
  { icon: Mail, label: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
  { icon: Phone, label: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone.replace(/\s/g, '')}` },
  { icon: MapPin, label: SITE_CONFIG.location, href: undefined },
]

type Subject = ContactInput['subject']

function ThemedSelect({
  value,
  onChange,
  fieldClass,
  iconClass,
}: {
  value: Subject
  onChange: (v: Subject) => void
  fieldClass: string
  iconClass: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = SUBJECT_OPTIONS.find((o) => o.value === value) ?? SUBJECT_OPTIONS[0]

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <MessageSquare className={iconClass} aria-hidden="true" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={fieldClass + ' flex cursor-pointer appearance-none items-center justify-between pr-10 text-left'}
      >
        {selected.label}
        <ChevronDown
          className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-lg border border-border-subtle bg-bg-surface p-1 shadow-lg"
        >
          {SUBJECT_OPTIONS.map((opt) => {
            const active = opt.value === value
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(opt.value as Subject)
                  setOpen(false)
                }}
                className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? 'bg-accent-primary/10 text-accent-primary'
                    : 'text-text-secondary hover:bg-bg-surface-hover hover:text-text-primary'
                }`}
              >
                {opt.label}
                {active && <Check className="h-4 w-4" aria-hidden="true" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [sectionRef, inView] = useInViewport<HTMLElement>()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: 'job' },
  })
  register('subject') // keep RHF aware of the field the themed dropdown drives

  const onSubmit = async (data: ContactInput) => {
    setStatus('idle')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  // ponytail: leading icon lives via pl-11; select reuses this + appearance-none
  const fieldClass =
    'h-12 w-full rounded-lg border border-border-subtle bg-bg-base/40 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 hover:border-border-muted focus:border-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary/20'
  const iconClass =
    'pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted'

  return (
    <section ref={sectionRef} id="contact" className="section relative overflow-hidden border-t border-border-subtle bg-bg-surface/30">
      {/* Floating blobs — large-radius blur is costly to composite, so freeze the
          drift while the section is scrolled out of view. */}
      <div
        style={inView ? undefined : { animationPlayState: 'paused' }}
        className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-accent-primary/10 blur-3xl animate-float"
      />
      <div
        style={inView ? undefined : { animationPlayState: 'paused' }}
        className="pointer-events-none absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-accent-cyan/10 blur-3xl animate-float [animation-delay:2s]"
      />

      <BackgroundTitle text="Contact" position="left" />
      <div className="container-x relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <m.div
            id="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Text3DFlip
              className="mt-4 font-display text-2xl font-bold leading-tight text-text-primary md:text-3xl"
              rotateDirection="top"
              staggerFrom="first"
            >
              Let&apos;s Build Something    with Data
            </Text3DFlip>
            <p className="mt-4 max-w-md text-base text-text-secondary">
              Whether it&rsquo;s a job opportunity, freelance project, or just a conversation about
              data — I&rsquo;m reachable below.
            </p>

            <div className="mt-8 space-y-4">
              {CONTACT_LINKS.map((link) => {
                const content = (
                  <div className="flex items-center gap-4">
                    <div className="grid h-11 w-11 place-items-center rounded-lg border border-border-subtle bg-bg-surface">
                      <link.icon className="h-5 w-5 text-accent-primary" aria-hidden="true" />
                    </div>
                    <span className="text-sm text-text-secondary">{link.label}</span>
                  </div>
                )
                return link.href ? (
                  <a key={link.label} href={link.href} className="block transition-opacity hover:opacity-80">
                    {content}
                  </a>
                ) : (
                  <div key={link.label}>{content}</div>
                )
              })}
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-lg border border-border-subtle text-text-secondary transition-colors hover:border-accent-primary hover:text-text-primary"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-lg border border-border-subtle text-text-secondary transition-colors hover:border-accent-primary hover:text-text-primary"
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </m.div>

          {/* Form */}
          <m.div
            id="contact-form"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <div className="card-surface flex h-full min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-accent-green" aria-hidden="true" />
                <p className="font-display text-xl font-semibold text-text-primary">Message sent!</p>
                <p className="text-text-secondary">I&rsquo;ll reply within 24 hours.</p>
                <Button variant="secondary" onClick={() => setStatus('idle')}>
                  Send another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-surface space-y-5 border border-border-subtle bg-gradient-to-b from-bg-surface to-bg-base/60 p-6 shadow-lg md:p-8"
                noValidate
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-secondary">
                      Name
                    </label>
                    <div className="relative">
                      <User className={iconClass} aria-hidden="true" />
                      <input id="name" {...register('name')} placeholder="Your name" className={fieldClass} />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-accent-red">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-secondary">
                      Email
                    </label>
                    <div className="relative">
                      <AtSign className={iconClass} aria-hidden="true" />
                      <input id="email" type="email" {...register('email')} placeholder="you@email.com" className={fieldClass} />
                    </div>
                    {errors.email && <p className="mt-1 text-xs text-accent-red">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-text-secondary">
                    Subject
                  </label>
                  <ThemedSelect
                    value={watch('subject')}
                    onChange={(v) => setValue('subject', v, { shouldValidate: true })}
                    fieldClass={fieldClass}
                    iconClass={iconClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-secondary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    placeholder="Tell me about the role, project, or idea…"
                    className={fieldClass + ' h-auto resize-none py-3 pl-4'}
                  />
                  {errors.message && <p className="mt-1 text-xs text-accent-red">{errors.message.message}</p>}
                </div>

                {status === 'error' && (
                  <p className="text-sm text-accent-red">
                    Something went wrong. Please email me directly at {SITE_CONFIG.email}.
                  </p>
                )}

                <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
                  {!isSubmitting && <Send className="h-4 w-4" aria-hidden="true" />}
                  Send Message
                </Button>
              </form>
            )}
          </m.div>
        </div>
      </div>
    </section>
  )
}
