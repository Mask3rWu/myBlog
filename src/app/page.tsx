import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import AuthorCard from '@/components/author-card'

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
          <AuthorCard />
        </aside>
      </div>
    </div>
  )
}
