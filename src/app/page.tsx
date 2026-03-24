import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { ArrowUpRight, Mail, PenSquare } from 'lucide-react'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="space-y-5">
          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-lg shadow-slate-200/60 backdrop-blur">
            <div className="mb-4 inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Articles Overview
            </div>
            <h1 className="text-4xl font-bold tracking-tight">文章概况</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              这里收纳站点里的最新文章，只保留最关键的标题、日期和标签信息。完整筛选和搜索放在文章页里处理。
            </p>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-[1.75rem] border border-white/60 bg-white/85 p-6 shadow-md shadow-slate-200/60 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {post.category}
                  </span>
                </div>
                <Link href={`/posts/${post.slug}`} className="block">
                  <h2 className="text-2xl font-semibold leading-tight tracking-tight transition-colors hover:text-primary">
                    {post.title}
                  </h2>
                </Link>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={`${post.slug}-${tag}`}
                      className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
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
