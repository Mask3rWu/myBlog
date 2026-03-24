import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { PostsExplorer } from '@/components/posts-explorer'

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <PostsExplorer
        posts={posts}
        title="文章归档与筛选"
        description="首页直接变成内容入口。你可以按标签筛选、按时间排序，或者通过标题搜索快速定位文章，交互方式参考了 Stack 这类内容型博客主题的结构。"
      />
      <div className="mt-8 flex justify-end">
        <Link href="/posts" className="text-sm font-medium text-primary hover:underline">
          单独打开文章页 →
        </Link>
      </div>
    </div>
  )
}
