'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PortfolioProject } from '@/lib/supabase/types'
import { ProjectItem } from './project-item'
import { ProjectForm } from './project-form'
import { useAuth } from '@/contexts/auth-context'
import { Plus, FolderOpen } from 'lucide-react'

export function ProjectList() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const supabase = useMemo(() => createClient(), [])
  const { user } = useAuth()

  const fetchProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
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
    fetchProjects()
  }, [fetchProjects])

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
      )}
    </div>
  )
}
