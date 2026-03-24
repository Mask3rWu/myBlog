import Link from 'next/link'

const posts = [
  { slug: 'hello-world', title: 'Hello World', date: '2024-01-01', excerpt: 'Welcome to my new blog!' },
  { slug: 'nextjs-features', title: 'Next.js 14 新特性', date: '2024-01-15', excerpt: '探索 Next.js 14 的新功能' },
  { slug: 'tailwind-setup', title: 'Tailwind CSS 快速入门', date: '2024-02-01', excerpt: '学习 Tailwind CSS' }
]

export default function Posts() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">所有文章</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <time className="text-sm text-gray-500">{post.date}</time>
            <h2 className="text-xl font-semibold mt-2">
              <Link href={`/posts/${post.slug}`} className="hover:text-primary-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mt-2">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
