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
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <article>
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time>{post.date}</time>
          <span className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
            {post.category}
          </span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4">{post.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={`${post.slug}-${tag}`}
              className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div className="mt-12">
          <Link href="/posts" className="text-primary hover:underline">
            ← 返回文章列表
          </Link>
        </div>
      </article>
    </div>
  )
}
