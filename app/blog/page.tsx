import supabase from '@/lib/supabase/client'
import Link from 'next/link'
import { BlogPost } from '@/lib/types/types'

async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select(`
      id,
      title,
      slug,
      content,
      excerpt,
      featured_image,
      published,
      published_at
    `)
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) throw error
  
  // Transform the data to match our TypeScript interface
  return data.map(post => ({
    ...post,
    featuredImage: post.featured_image,
    publishedAt: post.published_at
  })) as BlogPost[]
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Protein Powder Blog
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
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
                <div className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 