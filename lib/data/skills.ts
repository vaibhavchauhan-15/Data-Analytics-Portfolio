export interface Skill {
  name: string
  /** Standout skill — gets subtle accent emphasis in the UI. */
  core?: boolean
  /** IDs (from projects.ts) of real projects that demonstrate this skill. */
  projects?: string[]
}

export interface SkillCategory {
  label: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Analytics & BI',
    skills: [
      { name: 'Power BI', core: true, projects: ['sales-ops-dashboard', 'kpi-reporting-automation'] },
      { name: 'DAX & Data Modeling', projects: ['sales-ops-dashboard'] },
      { name: 'Excel', projects: ['sales-ops-dashboard'] },
      { name: 'Google Sheets' },
      { name: 'Tableau' },
    ],
  },
  {
    label: 'Databases & SQL',
    skills: [
      { name: 'MySQL', core: true, projects: ['sales-ops-dashboard', 'kpi-reporting-automation'] },
      { name: 'PostgreSQL', projects: ['log-guardian'] },
      { name: 'Query Optimization', projects: ['kpi-reporting-automation'] },
      { name: 'Window Functions', projects: ['kpi-reporting-automation'] },
      { name: 'CTEs & Complex Joins', projects: ['kpi-reporting-automation'] },
    ],
  },
  {
    label: 'Programming & Libraries',
    skills: [
      { name: 'Python', core: true, projects: ['log-guardian', 'data-quality-pipeline', 'sales-ops-dashboard'] },
      { name: 'Pandas', core: true, projects: ['log-guardian', 'data-quality-pipeline', 'sales-ops-dashboard'] },
      { name: 'NumPy', projects: ['data-quality-pipeline'] },
      { name: 'Matplotlib & Seaborn', projects: ['data-quality-pipeline'] },
      { name: 'C++ / DSA' },
    ],
  },
  {
    label: 'Statistics & Analysis',
    skills: [
      { name: 'Exploratory Data Analysis', core: true, projects: ['sales-ops-dashboard', 'data-quality-pipeline'] },
      { name: 'Descriptive Statistics', projects: ['data-quality-pipeline'] },
      { name: 'Hypothesis Testing' },
      { name: 'Trend Analysis', projects: ['sales-ops-dashboard'] },
      { name: 'Data Interpretation', projects: ['sales-ops-dashboard'] },
    ],
  },
  {
    label: 'Machine Learning',
    skills: [
      { name: 'Data Cleaning & Imputation', core: true, projects: ['data-quality-pipeline'] },
      { name: 'Scikit-learn', projects: ['log-guardian'] },
      { name: 'Feature Engineering', projects: ['log-guardian'] },
      { name: 'Anomaly Detection', projects: ['log-guardian'] },
      { name: 'Model Evaluation', projects: ['log-guardian'] },
    ],
  },
  {
    label: 'Workflow & Communication',
    skills: [
      { name: 'Data Storytelling', core: true, projects: ['sales-ops-dashboard'] },
      { name: 'Stakeholder Reporting', projects: ['sales-ops-dashboard'] },
      { name: 'Reporting Automation', projects: ['kpi-reporting-automation'] },
      { name: 'FastAPI (data serving)', projects: ['log-guardian'] },
      { name: 'Git & GitHub' },
    ],
  },
]
