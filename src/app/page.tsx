import Link from 'next/link'

// 示例文章数据
const posts = [
  {
    slug: 'hello-world',
    title: 'Hello World',
    date: '2024-01-01',
    excerpt: 'Welcome to my new blog built with Next.js 14!'
  },
  {
    slug: 'nextjs-features',
    title: 'Next.js 14 新特性',
    date: '2024-01-15',
    excerpt: '探索 Next.js 14 的 App Router 和新功能。'
  },
  {
    slug: 'tailwind-setup',
    title: 'Tailwind CSS 快速入门',
    date: '2024-02-01',
    excerpt: '学习如何使用 Tailwind CSS 美化你的网站。'
  }
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-xl text-gray-600">
          分享技术、想法和经验
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-8">最新文章</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <time className="text-sm text-gray-500">{post.date}</time>
              <h3 className="text-xl font-semibold mt-2 mb-3">
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="text-gray-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
