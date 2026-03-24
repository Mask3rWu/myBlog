import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Posts() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">所有文章</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <time className="text-sm text-gray-500">{post.date}</time>
            <h2 className="text-xl font-semibold mt-2">
              <Link href={`/posts/${post.slug}`} className="hover:text-primary">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={`${post.slug}-${tag}`}
                  className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
