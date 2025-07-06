import Link from 'next/link'
import { BlogPost } from '@/lib/types/types'

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <img
        src={post.featuredImage || '/blog-placeholder.jpg'}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
} 