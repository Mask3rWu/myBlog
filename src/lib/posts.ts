import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts')

export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  tags: string[]
  cover?: string
  draft?: boolean
}

export interface Post {
  slug: string
  slugSegments: string[]
  category: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  cover?: string
  content: string
  html: string
  readTime: string
}

function normalizeDate(input: unknown) {
  if (input instanceof Date) {
    return input.toISOString().slice(0, 10)
  }

  if (typeof input === 'string') {
    return input
  }

  throw new Error(`Invalid post date: ${String(input)}`)
}

function getMarkdownFiles(dir: string, parentSegments: string[] = []): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    const segments = [...parentSegments, entry.name]

    if (entry.isDirectory()) {
      return getMarkdownFiles(fullPath, segments)
    }

    if (!entry.isFile() || !entry.name.endsWith('.md')) {
      return []
    }

    return [path.join(...segments)]
  })
}

function calculateReadTime(content: string) {
  const wordCount = content
    .replace(/[`*_>#\-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

  return `${Math.max(1, Math.ceil(wordCount / 200))} 分钟`
}

function parsePost(filePath: string): Post | null {
  const fullPath = path.join(POSTS_DIRECTORY, filePath)
  const source = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(source)
  const frontmatter = data as Partial<PostFrontmatter>

  if (frontmatter.draft) {
    return null
  }

  if (!frontmatter.title || !frontmatter.date || !frontmatter.excerpt) {
    throw new Error(`Post frontmatter is incomplete: ${filePath}`)
  }

  const slugSegments = filePath.replace(/\.md$/, '').split(path.sep)
  const slug = slugSegments.join('/')
  const category = slugSegments.length > 1 ? slugSegments[0] : 'uncategorized'

  return {
    slug,
    slugSegments,
    category,
    title: frontmatter.title,
    date: normalizeDate(frontmatter.date),
    excerpt: frontmatter.excerpt,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    cover: frontmatter.cover,
    content,
    html: marked.parse(content) as string,
    readTime: calculateReadTime(content),
  }
}

export function getAllPosts() {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return []
  }

  return getMarkdownFiles(POSTS_DIRECTORY)
    .map(parsePost)
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slugSegments: string[]) {
  const slug = slugSegments.join('/')
  return getAllPosts().find((post) => post.slug === slug) ?? null
}

export function getPostParams() {
  return getAllPosts().map((post) => ({
    slug: post.slugSegments,
  }))
}
