import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"

interface PostCardProps {
  slug: string
  category?: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
}

export function PostCard({ slug, category, title, excerpt, date, readTime, tags }: PostCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex gap-2 mb-3">
          {category ? (
            <Badge variant="outline" className="text-xs capitalize">
              {category}
            </Badge>
          ) : null}
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/posts/${slug}`}>
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="group-hover:text-primary" asChild>
          <Link href={`/posts/${slug}`}>
            阅读更多 <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
