"use client"

import Link from "next/link"
import { PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <PenLine className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">My Blog</span>
        </Link>
        <nav className="flex items-center gap-6 flex-1">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            首页
          </Link>
          <Link
            href="/posts"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            文章
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            关于
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/about">关于作者</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/posts">浏览文章</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
