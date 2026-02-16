const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkBlogPosts() {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, published, published_at, content')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error:', error)
      return
    }

    console.log(`\nTotal published posts: ${data.length}\n`)
    
    data.forEach((post, i) => {
      console.log(`${i + 1}. ${post.title}`)
      console.log(`   Slug: ${post.slug}`)
      console.log(`   Published: ${post.published_at}`)
      console.log(`   Has excerpt: ${!!post.excerpt} (${post.excerpt ? post.excerpt.substring(0, 50) + '...' : 'MISSING'})`)
      console.log(`   Has content: ${!!post.content} (${post.content ? post.content.substring(0, 50) + '...' : 'MISSING'})`)
      console.log('')
    })
  } catch (error) {
    console.error('Failed to check blog posts:', error)
  }
}

checkBlogPosts()
