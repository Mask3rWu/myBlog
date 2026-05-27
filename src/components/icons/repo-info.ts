import { GitHubIcon } from './github-icon'
import { GiteeIcon } from './gitee-icon'
import { ExternalLink } from 'lucide-react'

export function getRepoInfo(url: string | null) {
  if (!url) return null
  if (url.includes('github.com')) return { icon: GitHubIcon, label: 'GitHub' }
  if (url.includes('gitee.com')) return { icon: GiteeIcon, label: 'Gitee' }
  return { icon: ExternalLink, label: '链接' }
}
