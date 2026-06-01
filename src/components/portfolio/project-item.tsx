'use client'

import { useState } from 'react'
import { PortfolioProject } from '@/lib/supabase/types'
import { ProjectForm } from './project-form'
import { useAuth } from '@/contexts/auth-context'
import { deletePortfolioImage } from '@/lib/supabase/storage'
import { Calendar, User, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { getRepoInfo } from '@/components/icons/repo-info'

interface ProjectItemProps {
  project: PortfolioProject
  onUpdate: (id: string, updates: Partial<PortfolioProject>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

function formatMonth(dateString: string) {
  if (!dateString) return ''
  const d = new Date(dateString)
  return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月`
}

export function ProjectItem({ project, onUpdate, onDelete }: ProjectItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { user } = useAuth()

  const handleDelete = async () => {
    if (confirm('确定要删除这个项目吗？相关的图片也会被删除。')) {
      for (const url of project.images) {
        try { await deletePortfolioImage(url) } catch { /* ignore */ }
      }
      await onDelete(project.id)
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentSlide((s) => (s === 0 ? project.images.length - 1 : s - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentSlide((s) => (s === project.images.length - 1 ? 0 : s + 1))
  }

  if (isEditing) {
    return (
      <div className="mb-4">
        <ProjectForm
          project={project}
          onSubmit={async (data) => {
            await onUpdate(project.id, data)
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="mb-4 overflow-hidden rounded-[2rem] border border-white/60 bg-white/85 shadow-lg shadow-slate-200/60 backdrop-blur transition hover:shadow-xl hover:shadow-slate-200/70">
      <div className="p-6">
        {/* Row 1: name + buttons */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            {project.name}
          </h3>

          {user && (
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
              >
                编辑
              </button>
              <button
                onClick={handleDelete}
                className="rounded-xl bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors"
              >
                删除
              </button>
            </div>
          )}
        </div>

        {/* Row 2: role + github + project_type + tags (left), date (right) */}
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-purple-500" />
              {project.role}
            </span>
            {project.project_type && (
              <span className="inline-flex rounded-xl bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
                {project.project_type}
              </span>
            )}
            {project.tech_tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex rounded-xl bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700"
              >
                {tag}
              </span>
            ))}
            {project.github_url && (() => {
              const repo = getRepoInfo(project.github_url)!
              const Icon = repo.icon
              return (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-xl bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <Icon className="h-3 w-3" />
                  {repo.label}
                </a>
              )
            })()}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 hover:bg-purple-200 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                演示视频
              </a>
            )}
          </div>
          <span className="flex items-center gap-1.5 text-sm text-slate-500 flex-shrink-0">
            <Calendar className="h-4 w-4 text-purple-400" />
            {formatMonth(project.start_date)} — {formatMonth(project.end_date)}
          </span>
        </div>

        {/* Summary — always visible */}
        {project.summary && (
          <p className={`mt-4 text-sm leading-7 text-slate-600 ${!showDetail ? 'line-clamp-5' : ''}`}>
            {project.summary}
          </p>
        )}

        {/* Expand / collapse toggle — only show when there's detail content or images */}
        {(project.content || project.images.length > 0) && (
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => { setShowDetail(!showDetail); setCurrentSlide(0) }}
              className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              {showDetail ? (
                <>
                  收起详情 <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  查看详情 <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
            {project.images.length > 0 && (
              <span className="text-xs text-slate-400">
                {project.images.length} 张图片
              </span>
            )}
          </div>
        )}

        {/* Detail panel — full content + image carousel, only rendered when expanded */}
        {showDetail && (
          <div className="mt-4 border-t border-slate-100 pt-5">
            {project.content && (
              <p className="text-sm leading-7 text-slate-600 whitespace-pre-wrap">
                {project.content}
              </p>
            )}

            {project.images.length > 0 && (
              <div className="mt-5">
                <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                  <div className="aspect-[16/9] relative">
                    <img
                      src={project.images[currentSlide]}
                      alt={`${project.name} - 图片 ${currentSlide + 1}`}
                      className="absolute inset-0 h-full w-full object-contain"
                    />

                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur hover:bg-white transition-colors"
                        >
                          <ChevronLeft className="h-5 w-5 text-slate-700" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur hover:bg-white transition-colors"
                        >
                          <ChevronRight className="h-5 w-5 text-slate-700" />
                        </button>
                      </>
                    )}
                  </div>

                  {project.images.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); setCurrentSlide(i) }}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            i === currentSlide ? 'bg-white shadow' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  <div className="absolute top-3 right-3 rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur">
                    {currentSlide + 1} / {project.images.length}
                  </div>
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {project.images.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`flex-shrink-0 h-16 w-24 overflow-hidden rounded-xl border-2 transition-colors ${
                        i === currentSlide ? 'border-purple-500' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={url}
                        alt={`缩略图 ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
