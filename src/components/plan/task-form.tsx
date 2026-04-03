'use client'

import { useState } from 'react'
import { Task } from '@/lib/supabase/types'

interface TaskFormProps {
  task?: Task
  parentId?: string
  onSubmit: (data: Partial<Task>) => Promise<void>
  onCancel: () => void
}

export function TaskForm({ task, parentId, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    start_time: task?.start_time
      ? new Date(task.start_time).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    end_time: task?.end_time
      ? new Date(task.end_time).toISOString().slice(0, 16)
      : '',
    is_completed: task?.is_completed || false,
    parent_id: task?.parent_id || parentId || null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitData = {
        ...formData,
        start_time: new Date(formData.start_time).toISOString(),
        end_time: formData.end_time
          ? new Date(formData.end_time).toISOString()
          : null,
      }

      await onSubmit(submitData)
    } catch (error) {
      console.error('Failed to submit task:', error)
      alert('提交失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-50">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          任务名称 *
        </label>
        <input
          type="text"
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="输入任务名称"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          任务描述
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="输入任务描述"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="start_time" className="block text-sm font-medium text-gray-700 mb-1">
            开始时间 *
          </label>
          <input
            type="datetime-local"
            id="start_time"
            required
            value={formData.start_time}
            onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="end_time" className="block text-sm font-medium text-gray-700 mb-1">
            结束时间
          </label>
          <input
            type="datetime-local"
            id="end_time"
            value={formData.end_time}
            onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="is_completed"
          checked={formData.is_completed}
          onChange={(e) => setFormData({ ...formData, is_completed: e.target.checked })}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="is_completed" className="ml-2 text-sm text-gray-700">
          标记为已完成
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isSubmitting ? '提交中...' : task ? '更新任务' : '创建任务'}
        </button>
      </div>
    </form>
  )
}
