export default function About() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-xl shadow-slate-200/60 backdrop-blur md:p-12">
        <div className="mb-4 inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          About
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight">关于我</h1>
        <div className="prose prose-slate max-w-none prose-p:leading-8">
          <p>
            你好，我是这个博客的作者。这个站点现在以 Markdown 作为内容源，
            重点放在文章归档、检索和静态发布，而不是传统的模板式展示。
          </p>
          <h2>这个版本的目标</h2>
          <ul>
            <li>把文章管理方式改成纯 Markdown 文件</li>
            <li>通过目录组织分类，通过 frontmatter 管理标签和摘要</li>
            <li>让首页和文章页都能直接完成筛选、排序和搜索</li>
          </ul>
          <h2>技术栈</h2>
          <ul>
            <li>Next.js 14 (App Router)</li>
            <li>Tailwind CSS</li>
            <li>TypeScript</li>
            <li>gray-matter + marked</li>
            <li>GitHub Pages 静态部署</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
