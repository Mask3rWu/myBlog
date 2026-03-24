"use client"

import * as React from "react"
import Link from "next/link"
import { Search, ArrowUpDown, CalendarDays, FolderKanban } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Post } from "@/lib/posts"

interface PostsExplorerProps {
  posts: Post[]
  title: string
  description: string
}

type SortMode = "newest" | "oldest" | "title"

export function PostsExplorer({
  posts,
  title,
  description,
}: PostsExplorerProps) {
  const [selectedTag, setSelectedTag] = React.useState<string>("all")
  const [sortMode, setSortMode] = React.useState<SortMode>("newest")
  const [searchTerm, setSearchTerm] = React.useState("")
  const normalizedSearch = searchTerm.trim().toLowerCase()

  const tagCounts = posts.reduce<Record<string, number>>((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] ?? 0) + 1
    })
    return acc
  }, {})

  const categoryCounts = posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1
    return acc
  }, {})

  const filteredPosts = posts
    .filter((post) => {
      const matchesTag =
        selectedTag === "all" ? true : post.tags.includes(selectedTag)
      const matchesSearch =
        normalizedSearch.length === 0
          ? true
          : post.title.toLowerCase().includes(normalizedSearch)

      return matchesTag && matchesSearch
    })
    .sort((a, b) => {
      if (sortMode === "oldest") {
        return a.date.localeCompare(b.date)
      }

      if (sortMode === "title") {
        return a.title.localeCompare(b.title, "zh-Hans-CN")
      }

      return b.date.localeCompare(a.date)
    })

  const tagEntries = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])
  const categoryEntries = Object.entries(categoryCounts).sort((a, b) =>
    a[0].localeCompare(b[0], "zh-Hans-CN")
  )

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="space-y-6">
        <Card className="border-white/60 bg-white/80 shadow-lg shadow-slate-200/60 backdrop-blur">
          <CardHeader className="space-y-4">
            <div className="inline-flex w-fit items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Stack-Inspired Archive
            </div>
            <div className="space-y-3">
              <CardTitle className="text-3xl md:text-4xl">{title}</CardTitle>
              <CardDescription className="max-w-3xl text-base leading-7 text-slate-600">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-5">
          {filteredPosts.map((post) => (
            <article key={post.slug}>
              <Card className="overflow-hidden border-white/60 bg-white/85 shadow-md shadow-slate-200/60 transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="space-y-4 pb-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                      <FolderKanban className="h-3 w-3" />
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="space-y-3">
                    <Link href={`/posts/${post.slug}`}>
                      <h2 className="text-2xl font-semibold leading-tight tracking-tight transition-colors hover:text-primary">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-sm leading-7 text-slate-600">
                      {post.excerpt}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <button
                        key={`${post.slug}-${tag}`}
                        type="button"
                        onClick={() => setSelectedTag(tag)}
                        className="rounded-full"
                      >
                        <Badge
                          variant={selectedTag === tag ? "default" : "secondary"}
                          className="cursor-pointer px-3 py-1 text-xs"
                        >
                          {tag}
                        </Badge>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <p className="text-sm text-muted-foreground">
                      Markdown frontmatter 驱动的文章元数据
                    </p>
                    <Button asChild variant="ghost" className="px-0 text-sm">
                      <Link href={`/posts/${post.slug}`}>阅读全文</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
          {filteredPosts.length === 0 ? (
            <Card className="border-dashed border-slate-300 bg-white/80">
              <CardContent className="flex flex-col items-start gap-3 p-6">
                <p className="text-lg font-semibold">没有匹配的文章</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  试试清空搜索词，或者切换到其它标签和排序方式。
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedTag("all")
                    setSortMode("newest")
                    setSearchTerm("")
                  }}
                >
                  重置筛选
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </section>

      <aside className="space-y-5">
        <Card className="border-white/60 bg-white/80 shadow-md shadow-slate-200/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">筛选文章</CardTitle>
            <CardDescription>
              右侧筛选器基于 Markdown frontmatter 的标题、日期、标签和目录分类。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-700">名称搜索</span>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="搜索文章标题"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
                />
              </div>
            </label>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <ArrowUpDown className="h-4 w-4" />
                时间排序
              </div>
              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={() => setSortMode("newest")}
                  className={`rounded-xl border px-4 py-2 text-left text-sm transition ${
                    sortMode === "newest"
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-slate-50 hover:bg-white"
                  }`}
                >
                  最新优先
                </button>
                <button
                  type="button"
                  onClick={() => setSortMode("oldest")}
                  className={`rounded-xl border px-4 py-2 text-left text-sm transition ${
                    sortMode === "oldest"
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-slate-50 hover:bg-white"
                  }`}
                >
                  最早优先
                </button>
                <button
                  type="button"
                  onClick={() => setSortMode("title")}
                  className={`rounded-xl border px-4 py-2 text-left text-sm transition ${
                    sortMode === "title"
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-slate-50 hover:bg-white"
                  }`}
                >
                  标题排序
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-slate-700">标签选择</div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTag("all")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    selectedTag === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  全部标签 ({posts.length})
                </button>
                {tagEntries.map(([tag, count]) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      selectedTag === tag
                        ? "bg-primary text-primary-foreground"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {tag} ({count})
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-white/60 bg-white/80 shadow-md shadow-slate-200/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">内容概览</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between">
              <span>当前结果</span>
              <span className="font-semibold text-slate-900">
                {filteredPosts.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>总文章数</span>
              <span className="font-semibold text-slate-900">{posts.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>分类数量</span>
              <span className="font-semibold text-slate-900">
                {categoryEntries.length}
              </span>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <p className="mb-3 text-sm font-medium text-slate-700">分类分布</p>
              <div className="space-y-2">
                {categoryEntries.map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="capitalize">{category}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
