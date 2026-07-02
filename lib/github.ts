import { SITE_CONFIG } from './config'

const GITHUB_API = 'https://api.github.com'

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  updated_at: string
  topics?: string[]
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${SITE_CONFIG.githubUsername}/repos?sort=updated&per_page=${SITE_CONFIG.githubRepoCount}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 }, // ISR: revalidate hourly
      }
    )
    if (!res.ok) return []
    const repos = (await res.json()) as GitHubRepo[]
    return repos.filter((r) => !r.name.includes('.github'))
  } catch {
    return []
  }
}
