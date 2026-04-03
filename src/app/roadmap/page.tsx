import { ArrowUpRight, Mail, PenSquare, CheckCircle2, Circle, Clock } from 'lucide-react'

export default function RoadmapPage() {
  const plans = [
    {
      id: 1,
      title: '技术文章更新',
      description: '持续输出高质量技术文章，涵盖前端工程化、性能优化、架构设计等主题',
      status: 'ongoing',
      items: ['每周至少更新1篇文章', '建立文章质量评审机制', '完善文章配图和示例代码']
    },
    {
      id: 2,
      title: '站点功能优化',
      description: '完善博客功能，提升用户体验和可维护性',
      status: 'planned',
      items: ['实现深色模式切换', '添加文章阅读进度指示', '优化移动端适配']
    },
    {
      id: 3,
      title: '内容体系建设',
      description: '建立系统化的内容分类和标签体系',
      status: 'planned',
      items: ['设计清晰的文章分类', '建立标签管理规范', '创建内容导航页面']
    },
    {
      id: 4,
      title: 'SEO 和可发现性',
      description: '提升站点在搜索引擎中的可见度',
      status: 'planned',
      items: ['生成 sitemap.xml', '添加 Open Graph 标签', '提交搜索引擎收录']
    }
  ]

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="space-y-5">
          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-lg shadow-slate-200/60 backdrop-blur">
            <div className="mb-4 inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Roadmap
            </div>
            <h1 className="text-4xl font-bold tracking-tight">站点规划</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              记录博客站点的开发计划和未来方向，持续迭代优化。
            </p>
          </div>

          <div className="space-y-4">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className="rounded-[1.75rem] border border-white/60 bg-white/85 p-6 shadow-md shadow-slate-200/60 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-3 flex items-center gap-3">
                  {plan.status === 'ongoing' ? (
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                      <Clock className="h-4 w-4" />
                      进行中
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <Circle className="h-4 w-4" />
                      待开始
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-semibold leading-tight tracking-tight">
                  {plan.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {plan.description}
                </p>
                <div className="mt-4 space-y-2">
                  {plan.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      {plan.status === 'ongoing' ? (
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 mt-0.5 text-slate-300 flex-shrink-0" />
                      )}
                      <span className="text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-5">
          <div className="rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-lg shadow-slate-200/60 backdrop-blur">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-slate-900 text-2xl font-bold text-white shadow-lg shadow-slate-300/50">
                MW
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight">Masker Wu</p>
                <p className="text-sm text-muted-foreground">Frontend Developer</p>
              </div>
            </div>

            <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
              喜欢把内容系统、前端体验和静态部署整理成清晰可维护的结构。这个博客主要记录工程实践、技术观察和还算靠谱的折腾结果。
            </p>

            <div className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <a href="mailto:masker@example.com" className="hover:text-primary">
                  masker@example.com
                </a>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition hover:border-slate-200 hover:bg-white"
              >
                <span className="flex items-center gap-3">
                  <PenSquare className="h-4 w-4 text-slate-400" />
                  GitHub
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-400" />
              </a>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="text-sm font-medium text-slate-700">当前站点</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Markdown 驱动内容，按目录组织文章，文章页支持筛选、排序和搜索。
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
