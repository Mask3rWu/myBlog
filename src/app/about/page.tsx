export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">关于我</h1>
      <div className="prose prose-blog">
        <p>
          你好！我是这个博客的作者。这是一个使用 Next.js 14 和 Tailwind CSS 构建的静态博客。
        </p>
        <h2>技术栈</h2>
        <ul>
          <li>Next.js 14 (App Router)</li>
          <li>Tailwind CSS</li>
          <li>TypeScript</li>
          <li>部署在 GitHub Pages</li>
        </ul>
      </div>
    </div>
  )
}
