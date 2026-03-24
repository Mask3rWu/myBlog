import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/40 bg-white/40 backdrop-blur">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tight">My Blog</h3>
            <p className="text-sm leading-6 text-muted-foreground">
              一个用 Markdown 维护内容、用目录组织分类的静态博客。页面结构围绕内容发现与筛选来设计。
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-primary transition-colors">
                  文章列表
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  关于我
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">内容结构</h4>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-secondary px-2 py-1 text-xs">Markdown</span>
              <span className="rounded-md bg-secondary px-2 py-1 text-xs">标签筛选</span>
              <span className="rounded-md bg-secondary px-2 py-1 text-xs">二级目录</span>
              <span className="rounded-md bg-secondary px-2 py-1 text-xs">静态导出</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">继续浏览</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link
                href="/posts"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                查看全部文章
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                了解作者信息
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
