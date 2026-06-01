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
              全栈开发者的个人站点，展示项目经验与技术实践。
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
                <Link href="/portfolio" className="hover:text-primary transition-colors">
                  作品集
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
            <h4 className="font-semibold mb-4">技术栈</h4>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-secondary px-2 py-1 text-xs">Next.js</span>
              <span className="rounded-md bg-secondary px-2 py-1 text-xs">TypeScript</span>
              <span className="rounded-md bg-secondary px-2 py-1 text-xs">Tailwind CSS</span>
              <span className="rounded-md bg-secondary px-2 py-1 text-xs">Supabase</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">继续浏览</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link
                href="/portfolio"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                查看作品集
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
