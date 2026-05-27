import { CheckCircle2, Circle, Clock } from 'lucide-react'
import AuthorCard from '@/components/author-card'

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
          <AuthorCard />
        </aside>
      </div>
    </div>
  )
}
