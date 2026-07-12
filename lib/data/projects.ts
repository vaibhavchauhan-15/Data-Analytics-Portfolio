export type ProjectCategory = 'powerbi' | 'sql' | 'python' | 'ml' | 'excel' | 'tableau'

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
  excel: 'Excel',
  tableau: 'Tableau',
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
  {
    id: 'general-election-2024',
    title: 'India General Election 2024 Dashboard',
    description:
      "Interactive Power BI dashboard visualizing India's 2024 General Election across all 543 constituencies — seat distribution, alliances, and vote margins.",
    category: 'powerbi',
    featured: false,
    techStack: ['Power BI', 'DAX', 'Data Modeling'],
    outcomes: [
      'Mapped party- and alliance-wise seat distribution across 543 constituencies',
      'Surfaced leading candidates and vote margins with interactive filtering',
    ],
    githubUrl: `${GH}/GENERAL-ELECTION-DASHBOARD`,
    thumbnail: '/dashboards/GeneralElection.png',
  },
  {
    id: 'financial-fraud-dashboard',
    title: 'Financial Risk & Fraud Detection Dashboard',
    description:
      'Executive Power BI dashboard that flags suspicious transactions and tracks fraud KPIs, alerts, and high-risk customers in real time.',
    category: 'powerbi',
    featured: false,
    techStack: ['Power BI', 'Power Query', 'DAX'],
    outcomes: [
      'Modeled a star schema over transactions, alerts, customers, and dates',
      'Built fraud-rate, high-risk, and alert-resolution KPIs with 30-day time intelligence',
    ],
    githubUrl: `${GH}/Financial-Risk-Fraud-Detection-Dashboard-Power-BI`,
    thumbnail: '/dashboards/Financial-Risk-Fraud-Detection-Dashboard-Power-BI.png',
  },
  {
    id: 'netflix-content-analytics',
    title: 'Netflix Content Analytics',
    description:
      "Tableau dashboard exploring Netflix's movie and TV catalog by genre, rating, country, and release year.",
    category: 'tableau',
    featured: false,
    techStack: ['Tableau', 'Python', 'Pandas', 'SQL'],
    outcomes: [
      'Analyzed content mix across ratings, genres, countries, and release years',
      'Highlighted top-10 genres and year-over-year content-addition trends',
    ],
    githubUrl: `${GH}/Netflix`,
    thumbnail: '/dashboards/Netflix.png',
  },
  {
    id: 'blinkit-sales-excel',
    title: 'Blinkit Sales Performance Dashboard',
    description:
      'Interactive Excel dashboard turning 8,523 Blinkit grocery-sales records into outlet, inventory, and customer-rating insights.',
    category: 'excel',
    featured: false,
    techStack: ['Excel', 'Pivot Tables', 'Slicers', 'Conditional Formatting'],
    outcomes: [
      'Summarized $1.20M in sales across 8,523 items with KPI tiles',
      'Enabled slicing by outlet size, location, and item type for fast decisions',
    ],
    githubUrl: `${GH}/Blinkit-Sales-Performance-Dashboard-Excel`,
    thumbnail: '/dashboards/Blinkit.png',
  },
  {
    id: 'sales-revenue-analysis',
    title: 'Sales & Revenue Analysis Dashboard',
    description:
      'Power BI dashboard tracking sales, profit, and customer behavior with dynamic slicers across regions and product categories.',
    category: 'powerbi',
    featured: false,
    techStack: ['Power BI', 'Power Query', 'DAX', 'Data Modeling'],
    outcomes: [
      'Built KPI cards for total sales, profit, quantity, and profit margin',
      'Added slicers for year, country, category, and customer segment with a geo map',
    ],
    githubUrl: `${GH}/Sale-and-revenue-analysis`,
    thumbnail: '/dashboards/Sale-and-revenue-analysis.png',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
