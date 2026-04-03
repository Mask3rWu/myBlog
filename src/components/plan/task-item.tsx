'use client'

import { useState } from 'react'
import { TaskWithChildren } from '@/lib/supabase/types'
import { TaskForm } from './task-form'
import { ChevronRight, ChevronDown, CheckCircle, Circle } from 'lucide-react'

interface TaskItemProps {
  task: TaskWithChildren
  onUpdate: (id: string, updates: Partial<TaskWithChildren>) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onAddChild: (parentId: string) => void
  level?: number
}

export function TaskItem({ task, onUpdate, onDelete, onAddChild, level = 0 }: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showAddChild, setShowAddChild] = useState(false)

  const handleToggleComplete = async () => {
    await onUpdate(task.id, { is_completed: !task.is_completed })
  }

  const handleDelete = async () => {
    if (confirm('确定要删除这个任务吗？')) {
      await onDelete(task.id)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '未设置'
    return new Date(dateString).toLocaleString('zh-CN')
  }

  if (isEditing) {
    return (
      <div className="p-4 border rounded-lg mb-2 bg-white">
        <TaskForm
          task={task}
          onSubmit={async (data) => {
            await onUpdate(task.id, data)
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    )
  }

  return (
    <div className="mb-2">
      <div
        className={`p-4 border rounded-lg ${
          task.is_completed ? 'bg-green-50 border-green-200' : 'bg-white'
        }`}
        style={{ marginLeft: `${level * 24}px` }}
      >
        <div className="flex items-start gap-3">
          {task.children.length > 0 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 p-1 hover:bg-gray-100 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}

          <button
            onClick={handleToggleComplete}
            className="mt-1 flex-shrink-0"
          >
            {task.is_completed ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-lg ${
                task.is_completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.title}
            </h3>

            {task.description && (
              <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
            )}

            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span>开始: {formatDate(task.start_time)}</span>
              {task.end_time && <span>结束: {formatDate(task.end_time)}</span>}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowAddChild(!showAddChild)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              添加子任务
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              编辑
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
            >
              删除
            </button>
          </div>
        </div>
      </div>

      {showAddChild && (
        <div style={{ marginLeft: `${(level + 1) * 24}px` }} className="mt-2">
          <TaskForm
            onSubmit={async (data) => {
              // Create child task through parent component
              setShowAddChild(false)
            }}
            onCancel={() => setShowAddChild(false)}
            parentId={task.id}
          />
        </div>
      )}

      {isExpanded && task.children.length > 0 && (
        <div className="mt-2">
          {task.children.map((child) => (
            <TaskItem
              key={child.id}
              task={child}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onAddChild={onAddChild}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
