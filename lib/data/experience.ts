export interface ExperienceEntry {
  role: string
  company: string
  period: string
  location: string
  type: 'full-time' | 'internship' | 'contract' | 'freelance'
  bullets: string[]
  tags: string[]
  certificateUrl?: string
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Data Science Intern',
    company: 'Coerror',
    period: 'Jan 2026 – Apr 2026',
    location: 'Gurgaon, India',
    type: 'internship',
    bullets: [
      'Designed and delivered 4 Power BI dashboards tracking core product KPIs—adopted by 3 cross-functional teams, replacing weekly manual Excel reports and saving ~5 hrs/week of analyst time.',
      'Wrote optimised MySQL queries for reporting workflows, cutting KPI dashboard refresh time by ~40% and enabling real-time business monitoring for the first time.',
      'Resolved 30%+ missing-value rate across 5+ raw datasets via Python & Pandas data-cleaning pipelines—directly improving reliability of downstream ML model inputs.',
      'Conducted deep-dive EDA across product and operations data, surfacing 3 actionable trends (seasonality, user drop-off, anomaly clusters) presented to senior leadership.',
      'Automated weekly analytical reporting workflow, reducing ad-hoc data requests from stakeholders by standardising metrics definitions and delivery cadence.',
      'Partnered with engineering to define data schemas and validate pipeline outputs, ensuring analytical accuracy for KPI tracking and business reviews.',
    ],
    tags: ['Power BI', 'MySQL', 'Python', 'Pandas', 'EDA', 'Reporting Automation'],
    certificateUrl: 'https://drive.google.com/file/d/1_0YUyonBEIyM0oe-BxsXPX6iro_olJem/view?usp=drive_link',
  },
]
