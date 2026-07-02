export interface KPIStat {
  prefix?: string
  target: number
  suffix?: string
  label: string
  sublabel?: string
}

export const kpiStats: KPIStat[] = [
  { target: 4, suffix: '', label: 'Power BI Dashboards', sublabel: 'Shipped & adopted' },
  { prefix: '~', target: 40, suffix: '%', label: 'Query Speed Improvement', sublabel: 'MySQL optimization' },
  { target: 30, suffix: '%+', label: 'Data Quality Fix', sublabel: 'Across 5+ datasets' },
  { target: 3, suffix: '', label: 'Teams Impacted', sublabel: 'Cross-functional' },
]
