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
