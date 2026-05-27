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
          <p className="text-sm text-muted-foreground">Agent Developer</p>
        </div>
      </div>

      <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
        喜欢把内容系统、前端体验和静态部署整理成清晰可维护的结构。这个博客主要记录工程实践、技术观察和还算靠谱的折腾结果。
      </p>

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
        <p className="text-sm font-medium text-slate-700">当前站点</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Markdown 驱动内容，按目录组织文章，文章页支持筛选、排序和搜索。
        </p>
      </div>
    </div>
  )
}
