import { blogPosts } from "@/data/blog"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark, ThumbsUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, different post)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <Badge className="mb-4">{post.category}</Badge>
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{post.title}</h1>

        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-lg">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}

            {post.sections?.map((section, sectionIndex) => (
              <div key={sectionIndex} className="my-8">
                <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
                {section.content.map((paragraph, paraIndex) => (
                  <p key={paraIndex} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Helpful
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">Last updated: {post.lastUpdated || post.date}</div>
          </div>

          <Separator className="my-8" />

          {/* Author Bio */}
          <div className="flex flex-col items-start gap-4 rounded-lg bg-muted p-6 sm:flex-row">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image src="/placeholder.svg?height=64&width=64" alt={post.author} fill />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{post.author}</h3>
              <p className="text-sm text-muted-foreground">{post.authorTitle || "Attorney at Lawfirm & Associates"}</p>
              <p className="mt-2">
                Experienced attorney specializing in {post.category}. Regular contributor to legal publications and
                speaker at industry conferences.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-24 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium leading-tight">
                          <Link href={`/blog/${relatedPost.slug}`} className="hover:text-primary hover:underline">
                            {relatedPost.title}
                          </Link>
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground">{relatedPost.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(blogPosts.map((p) => p.category))).map((category) => (
                    <Badge key={category} variant="outline" className="hover:bg-primary/10">
                      <Link href={`/blog?category=${category}`}>{category}</Link>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold">Need Legal Help?</h3>
                <p className="mb-4 text-sm">
                  Our experienced attorneys are ready to assist you with your legal matters.
                </p>
                <Button asChild className="w-full">
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
