import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ZodError } from 'zod'
import { contactSchema, SUBJECT_OPTIONS } from '@/lib/schema'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL ?? 'vaibhav1chauhan12353@gmail.com'

    // Without a configured key (e.g. local dev), accept the submission gracefully.
    if (!apiKey) {
      console.warn('[contact] RESEND_API_KEY not set — skipping email send.')
      return NextResponse.json({ success: true, skipped: true })
    }

    const resend = new Resend(apiKey)
    const subjectLabel =
      SUBJECT_OPTIONS.find((s) => s.value === data.subject)?.label ?? data.subject

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to,
      subject: `[Portfolio] ${subjectLabel} — from ${data.name}`,
      replyTo: data.email,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
