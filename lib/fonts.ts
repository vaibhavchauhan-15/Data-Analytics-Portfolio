import { DM_Sans, Inter, JetBrains_Mono, Sora } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// Variable-axis Sora (full weight range) for the kinetic hero heading, whose
// per-letter hover animates font-weight continuously — static weights would snap.
const soraFlex = Sora({
  subsets: ['latin'],
  variable: '--font-sora-flex',
  display: 'swap',
})

export const fonts = `${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${sora.variable} ${soraFlex.variable}`
