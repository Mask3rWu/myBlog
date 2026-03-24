import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostParams } from '@/lib/posts'

export function generateStaticParams() {
  return getPostParams()
}

export default function PostPage({ params }: { params: { slug: string[] } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-xl shadow-slate-200/60 backdrop-blur md:p-12">
        <div className="mb-4 inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          {post.category}
        </div>
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
        <p className="mb-8 max-w-3xl text-lg leading-8 text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mb-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={`${post.slug}-${tag}`}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="prose prose-slate max-w-none prose-headings:tracking-tight prose-p:leading-8"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="mt-12 border-t border-slate-100 pt-6">
          <Link href="/posts" className="text-primary hover:underline">
            ← 返回文章列表
          </Link>
        </div>
      </article>
    </div>
  )
}
