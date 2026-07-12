export const SITE_CONFIG = {
  name: 'Vaibhav Chauhan',
  title: 'Data Analyst · Power BI · Python · SQL',
  description:
    'Data Analyst portfolio — Power BI dashboards, Python analytics pipelines, SQL optimization, and ML systems. B.Tech Data Science, 2026. Open to roles in Delhi NCR and remote.',
  email: 'vaibhav1chauhan12353@gmail.com',
  phone: '+91 9867732204',
  location: 'Delhi, India',
  url: 'https://vaibhavchauhan.dev',

  linkedin: 'https://www.linkedin.com/in/vaibhavchauhan15/',
  github: 'https://github.com/vaibhavchauhan-15',
  kaggle: 'https://kaggle.com/vaibhavchauhan15',
  resumeUrl: '/resume/Vaibhav_Chauhan_Resume.pdf',

  // Feature flags
  showFAQ: true,
} as const

export type NavLink = { label: string; href: string }

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Dashboards', href: '#dashboard' },
  { label: 'Contact', href: '#contact' },
]
