import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodError } from 'zod'
import { contactSchema, SUBJECT_OPTIONS } from '@/lib/schema'
import { acknowledgmentEmail, ownerNotificationEmail } from '@/lib/email/templates'

// Cloudflare Pages (via @cloudflare/next-on-pages) runs server code on the
// Workers runtime, so every dynamic route handler must opt into the Edge runtime.
export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL ?? 'vaibhav1chauhan12353@gmail.com'
    // Sender address for outgoing mail. Set CONTACT_FROM_EMAIL to an address on
    // a Resend-verified domain (e.g. "Vaibhav Chauhan <contact@mealmitra.online>")
    // so both the owner notification and the visitor acknowledgment deliver.
    // Falls back to Resend's shared test domain when unset.
    const from = process.env.CONTACT_FROM_EMAIL ?? 'Portfolio Contact <onboarding@resend.dev>'

    // Without a configured key (e.g. local dev), accept the submission gracefully.
    if (!apiKey) {
      console.warn('[contact] RESEND_API_KEY not set — skipping email send.')
      return NextResponse.json({ success: true, skipped: true })
    }

    const resend = new Resend(apiKey)
    const subjectLabel =
      SUBJECT_OPTIONS.find((s) => s.value === data.subject)?.label ?? data.subject
    const emailData = {
      name: data.name,
      email: data.email,
      subjectLabel,
      message: data.message,
    }

    // Send both emails independently so neither can block the other. (Previously
    // the owner notification was awaited first and its failure short-circuited
    // the acknowledgment — and vice-versa the ack failure was swallowed. Running
    // them together guarantees both are always attempted.)
    const [ownerResult, ackResult] = await Promise.allSettled([
      // 1. Notify the site owner, with reply-to set to the visitor.
      resend.emails.send({
        from,
        to,
        subject: `[Portfolio] ${subjectLabel} — from ${data.name}`,
        replyTo: data.email,
        html: ownerNotificationEmail(emailData),
      }),
      // 2. Acknowledge the visitor, with reply-to set to the owner.
      resend.emails.send({
        from,
        to: data.email,
        subject: 'Thanks for reaching out — I got your message',
        replyTo: to,
        html: acknowledgmentEmail(emailData),
      }),
    ])

    // Normalise both outcomes (a rejected promise or a Resend `error` payload
    // both count as a failure) and log them so delivery problems are visible.
    const ownerError =
      ownerResult.status === 'rejected' ? ownerResult.reason : ownerResult.value.error
    const ackError =
      ackResult.status === 'rejected' ? ackResult.reason : ackResult.value.error

    if (ownerError) console.error('[contact] owner notification failed:', ownerError)
    if (ackError) console.error('[contact] acknowledgment email failed:', ackError)

    // The owner notification is the one that must not be lost — if it failed,
    // tell the visitor so they can retry. A failed acknowledgment alone is not
    // worth failing the request over (the message already reached the owner).
    if (ownerError) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
    }

    return NextResponse.json({ success: true, acknowledged: !ackError })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
