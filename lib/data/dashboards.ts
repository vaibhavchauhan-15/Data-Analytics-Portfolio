export interface DashboardShowcase {
  id: string
  title: string
  description: string
  tags: string[]
  metric: string
  image?: string
}

export const dashboards: DashboardShowcase[] = [
  {
    id: 'revenue-overview',
    title: 'Revenue Overview',
    description:
      'Executive view of revenue trends, MoM growth, and product-category contribution built with DAX measures.',
    tags: ['Power BI', 'DAX', 'Revenue'],
    metric: '22% revenue concentration surfaced',
  },
  {
    id: 'operations-kpis',
    title: 'Operations KPI Tracker',
    description:
      'Real-time operational KPIs replacing weekly manual Excel reports for 3 cross-functional teams.',
    tags: ['Power BI', 'MySQL', 'KPIs'],
    metric: '~5 hrs/week analyst time saved',
  },
  {
    id: 'customer-segmentation',
    title: 'Customer Segmentation',
    description:
      'Cohort and segmentation analysis identifying high-value customer groups and retention patterns.',
    tags: ['Power BI', 'Cohort', 'Segmentation'],
    metric: 'Self-serve for non-technical users',
  },
  {
    id: 'data-quality-monitor',
    title: 'Data Quality Monitor',
    description:
      'Tracks missing-value rates and pipeline health across raw datasets feeding downstream models.',
    tags: ['Python', 'Pandas', 'Quality'],
    metric: '30%+ → <5% missing values',
  },
]
