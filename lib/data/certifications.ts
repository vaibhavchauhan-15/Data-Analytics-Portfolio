export interface Certification {
  name: string
  issuer: string
  year: string
  certificateUrl?: string
  color?: string
}

export const certifications: Certification[] = [
  {
    name: 'Data Analytics & Visualization Job Simulation',
    issuer: 'Accenture',
    year: '2023',
    color: '#A100FF',
    certificateUrl: 'https://drive.google.com/file/d/175TuhZA7G3rcRrlUdfPtKMaVM-zuUd5k/view?usp=drive_link',
  },
  {
    name: 'Data Structures & Algorithms',
    issuer: 'CodeHelp',
    year: '2023',
    color: '#FF6B35',
    certificateUrl: 'https://drive.google.com/file/d/1EgHmb-FfpZng0WOKgOtoXjNMB8gyQnl4/view?usp=drive_link',
  },
  {
    name: 'Tableau Workshop',
    issuer: 'Parul University',
    year: '2025',
    color: '#E97627',
    certificateUrl: 'https://drive.google.com/file/d/1hxPWFicQyzJSwwxx-eUaFJjtZRBebLfb/view?usp=drive_link',
  },
]
