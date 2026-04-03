'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Task, TaskWithChildren } from '@/lib/supabase/types'
import { TaskItem } from './task-item'
import { TaskForm } from './task-form'
import { useAuth } from '@/contexts/auth-context'
import { Plus } from 'lucide-react'

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const supabase = createClient()
  const { user, isLoading: authLoading } = useAuth()

  const fetchTasks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (error) {
      console.error('Error fetching tasks:', error)
      alert('获取任务列表失败')
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const buildTaskTree = (tasks: Task[]): TaskWithChildren[] => {
    const taskMap = new Map<string, TaskWithChildren>()
    const roots: TaskWithChildren[] = []

    tasks.forEach((task) => {
      taskMap.set(task.id, { ...task, children: [] })
    })

    tasks.forEach((task) => {
      const taskWithChildren = taskMap.get(task.id)!
      if (task.parent_id && taskMap.has(task.parent_id)) {
        taskMap.get(task.parent_id)!.children.push(taskWithChildren)
      } else {
        roots.push(taskWithChildren)
      }
    })

    return roots
  }

  const handleCreateTask = async (data: Partial<Task>) => {
    try {
      const { error } = await supabase.from('tasks').insert([data])

      if (error) throw error

      await fetchTasks()
      setShowForm(false)
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    }
  }

  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', id)

      if (error) throw error

      await fetchTasks()
    } catch (error) {
      console.error('Error updating task:', error)
      alert('更新任务失败')
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id)

      if (error) throw error

      await fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
      alert('删除任务失败')
    }
  }

  const handleAddChild = async (parentId: string, data: Partial<Task>) => {
    try {
      const { error } = await supabase.from('tasks').insert([{ ...data, parent_id: parentId }])

      if (error) throw error

      await fetchTasks()
    } catch (error) {
      console.error('Error adding child task:', error)
      alert('添加子任务失败')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">加载中...</div>
      </div>
    )
  }

  const taskTree = buildTaskTree(tasks)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">任务列表</h2>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            新建任务
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {taskTree.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>暂无任务，点击上方按钮创建第一个任务</p>
        </div>
      ) : (
        <div className="space-y-2">
          {taskTree.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onAddChild={(parentId) => {
                // Handle add child form submission
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
