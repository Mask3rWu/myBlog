import Link from 'next/link'
import { HeroSection } from '@/components/hero-section'
import { PostCard } from '@/components/post-card'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts().slice(0, 6)

  return (
    <>
      <HeroSection />
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link href="/posts" className="text-primary hover:underline text-sm font-medium">
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </>
  )
}
