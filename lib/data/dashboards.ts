export interface DashboardShowcase {
  id: string
  title: string
  description: string
  tags: string[]
  metric: string
  image?: string
  githubUrl?: string
}

const GH = 'https://github.com/vaibhavchauhan-15'

export const dashboards: DashboardShowcase[] = [
  {
    id: 'general-election-2024',
    title: 'India General Election 2024',
    description:
      "Interactive Power BI dashboard visualizing India's 2024 General Election across all 543 constituencies — seat distribution, alliances, and vote margins.",
    tags: ['Power BI', 'DAX', 'Elections'],
    metric: '543 constituencies analyzed',
    image: '/dashboards/GeneralElection.png',
    githubUrl: `${GH}/GENERAL-ELECTION-DASHBOARD`,
  },
  {
    id: 'financial-fraud',
    title: 'Financial Risk & Fraud Detection',
    description:
      'Executive Power BI dashboard that flags suspicious transactions and tracks fraud KPIs, alerts, and high-risk customers in real time.',
    tags: ['Power BI', 'Power Query', 'DAX'],
    metric: 'Fraud rate & alert resolution tracked',
    image: '/dashboards/Financial-Risk-Fraud-Detection-Dashboard-Power-BI.png',
    githubUrl: `${GH}/Financial-Risk-Fraud-Detection-Dashboard-Power-BI`,
  },
  {
    id: 'netflix-analytics',
    title: 'Netflix Content Analytics',
    description:
      "Tableau dashboard exploring Netflix's movie and TV catalog by genre, rating, country, and release year.",
    tags: ['Tableau', 'Python', 'SQL'],
    metric: 'Top-10 genres & content trends',
    image: '/dashboards/Netflix.png',
    githubUrl: `${GH}/Netflix`,
  },
  {
    id: 'blinkit-sales',
    title: 'Blinkit Sales Performance',
    description:
      'Interactive Excel dashboard turning 8,523 Blinkit grocery-sales records into outlet, inventory, and rating insights.',
    tags: ['Excel', 'Pivot Tables', 'Slicers'],
    metric: '$1.20M sales across 8,523 items',
    image: '/dashboards/Blinkit.png',
    githubUrl: `${GH}/Blinkit-Sales-Performance-Dashboard-Excel`,
  },
  {
    id: 'sales-revenue',
    title: 'Sales & Revenue Analysis',
    description:
      'Power BI dashboard tracking sales, profit, and customer behavior with dynamic slicers across regions and product categories.',
    tags: ['Power BI', 'Power Query', 'DAX'],
    metric: 'Sales, profit & margin KPIs',
    image: '/dashboards/Sale-and-revenue-analysis.png',
    githubUrl: `${GH}/Sale-and-revenue-analysis`,
  },
]
