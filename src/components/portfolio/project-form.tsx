'use client'

import { useState, useRef } from 'react'
import { PortfolioProject } from '@/lib/supabase/types'
import { uploadPortfolioImage, deletePortfolioImage } from '@/lib/supabase/storage'
import { ImagePlus, X, Loader2 } from 'lucide-react'

interface ProjectFormProps {
  project?: PortfolioProject
  onSubmit: (data: Partial<PortfolioProject>) => Promise<void>
  onCancel: () => void
}

// Convert DATE value (e.g. "2024-03-01") to month input value (e.g. "2024-03")
function toMonthValue(dateStr: string | undefined | null): string {
  if (!dateStr) return ''
  return dateStr.substring(0, 7)
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    content: project?.content || '',
    responsibility: project?.responsibility || '',
    role: project?.role || '',
    start_date: toMonthValue(project?.start_date),
    end_date: toMonthValue(project?.end_date),
    github_url: project?.github_url || '',
    images: project?.images || [],
  } as {
    name: string
    content: string
    responsibility: string
    role: string
    start_date: string
    end_date: string
    github_url: string
    images: string[]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const url = await uploadPortfolioImage(file)
      setFormData({ ...formData, images: [...formData.images, url] })
    } catch (error) {
      console.error('Upload failed:', error)
      alert('图片上传失败')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async (index: number) => {
    const url = formData.images[index]
    try {
      await deletePortfolioImage(url)
    } catch (error) {
      console.error('Failed to delete image from storage:', error)
    }
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit({
        name: formData.name,
        content: formData.content || null,
        responsibility: formData.responsibility || null,
        role: formData.role,
        start_date: formData.start_date ? formData.start_date + '-01' : '',
        end_date: formData.end_date ? formData.end_date + '-01' : '',
        github_url: formData.github_url || null,
        images: formData.images,
      })
    } catch (error) {
      console.error('Failed to submit project:', error)
      alert('提交失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-lg shadow-slate-200/60 backdrop-blur">
      <h3 className="text-lg font-semibold">{project ? '编辑项目' : '新建项目'}</h3>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
          项目名称 *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="输入项目名称"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-1.5">
          职务 *
        </label>
        <input
          type="text"
          id="role"
          required
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="如：前端开发、项目经理"
        />
      </div>

      <div>
        <label htmlFor="responsibility" className="block text-sm font-medium text-slate-700 mb-1.5">
          负责部分
        </label>
        <input
          type="text"
          id="responsibility"
          value={formData.responsibility}
          onChange={(e) => setFormData({ ...formData, responsibility: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="描述你在项目中负责的工作"
        />
      </div>

      <div>
        <label htmlFor="github_url" className="block text-sm font-medium text-slate-700 mb-1.5">
          仓库地址
        </label>
        <input
          type="url"
          id="github_url"
          value={formData.github_url}
          onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="https://github.com/user/repo 或 https://gitee.com/user/repo"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-slate-700 mb-1.5">
            开始时间 *
          </label>
          <input
            type="month"
            id="start_date"
            required
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-slate-700 mb-1.5">
            结束时间 *
          </label>
          <input
            type="month"
            id="end_date"
            required
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1.5">
          项目内容
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={5}
          placeholder="描述项目的具体内容"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          项目图片
        </label>
        <div className="flex flex-wrap gap-3">
          {formData.images.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`项目图片 ${index + 1}`}
                className="h-24 w-36 rounded-2xl object-cover border border-slate-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex h-24 w-36 items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 text-sm text-slate-500 hover:border-purple-400 hover:text-purple-600 transition-colors"
            >
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ImagePlus className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors"
        >
          取消
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-2xl hover:bg-purple-700 disabled:bg-purple-400 transition-colors"
        >
          {isSubmitting ? '提交中...' : project ? '更新项目' : '创建项目'}
        </button>
      </div>
    </form>
  )
}
