import { createClient } from './client'
import { PortfolioProject, NewPortfolioProject, UpdatePortfolioProject } from './types'

const supabase = createClient()

export async function getProjects(): Promise<PortfolioProject[]> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .order('start_date', { ascending: false })

  if (error) throw error
  return data || []
}

export async function getProjectById(id: string): Promise<PortfolioProject | null> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createProject(project: NewPortfolioProject): Promise<PortfolioProject> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .insert([project])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProject(id: string, updates: UpdatePortfolioProject): Promise<PortfolioProject> {
  const { data, error } = await supabase
    .from('portfolio_projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase
    .from('portfolio_projects')
    .delete()
    .eq('id', id)

  if (error) throw error
}
