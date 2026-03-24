"use client"

import Link from "next/link"
import { PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="w-full border-b border-white/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-20 items-center px-4">
        <Link href="/" className="mr-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-300/50">
            <PenLine className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-base font-semibold tracking-tight">My Blog</span>
            <span className="block text-xs text-muted-foreground">Markdown Archive</span>
          </div>
        </Link>
        <nav className="flex flex-1 items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
          >
            首页
          </Link>
          <Link
            href="/plan"
            className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
          >
            计划
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
