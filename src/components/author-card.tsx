import { ArrowUpRight, Mail } from 'lucide-react'
import { GitHubIcon, GiteeIcon } from '@/components/icons'

interface AuthorCardProps {
  className?: string
}

export default function AuthorCard({ className = '' }: AuthorCardProps) {
  return (
    <div className={`rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-lg shadow-slate-200/60 backdrop-blur ${className}`}>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-slate-900 text-2xl font-bold text-white shadow-lg shadow-slate-300/50">
          MW
        </div>
        <div>
          <p className="text-2xl font-semibold tracking-tight">Mask3rWu</p>
          <p className="text-sm text-muted-foreground">Full-Stack & Agent Developer</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
          <Mail className="h-4 w-4 text-slate-400" />
          <span>2360923544@qq.com</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-slate-200 hover:bg-white"
          >
            <span className="flex items-center gap-3">
              <GitHubIcon className="h-4 w-4 text-slate-400" />
              GitHub
            </span>
            <ArrowUpRight className="h-4 w-4 text-slate-400" />
          </a>
          <a
            href="https://gitee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-slate-200 hover:bg-white"
          >
            <span className="flex items-center gap-3">
              <GiteeIcon className="h-4 w-4 text-slate-400" />
              Gitee
            </span>
            <ArrowUpRight className="h-4 w-4 text-slate-400" />
          </a>
        </div>

      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        {/* <p className="text-sm font-medium text-slate-700">当前站点</p> */}
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          专注全栈开发与 AI Agent 应用，探索软件工程的自动化实践。
        </p>
      </div>
    </div>
  )
}
