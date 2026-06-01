'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PortfolioProject } from '@/lib/supabase/types'
import { ProjectItem } from './project-item'
import { ProjectForm } from './project-form'
import { useAuth } from '@/contexts/auth-context'
import { Plus, FolderOpen } from 'lucide-react'
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'

export function ProjectList() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const supabase = useMemo(() => createClient(), [])
  const { user, isLoading: authLoading } = useAuth()

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const fetchProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('start_date', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      alert('获取作品列表失败')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    if (!authLoading) {
      fetchProjects()
    }
  }, [fetchProjects, authLoading])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = projects.findIndex((p) => p.id === active.id)
    const newIndex = projects.findIndex((p) => p.id === over.id)
    const reordered = arrayMove(projects, oldIndex, newIndex)
    setProjects(reordered)

    // Batch update all sort_order values to match the new order
    try {
      await Promise.all(
        reordered.map((p, i) =>
          supabase.from('portfolio_projects').update({ sort_order: i }).eq('id', p.id)
        )
      )
    } catch (error) {
      console.error('Error updating sort order:', error)
      fetchProjects() // fallback: refetch original order
    }
  }

  const handleCreateProject = async (data: Partial<PortfolioProject>) => {
    try {
      const { error } = await supabase.from('portfolio_projects').insert([data])

      if (error) throw error

      await fetchProjects()
      setShowForm(false)
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  }

  const handleUpdateProject = async (id: string, updates: Partial<PortfolioProject>) => {
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .update(updates)
        .eq('id', id)

      if (error) throw error

      await fetchProjects()
    } catch (error) {
      console.error('Error updating project:', error)
      alert('更新项目失败')
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      const { error } = await supabase.from('portfolio_projects').delete().eq('id', id)

      if (error) throw error

      await fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('删除项目失败')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-slate-400">加载中...</div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">项目列表</h2>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-2xl bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-200/50 hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            新建项目
          </button>
        )}
      </div>

      {showForm && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onCancel={() => setShowForm(false)}
        />
      )}

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <FolderOpen className="h-16 w-16 mb-4 text-slate-300" />
          <p className="text-lg">暂无项目</p>
          {user && <p className="text-sm mt-1">点击上方按钮创建第一个作品</p>}
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <div>
              {projects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  onUpdate={handleUpdateProject}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
