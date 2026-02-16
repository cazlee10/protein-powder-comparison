import supabase from '@/lib/supabase/client'
import Link from 'next/link'
import { BlogPost } from '@/lib/types/types'

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  if (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
  
  console.log('Raw data from Supabase:', data?.length, 'posts')
  if (data) {
    data.forEach((post, i) => {
      console.log(`Post ${i + 1}: ${post.title} - ${post.slug} - Published: ${post.published_at}`)
    })
  }
  
  // Transform the data to match our TypeScript interface
  const transformed = (data || []).map(post => ({
    ...post,
    featuredImage: post.featured_image,
    publishedAt: post.published_at
  })) as BlogPost[]
  
  console.log('Transformed posts:', transformed.length)
  return transformed
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  // Debug logging
  console.log('Blog posts fetched:', posts.length)
  posts.forEach((post, i) => {
    console.log(`${i + 1}. ${post.title} - ${post.slug}`)
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Protein Powder Blog
        </h1>
        <div className="mb-8 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-gray-700 mb-3">
            Looking for protein powder comparisons and prices?
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Compare Protein Powders
          </Link>
        </div>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                {post.featuredImage && (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  {post.publishedAt && (
                    <div className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 