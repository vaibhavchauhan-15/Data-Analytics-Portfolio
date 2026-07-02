export interface Skill {
  name: string
  proficiency: number // 0–100
}

export interface SkillCategory {
  label: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Analytics & BI',
    skills: [
      { name: 'Power BI', proficiency: 90 },
      { name: 'DAX & Data Modeling', proficiency: 85 },
      { name: 'Excel', proficiency: 82 },
      { name: 'Google Sheets', proficiency: 78 },
      { name: 'Tableau', proficiency: 65 },
    ],
  },
  {
    label: 'Databases & SQL',
    skills: [
      { name: 'MySQL', proficiency: 85 },
      { name: 'PostgreSQL', proficiency: 80 },
      { name: 'Query Optimization', proficiency: 82 },
      { name: 'Window Functions', proficiency: 78 },
      { name: 'CTEs & Complex Joins', proficiency: 78 },
    ],
  },
  {
    label: 'Programming & Libraries',
    skills: [
      { name: 'Python', proficiency: 85 },
      { name: 'Pandas', proficiency: 86 },
      { name: 'NumPy', proficiency: 80 },
      { name: 'Matplotlib & Seaborn', proficiency: 80 },
      { name: 'C++ / DSA', proficiency: 68 },
    ],
  },
  {
    label: 'Statistics & Analysis',
    skills: [
      { name: 'Exploratory Data Analysis', proficiency: 86 },
      { name: 'Descriptive Statistics', proficiency: 82 },
      { name: 'Hypothesis Testing', proficiency: 75 },
      { name: 'Trend Analysis', proficiency: 82 },
      { name: 'Data Interpretation', proficiency: 84 },
    ],
  },
  {
    label: 'Machine Learning',
    skills: [
      { name: 'Scikit-learn', proficiency: 78 },
      { name: 'Feature Engineering', proficiency: 75 },
      { name: 'Anomaly Detection', proficiency: 74 },
      { name: 'Data Cleaning & Imputation', proficiency: 85 },
      { name: 'Model Evaluation', proficiency: 72 },
    ],
  },
  {
    label: 'Workflow & Communication',
    skills: [
      { name: 'Data Storytelling', proficiency: 85 },
      { name: 'Stakeholder Reporting', proficiency: 84 },
      { name: 'Reporting Automation', proficiency: 80 },
      { name: 'FastAPI (data serving)', proficiency: 72 },
      { name: 'Git & GitHub', proficiency: 82 },
    ],
  },
]
