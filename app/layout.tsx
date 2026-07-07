import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { fonts } from '@/lib/fonts'
import { SITE_CONFIG } from '@/lib/config'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { StructuredData } from '@/components/StructuredData'
import '@/styles/globals.css'
import AgentationProvider from "@/components/AgentationProvider";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Vaibhav Chauhan — Data Analyst | Power BI · Python · SQL · Delhi',
    template: '%s | Vaibhav Chauhan',
  },
  icons: {
    icon: '/favicon.ico',
  },
  description: SITE_CONFIG.description,
  keywords: [
    'Data Analyst',
    'Data Analyst Delhi',
    'Data Analyst fresher',
    'Power BI developer',
    'Python data analyst',
    'SQL analyst',
    'Machine Learning Engineer',
    'Business Intelligence',
    'DAX',
    'Data Science portfolio',
    'Delhi NCR data analyst',
    'Vaibhav Chauhan',
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_CONFIG.url,
    siteName: 'Vaibhav Chauhan — Data Analyst',
    title: 'Vaibhav Chauhan — Data Analyst | Power BI · Python · SQL',
    description:
      'Turning raw data into business decisions. Power BI dashboards, Python pipelines, ML systems. Open to Delhi NCR / remote roles.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vaibhav Chauhan — Data Analyst',
    description: 'Power BI · Python · SQL · ML · Delhi NCR',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: SITE_CONFIG.url },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#121212',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={fonts}>
          <ThemeProvider>{children}</ThemeProvider>
        <AgentationProvider/>
        <Analytics />
      </body>
    </html>
  )
}
