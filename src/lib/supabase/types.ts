export interface Task {
  id: string
  title: string
  description: string | null
  start_time: string
  end_time: string | null
  parent_id: string | null
  is_completed: boolean
  created_at: string
  updated_at: string
}

export interface TaskWithChildren extends Task {
  children: TaskWithChildren[]
}

export type NewTask = Omit<Task, 'id' | 'created_at' | 'updated_at'>
export type UpdateTask = Partial<Omit<Task, 'id' | 'created_at'>>

export interface PortfolioProject {
  id: string
  name: string
  summary: string | null
  content: string | null
  demo_url: string | null
  role: string
  github_url: string | null
  project_type: string | null
  tech_tags: string[]
  start_date: string
  end_date: string
  images: string[]
  created_at: string
  updated_at: string
}

export type NewPortfolioProject = Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'>
export type UpdatePortfolioProject = Partial<Omit<PortfolioProject, 'id' | 'created_at'>>
