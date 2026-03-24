import { getAllPosts } from '@/lib/posts'
import { PostsExplorer } from '@/components/posts-explorer'

export default function Posts() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 py-10 md:py-14">
      <PostsExplorer
        posts={posts}
        title="所有文章"
        description="这个页面按内容浏览优先设计，右侧可以直接完成标签筛选、时间排序和标题搜索，不需要跳转到单独的标签页。"
      />
    </div>
  )
}
