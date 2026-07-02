export type ProjectCategory = 'powerbi' | 'sql' | 'python' | 'ml'

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  category: ProjectCategory
  featured: boolean
  techStack: string[]
  outcomes: string[]
  githubUrl: string
  liveUrl?: string
  thumbnail: string // SVG cover under /public/projects/
  caseStudy?: boolean
}

export const categoryLabels: Record<ProjectCategory, string> = {
  powerbi: 'Power BI',
  sql: 'SQL',
  python: 'Python',
  ml: 'Machine Learning',
}

const GH = 'https://github.com/vaibhavchauhan-15'

export const projects: Project[] = [
  {
    id: 'sales-ops-dashboard',
    title: 'Sales & Operations Analytics Dashboard',
    description:
      'End-to-end analytics pipeline from raw transactional data to a multi-page interactive Power BI dashboard.',
    longDescription:
      'A full BI build: ingestion and cleaning in Python, loading into MySQL, modeling and DAX measures in Power BI, and a clean self-serve dashboard for non-technical stakeholders. Cohort analysis surfaced a 22% revenue concentration that informed pricing strategy.',
    category: 'powerbi',
    featured: true,
    techStack: ['Power BI', 'DAX', 'MySQL', 'Python', 'Pandas', 'Excel'],
    outcomes: [
      'Designed DAX measures for revenue trends, MoM growth, and customer segmentation',
      'Identified 22% revenue concentration in one product category via cohort analysis',
      'Enabled self-serve analytics for non-technical stakeholders via clean dashboard UX',
    ],
    githubUrl: `${GH}/BI-Sale-Dashboard`,
    liveUrl:
      'https://app.powerbi.com/groups/me/reports/aff0b2c1-2a23-4477-946b-c52cbbaff7db/bc835f09cedf093d586f?experience=power-bi',
    thumbnail: '/projects/sales-dashboard.svg',
    caseStudy: true,
  },
  {
    id: 'log-guardian',
    title: 'LogGuardian — Operational Anomaly Detection',
    description:
      'Hybrid ML anomaly detection (Isolation Forest + Autoencoder) on system logs, with a PostgreSQL analytics layer and FastAPI endpoints.',
    longDescription:
      'A two-stage detection pipeline that only flags events both models agree on, cutting false positives. Anomaly scores and trends are persisted in an auditable PostgreSQL layer and exposed through REST APIs consumed by a real-time monitoring dashboard.',
    category: 'ml',
    featured: true,
    techStack: ['Python', 'Scikit-learn', 'Autoencoder', 'PostgreSQL', 'FastAPI', 'Pandas'],
    outcomes: [
      'Reduced false-positive alert rate by ~35%, improving signal quality for ops teams',
      'Built an auditable PostgreSQL analytics layer with time-range filtering and trend aggregation',
      'Shipped 5 REST APIs via FastAPI feeding a real-time monitoring dashboard',
    ],
    githubUrl: `${GH}/LogGuardian`,
    thumbnail: '/projects/logguardian.svg',
    caseStudy: true,
  },
  {
    id: 'data-quality-pipeline',
    title: 'Data Quality & Imputation Pipeline',
    description:
      'A Python/Pandas pipeline that profiles missing-value patterns and applies targeted imputation to make datasets ML-ready.',
    longDescription:
      'Profiled missingness (MCAR vs MAR) across raw product datasets, applied median/mode imputation, and flagged high-null rows for review — improving the reliability of downstream ML model inputs.',
    category: 'python',
    featured: false,
    techStack: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    outcomes: [
      'Reduced missing values from 30%+ to under 5% across 5+ datasets',
      'Classified missingness (MCAR vs MAR) before choosing an imputation strategy',
      'Improved downstream ML model input reliability',
    ],
    githubUrl: GH,
    thumbnail: '/projects/data-quality.svg',
    caseStudy: true,
  },
  {
    id: 'kpi-reporting-automation',
    title: 'KPI Reporting Automation',
    description:
      'Automated the weekly analytical reporting workflow with optimized SQL and standardized metric definitions.',
    longDescription:
      'Replaced manual weekly Excel reporting by standardizing metric definitions and delivery cadence, and tuning the MySQL queries behind the KPI dashboards — cutting refresh time ~40% and reducing ad-hoc data requests.',
    category: 'sql',
    featured: false,
    techStack: ['MySQL', 'Window Functions', 'CTEs', 'Power BI', 'Python'],
    outcomes: [
      'Cut KPI dashboard refresh time by ~40% via query optimization',
      'Standardized metric definitions, reducing ad-hoc stakeholder data requests',
      'Enabled real-time business monitoring for the first time',
    ],
    githubUrl: GH,
    thumbnail: '/projects/kpi-automation.svg',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
