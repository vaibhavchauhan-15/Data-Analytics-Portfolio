export interface Achievement {
  title: string
  context: string
  metric: string
}

export const achievements: Achievement[] = [
  {
    title: 'Hackathon Finalist',
    context: 'IndicLaw AI — multilingual legal assistant',
    metric: 'Top teams',
  },
  {
    title: 'Dashboard Adoption',
    context: '3 cross-functional teams adopted Power BI dashboards',
    metric: '4 dashboards',
  },
  {
    title: 'Query Optimization',
    context: 'MySQL KPI refresh pipeline',
    metric: '~40% faster',
  },
  {
    title: 'Data Quality Improvement',
    context: '5+ raw datasets cleaned and validated',
    metric: '30%+ → <5%',
  },
  {
    title: 'ML System Shipped',
    context: 'LogGuardian anomaly detection',
    metric: '35% fewer false positives',
  },
]
