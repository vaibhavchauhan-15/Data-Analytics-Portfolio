import { SITE_CONFIG } from '@/lib/config'

export function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    jobTitle: 'Data Analyst',
    description:
      'Data Analyst specializing in Power BI, Python, SQL, and Machine Learning. Based in Delhi, India.',
    email: SITE_CONFIG.email,
    telephone: '+91-9867732204',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Delhi',
      addressCountry: 'IN',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Parul University',
      url: 'https://paruluniversity.ac.in',
    },
    knowsAbout: [
      'Data Analysis',
      'Power BI',
      'Python',
      'SQL',
      'Machine Learning',
      'Business Intelligence',
      'Data Visualization',
    ],
    sameAs: [SITE_CONFIG.linkedin, SITE_CONFIG.github],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Data Analyst',
      occupationalCategory: '15-2041',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
