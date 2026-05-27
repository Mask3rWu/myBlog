import { createClient } from './client'

const BUCKET_NAME = 'portfolio-images'

export async function uploadPortfolioImage(file: File): Promise<string> {
  const supabase = createClient()

  const fileName = `${Date.now()}-${file.name}`
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file)

  if (error) throw error

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName)

  return data.publicUrl
}

export async function deletePortfolioImage(url: string): Promise<void> {
  const supabase = createClient()

  // Extract filename from the public URL
  const fileName = url.split('/').pop()
  if (!fileName) return

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([fileName])

  if (error) throw error
}
