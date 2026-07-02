import {
  SiPython,
  SiMysql,
  SiPostgresql,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiPlotly,
  SiFastapi,
  SiGit,
  SiGithub,
  SiCplusplus,
  SiGooglesheets,
  SiJupyter,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import {
  TbChartHistogram,
  TbChartInfographic,
  TbChartDots,
  TbFileSpreadsheet,
} from 'react-icons/tb'
import type { ComponentType, SVGProps } from 'react'

export interface TechItem {
  name: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  color: string
}

// Analytics tools (Power BI / Tableau / Excel / Seaborn) lack stable Simple-Icons
// glyphs; we map them to the closest chart/spreadsheet icon and keep brand color.
export const techStack: TechItem[] = [
  { name: 'Power BI', icon: TbChartInfographic, color: '#F2C811' },
  { name: 'Tableau', icon: TbChartHistogram, color: '#E97627' },
  { name: 'Excel', icon: TbFileSpreadsheet, color: '#217346' },
  { name: 'Google Sheets', icon: SiGooglesheets, color: '#34A853' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Pandas', icon: SiPandas, color: '#150458' },
  { name: 'NumPy', icon: SiNumpy, color: '#013243' },
  { name: 'Matplotlib', icon: SiPlotly, color: '#11557C' },
  { name: 'Seaborn', icon: TbChartDots, color: '#4C72B0' },
  { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Jupyter', icon: SiJupyter, color: '#F37626' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#8B8BA8' },
  { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
]
