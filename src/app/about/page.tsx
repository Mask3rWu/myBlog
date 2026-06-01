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
            你好，我是 Mask3rWu，一名全栈开发者，目前专注于 Agent 开发与 AI 驱动的软件工程实践。
          </p>
          <h2>关注方向</h2>
          <ul>
            <li>全栈 Web 开发（Next.js、TypeScript、Node.js）</li>
            <li>AI Agent 应用设计与开发</li>
            <li>软件工程自动化与工具链</li>
          </ul>
          <h2>技术栈</h2>
          <ul>
            <li>Next.js 14 (App Router)</li>
            <li>Tailwind CSS / shadcn/ui</li>
            <li>TypeScript</li>
            <li>Supabase</li>
            <li>GitHub Pages 静态部署</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
