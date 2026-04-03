"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const router = useRouter()
  const [clickCount, setClickCount] = useState(0)
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current)
    }

    const newCount = clickCount + 1
    
    if (newCount >= 3) {
      setClickCount(0)
      router.push('/login')
    } else {
      setClickCount(newCount)
      clickTimerRef.current = setTimeout(() => {
        setClickCount(0)
      }, 1000)
    }
  }

  return (
    <header className="w-full border-b border-white/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-20 items-center px-4">
        <div className="mr-8 flex items-center gap-3">
          <button
            onClick={handleIconClick}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-300/50 cursor-pointer"
          >
            <PenLine className="h-5 w-5" />
          </button>
          <Link href="/">
            <span className="block text-base font-semibold tracking-tight">My Blog</span>
            <span className="block text-xs text-muted-foreground">Markdown Archive</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
          >
            首页
          </Link>
          <Link
            href="/posts"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
          >
            文章
          </Link>
          <Link
            href="/tasks"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
          >
            任务管理
          </Link>
          <Link
            href="/roadmap"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
          >
            站点规划
          </Link>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild className="rounded-full">
            <Link href="/about">关于作者</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
