interface Post {
  title: string
  date: string
  content: string
}

const posts: Record<string, Post> = {
  'hello-world': {
    title: 'Hello World',
    date: '2024-01-01',
    content: '欢迎来到我的博客！这是一个使用 Next.js 14 和 Tailwind CSS 构建的博客。'
  },
  'nextjs-features': {
    title: 'Next.js 14 新特性',
    date: '2024-01-15',
    content: 'Next.js 14 引入了 App Router 等新功能，让开发更加高效。'
  },
  'tailwind-setup': {
    title: 'Tailwind CSS 快速入门',
    date: '2024-02-01',
    content: 'Tailwind CSS 是一个实用优先的 CSS 框架，可以快速构建美观的界面。'
  }
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold">文章未找到</h1>
        <a href="/" className="text-primary-600 hover:underline mt-4 inline-block">
          返回首页
        </a>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <article>
        <time className="text-gray-500">{post.date}</time>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-8">{post.title}</h1>
        <div className="prose prose-blog">
          <p>{post.content}</p>
        </div>
        <div className="mt-12">
          <a href="/posts" className="text-primary-600 hover:underline">
            ← 返回文章列表
          </a>
        </div>
      </article>
    </div>
  )
}
