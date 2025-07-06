'use client'

import supabase from '@/lib/supabase/client'
import { notFound } from 'next/navigation'
import { BlogPost } from '@/lib/types/types'
import { useEffect, useState } from 'react'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', params.slug)
        .single()

      if (error || !data) {
        notFound()
        return
      }

      const blogPost = {
        ...data,
        featuredImage: data.featured_image,
        publishedAt: data.published_at
      } as BlogPost

      setPost(blogPost)

      // Parse and format HTML content safely
      const parser = new DOMParser()
      const doc = parser.parseFromString(blogPost.content, 'text/html')
      
      // Extract and remove the main content
      const article = doc.querySelector('article')
      if (!article) return

      // Format the content safely
      const formattedContent = formatArticleContent(article)
      setContent(formattedContent)
    }

    fetchPost()
  }, [params.slug])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow">
        <div className="py-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="text-sm text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
          </header>

          {post.featuredImage && (
            <div className="relative w-full h-64 md:h-80 mb-8 rounded-lg overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-contain bg-gray-100"
              />
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          />
        </div>
      </article>
    </div>
  )
}

function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - remove potentially dangerous tags and attributes
  const allowedTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em', 'br', 'table', 'thead', 'tbody', 'tr', 'td', 'th']
  const allowedAttributes = ['class']
  
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  
  // Remove script tags and event handlers
  doc.querySelectorAll('script, style, iframe, object, embed').forEach(el => el.remove())
  
  // Remove event handlers from all elements
  doc.querySelectorAll('*').forEach(el => {
    const allowedAttrs: string[] = []
    for (let i = 0; i < el.attributes.length; i++) {
      const attr = el.attributes[i]
      if (allowedAttributes.includes(attr.name) && !attr.name.startsWith('on')) {
        allowedAttrs.push(attr.name)
      }
    }
    
    // Remove all attributes except allowed ones
    for (let i = el.attributes.length - 1; i >= 0; i--) {
      const attr = el.attributes[i]
      if (!allowedAttrs.includes(attr.name)) {
        el.removeAttribute(attr.name)
      }
    }
  })
  
  return doc.body.innerHTML
}

function formatArticleContent(article: Element): string {
  // Format headings
  article.querySelectorAll('h1, h2, h3, h4').forEach(heading => {
    heading.classList.add('font-bold', 'text-gray-900')
    if (heading.tagName === 'H1') heading.classList.add('text-4xl', 'mt-8', 'mb-6')
    if (heading.tagName === 'H2') heading.classList.add('text-2xl', 'mt-8', 'mb-4')
    if (heading.tagName === 'H3') heading.classList.add('text-xl', 'mt-6', 'mb-3')
    if (heading.tagName === 'H4') heading.classList.add('text-lg', 'mt-4', 'mb-2')
  })

  // Format lists
  article.querySelectorAll('ul').forEach(ul => {
    ul.classList.add('list-disc', 'pl-6', 'my-4', 'space-y-2')
  })

  // Format list items
  article.querySelectorAll('li').forEach(li => {
    li.classList.add('text-gray-700')
  })

  // Format tables
  article.querySelectorAll('table').forEach(table => {
    table.classList.add('min-w-full', 'divide-y', 'divide-gray-200', 'my-8')
    
    // Style table header
    const thead = table.querySelector('thead')
    if (thead) {
      thead.classList.add('bg-gray-50')
      thead.querySelectorAll('th').forEach(th => {
        th.classList.add(
          'px-6',
          'py-3',
          'text-left',
          'text-xs',
          'font-bold',
          'text-gray-700',
          'uppercase',
          'tracking-wider'
        )
      })
    }

    // Style table body
    const tbody = table.querySelector('tbody')
    if (tbody) {
      tbody.classList.add('bg-white', 'divide-y', 'divide-gray-200')
      tbody.querySelectorAll('tr').forEach((tr, i) => {
        if (i % 2 === 1) tr.classList.add('bg-gray-50')
        tr.querySelectorAll('td').forEach(td => {
          td.classList.add('px-6', 'py-4', 'text-sm', 'text-gray-500')
        })
      })
    }
  })

  // Format paragraphs
  article.querySelectorAll('p').forEach(p => {
    p.classList.add('text-gray-700', 'leading-relaxed', 'mb-4')
  })

  // Format strong tags
  article.querySelectorAll('strong').forEach(strong => {
    strong.classList.add('font-bold', 'text-gray-900')
  })

  return article.innerHTML
} 