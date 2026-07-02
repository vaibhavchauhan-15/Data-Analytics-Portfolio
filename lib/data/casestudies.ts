export interface CaseStudy {
  id: string
  title: string
  problem: string
  approach: string
  tools: string[]
  outcome: string
  metric: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'refresh-time',
    title: 'Cutting Dashboard Refresh Time 40%',
    problem:
      'The KPI dashboard ran slow MySQL queries — 3+ minutes per refresh — blocking business reviews.',
    approach:
      'Profiled slow queries with EXPLAIN, replaced correlated subqueries with CTEs, added composite indexes on join columns, and rewrote aggregations using window functions.',
    tools: ['MySQL', 'EXPLAIN', 'CTEs', 'Window Functions'],
    outcome:
      'Dashboard refresh dropped from 3+ min to under 2 min — enabling real-time monitoring for the first time.',
    metric: '~40% faster',
  },
  {
    id: 'missing-data',
    title: 'Rescuing 30%+ Missing Data',
    problem:
      'Raw product datasets had 30%+ missing values across 5+ tables — downstream ML models were unreliable.',
    approach:
      'Built a Python/Pandas pipeline: profiled missing patterns (MCAR vs MAR), applied median imputation for numerical columns, mode for categorical, and flagged high-null rows for manual review.',
    tools: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    outcome:
      'Data quality improved to under 5% missing values, significantly increasing ML model input reliability.',
    metric: '30%+ → <5%',
  },
  {
    id: 'false-positives',
    title: 'Reducing ML False Positives 35%',
    problem:
      'Single-model anomaly detection (Isolation Forest only) produced too many false positives — the ops team was ignoring alerts.',
    approach:
      'Added an Autoencoder as a second-pass filter, only flagging anomalies where both models agreed, and tuned thresholds on labeled historical data.',
    tools: ['Python', 'Scikit-learn', 'TensorFlow/Keras', 'PostgreSQL'],
    outcome:
      'False-positive rate dropped ~35%; alert signal quality improved and the ops team started acting on alerts again.',
    metric: '~35% fewer',
  },
]
