import { ProjectList } from '@/components/portfolio/project-list'
import AuthorCard from '@/components/author-card'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section>
          <div className="mb-8 rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-lg shadow-slate-200/60 backdrop-blur">
            <div className="mb-4 inline-flex items-center rounded-full bg-purple-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Portfolio
            </div>
            <h1 className="text-4xl font-bold tracking-tight">作品集</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              展示过往的项目经验与成果，记录参与的各类项目。
            </p>
          </div>

          <ProjectList />
        </section>

        <aside className="space-y-5">
          <AuthorCard />
        </aside>
      </div>
    </div>
  )
}
