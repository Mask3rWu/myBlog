import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/60 bg-white/85 p-10 text-center shadow-xl shadow-slate-200/60 backdrop-blur">
        <h1 className="mb-4 text-7xl font-bold tracking-tight text-slate-300">404</h1>
        <h2 className="mb-4 text-3xl font-semibold">页面未找到</h2>
        <p className="mb-8 text-muted-foreground">
          抱歉，你访问的页面不存在，或者文章路径已经被调整。
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
