import { HeroSection } from '@/components/hero-section'
import { PostCard } from '@/components/post-card'

const posts = [
  {
    slug: 'hello-world',
    title: 'Hello World - 欢迎来到我的博客',
    excerpt: '欢迎来到我的技术博客！这是一个使用 Next.js 14 和 Tailwind CSS 构建的现代化博客站点。我将在这里分享前端开发相关的技术和经验。',
    date: '2024-01-01',
    readTime: '3 分钟',
    tags: ['Next.js', '前端']
  },
  {
    slug: 'nextjs-features',
    title: 'Next.js 14 新特性深度解析',
    excerpt: '探索 Next.js 14 带来的革命性更新，包括 App Router、Server Actions、Streaming 等新特性，以及如何利用这些特性构建现代 Web 应用。',
    date: '2024-01-15',
    readTime: '8 分钟',
    tags: ['Next.js', 'React']
  },
  {
    slug: 'tailwind-setup',
    title: 'Tailwind CSS 快速入门指南',
    excerpt: 'Tailwind CSS 是一个实用优先的 CSS 框架，本指南将带你快速上手 Tailwind，了解其核心概念和最佳实践。',
    date: '2024-02-01',
    readTime: '5 分钟',
    tags: ['CSS', 'Tailwind']
  },
  {
    slug: 'typescript-tips',
    title: 'TypeScript 实用技巧与最佳实践',
    excerpt: '分享我在项目中使用 TypeScript 的一些实用技巧，包括类型推断、泛型应用、装饰器使用等，帮助你写出更健壮的代码。',
    date: '2024-02-15',
    readTime: '10 分钟',
    tags: ['TypeScript', '最佳实践']
  },
  {
    slug: 'react-performance',
    title: 'React 性能优化指南',
    excerpt: '深入探讨 React 应用性能优化的各种技巧，包括 React.memo、useMemo、useCallback 的正确使用，以及如何避免不必要的重渲染。',
    date: '2024-03-01',
    readTime: '12 分钟',
    tags: ['React', '性能优化']
  },
  {
    slug: 'web-security',
    title: 'Web 安全入门：保护你的应用',
    excerpt: '了解常见的 Web 安全威胁，如 XSS、CSRF、SQL 注入等，以及如何使用现代工具和技术来保护你的 Web 应用。',
    date: '2024-03-15',
    readTime: '15 分钟',
    tags: ['安全', 'Web']
  }
]

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <a href="/posts" className="text-primary hover:underline text-sm font-medium">
            查看全部 →
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </>
  )
}
