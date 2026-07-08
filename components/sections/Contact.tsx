'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { m } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle2 } from 'lucide-react'
import { SectionLabel } from '@/components/shared/SectionLabel'
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

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [sectionRef, inView] = useInViewport<HTMLElement>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: 'job' },
  })

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

  const fieldClass =
    'h-11 w-full rounded-md border border-border-subtle bg-bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-primary focus:outline-none transition-colors'

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

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <m.div
            id="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel>{'// Contact'}</SectionLabel>
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
              <form onSubmit={handleSubmit(onSubmit)} className="card-surface space-y-5 p-6 md:p-8" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-secondary">
                      Name
                    </label>
                    <input id="name" {...register('name')} placeholder="Your name" className={fieldClass} />
                    {errors.name && <p className="mt-1 text-xs text-accent-red">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-secondary">
                      Email
                    </label>
                    <input id="email" type="email" {...register('email')} placeholder="you@email.com" className={fieldClass} />
                    {errors.email && <p className="mt-1 text-xs text-accent-red">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-text-secondary">
                    Subject
                  </label>
                  <select id="subject" {...register('subject')} className={fieldClass}>
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
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
                    className={fieldClass + ' h-auto resize-none py-3'}
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
