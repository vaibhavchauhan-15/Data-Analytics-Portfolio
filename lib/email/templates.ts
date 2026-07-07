import { SITE_CONFIG } from '@/lib/config'

/**
 * Email-safe HTML templates for the contact form.
 *
 * Emails must use table-based layout + inline styles (no external CSS, no flex/grid)
 * to render consistently across Gmail, Outlook, Apple Mail, etc. Colors mirror the
 * site's dark neon-green theme (see styles/globals.css).
 *
 * The standalone previews in /resendtemplate mirror this markup — keep them in sync.
 */

// Theme tokens (dark palette from globals.css)
const C = {
  bg: '#0d0d0d',
  base: '#121212',
  surface: '#1a1a1a',
  elevated: '#242424',
  border: '#2a2a2a',
  borderMuted: '#3a3a3a',
  green: '#39ff14',
  greenDim: '#22c55e',
  cyan: '#06b6d4',
  text: '#f5f5f5',
  textSec: '#b3b3b3',
  textMuted: '#808080',
} as const

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const fontStack =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const monoStack = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"

/** Outer shell: dark page, centered 600px card with a neon gradient top bar. */
function shell(opts: { preheader: string; eyebrow: string; body: string }): string {
  const year = new Date().getFullYear()
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>${escapeHtml(opts.eyebrow)}</title>
</head>
<body style="margin:0;padding:0;background-color:${C.bg};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:${C.bg};">
    ${escapeHtml(opts.preheader)}
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.bg};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:${C.surface};border:1px solid ${C.border};border-radius:16px;overflow:hidden;">
          <!-- gradient top bar -->
          <tr>
            <td style="height:4px;line-height:4px;font-size:0;background:linear-gradient(90deg,${C.greenDim} 0%,${C.green} 50%,#66ff66 100%);">&nbsp;</td>
          </tr>
          <!-- header -->
          <tr>
            <td style="padding:28px 32px 0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <span style="display:inline-block;width:36px;height:36px;line-height:36px;text-align:center;border-radius:9px;background-color:${C.base};border:1px solid ${C.border};color:${C.green};font-family:${monoStack};font-size:15px;font-weight:700;">VC</span>
                    <span style="color:${C.text};font-family:${fontStack};font-size:15px;font-weight:600;padding-left:10px;vertical-align:middle;">${escapeHtml(SITE_CONFIG.name)}</span>
                  </td>
                  <td align="right" style="vertical-align:middle;color:${C.textMuted};font-family:${monoStack};font-size:11px;letter-spacing:0.5px;">
                    ${escapeHtml(opts.eyebrow)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- body -->
          ${opts.body}
          <!-- footer -->
          <tr>
            <td style="padding:8px 32px 28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.border};">
                <tr>
                  <td style="padding-top:20px;">
                    <a href="${SITE_CONFIG.github}" style="color:${C.textSec};font-family:${fontStack};font-size:12px;text-decoration:none;padding-right:16px;">GitHub</a>
                    <a href="${SITE_CONFIG.linkedin}" style="color:${C.textSec};font-family:${fontStack};font-size:12px;text-decoration:none;padding-right:16px;">LinkedIn</a>
                    <a href="${SITE_CONFIG.url}" style="color:${C.green};font-family:${fontStack};font-size:12px;text-decoration:none;">${SITE_CONFIG.url.replace(/^https?:\/\//, '')}</a>
                  </td>
                  <td align="right" style="color:${C.textMuted};font-family:${monoStack};font-size:11px;">
                    © ${year}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <p style="color:${C.textMuted};font-family:${fontStack};font-size:11px;margin:16px 0 0 0;">
          ${escapeHtml(SITE_CONFIG.title)}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/** A dark "quote" block reused for showing the visitor's own message. */
function messageBlock(subjectLabel: string, messageHtml: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${C.base};border:1px solid ${C.border};border-left:3px solid ${C.green};border-radius:10px;margin:8px 0 4px 0;">
    <tr>
      <td style="padding:16px 20px;">
        <p style="margin:0 0 6px 0;color:${C.textMuted};font-family:${monoStack};font-size:11px;text-transform:uppercase;letter-spacing:1px;">${escapeHtml(subjectLabel)}</p>
        <p style="margin:0;color:${C.textSec};font-family:${fontStack};font-size:14px;line-height:1.65;">${messageHtml}</p>
      </td>
    </tr>
  </table>`
}

export interface ContactEmailData {
  name: string
  email: string
  subjectLabel: string
  message: string
}

/** Acknowledgment sent to the visitor who submitted the form. */
export function acknowledgmentEmail(data: ContactEmailData): string {
  const name = escapeHtml(data.name)
  const messageHtml = escapeHtml(data.message).replace(/\n/g, '<br>')
  const body = `
    <tr>
      <td style="padding:24px 32px 8px 32px;">
        <h1 style="margin:0 0 4px 0;color:${C.text};font-family:${fontStack};font-size:22px;font-weight:700;line-height:1.3;">
          Thanks for reaching out, ${name} <span style="color:${C.green};">👋</span>
        </h1>
        <p style="margin:12px 0 0 0;color:${C.textSec};font-family:${fontStack};font-size:15px;line-height:1.65;">
          I've received your message and it's landed safely in my inbox. I read every message personally and will get back to you <strong style="color:${C.text};">within 24 hours</strong>.
        </p>
        <p style="margin:20px 0 8px 0;color:${C.textMuted};font-family:${monoStack};font-size:12px;">// a copy of what you sent</p>
        ${messageBlock(data.subjectLabel, messageHtml)}
        <p style="margin:20px 0 0 0;color:${C.textSec};font-family:${fontStack};font-size:15px;line-height:1.65;">
          In the meantime, feel free to explore my work or connect with me below.
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0 8px 0;">
          <tr>
            <td style="border-radius:10px;background:linear-gradient(90deg,${C.greenDim} 0%,${C.green} 100%);">
              <a href="${SITE_CONFIG.url}" style="display:inline-block;padding:12px 24px;color:#0a0a0a;font-family:${fontStack};font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;">View my portfolio →</a>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 4px 0;color:${C.textSec};font-family:${fontStack};font-size:15px;line-height:1.6;">
          Best,<br>
          <strong style="color:${C.text};">Vaibhav Chauhan</strong><br>
          <span style="color:${C.textMuted};font-size:13px;">Data Analyst · Power BI · Python · SQL</span>
        </p>
      </td>
    </tr>`
  return shell({
    preheader: `Thanks ${data.name} — I got your message and will reply within 24 hours.`,
    eyebrow: '// auto-reply',
    body,
  })
}

/** Notification sent to the site owner with the submission details. */
export function ownerNotificationEmail(data: ContactEmailData): string {
  const name = escapeHtml(data.name)
  const email = escapeHtml(data.email)
  const messageHtml = escapeHtml(data.message).replace(/\n/g, '<br>')
  const row = (label: string, value: string) => `
    <tr>
      <td width="90" style="padding:10px 0;vertical-align:top;color:${C.textMuted};font-family:${monoStack};font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">${label}</td>
      <td style="padding:10px 0;color:${C.text};font-family:${fontStack};font-size:14px;line-height:1.5;">${value}</td>
    </tr>`
  const body = `
    <tr>
      <td style="padding:24px 32px 8px 32px;">
        <h1 style="margin:0 0 4px 0;color:${C.text};font-family:${fontStack};font-size:22px;font-weight:700;line-height:1.3;">
          New message from your portfolio
        </h1>
        <p style="margin:10px 0 20px 0;color:${C.textSec};font-family:${fontStack};font-size:14px;line-height:1.6;">
          Someone just submitted the contact form.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.border};border-bottom:1px solid ${C.border};">
          ${row('Name', name)}
          ${row('Email', `<a href="mailto:${email}" style="color:${C.green};text-decoration:none;">${email}</a>`)}
          ${row('Subject', escapeHtml(data.subjectLabel))}
        </table>
        <p style="margin:22px 0 8px 0;color:${C.textMuted};font-family:${monoStack};font-size:12px;">// message</p>
        ${messageBlock(data.subjectLabel, messageHtml)}
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0 8px 0;">
          <tr>
            <td style="border-radius:10px;background:linear-gradient(90deg,${C.greenDim} 0%,${C.green} 100%);">
              <a href="mailto:${email}?subject=Re:%20your%20message" style="display:inline-block;padding:12px 24px;color:#0a0a0a;font-family:${fontStack};font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;">Reply to ${name} →</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
  return shell({
    preheader: `${data.name} (${data.email}): ${data.message.slice(0, 90)}`,
    eyebrow: '// new submission',
    body,
  })
}
