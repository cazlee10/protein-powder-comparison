const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// Use service role key for admin operations (inserting blog posts)
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// HTML content provided by user
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Best & Cheapest Protein Powder in Australia (2025 Guide)</title>
  <meta name="description" content="Looking for the cheapest protein powder in Australia in 2025? Compare the best value whey and vegan options, Reddit favourites, and Chemist Warehouse sale picks.">
</head>

<body>

<article>

<header>
  <h1>Best & Cheapest Protein Powder in Australia (2025 Guide)</h1>
  <p><strong>Searching for cheap protein powder in Australia?</strong> This guide compares the cheapest protein powder options in 2025, including Reddit favourites, Chemist Warehouse sale picks, and the best value whey protein brands based on grams of protein per dollar.</p>
</header>

<section>
  <p>If you've searched for:</p>
  <ul>
    <li>cheap protein powder Australia Reddit</li>
    <li>cheapest protein powder Australia 2025</li>
    <li>best value whey protein Australia</li>
    <li>budget protein powder Australia</li>
  </ul>
  <p>You've probably realised one thing: the cheapest option changes depending on timing and bulk pricing.</p>
  <p>This guide breaks down the best everyday budget whey protein, which brands Reddit users recommend, when Chemist Warehouse sales become unbeatable, the cheapest vegan protein powder in Australia, and how to calculate grams of protein per dollar properly.</p>
</section>

<hr>

<section>
  <h2>Best Value Whey Protein in Australia (Everyday Pricing)</h2>

  <h3>Black Belt Protein (Bulk Nutrients) – Best Overall Budget Pick</h3>

  <p>At the time of writing, <strong>Black Belt Protein (by Bulk Nutrients)</strong> is generally the best value whey protein in Australia based on grams of protein per dollar.</p>

  <p>Across multiple cheap protein powder Australia Reddit discussions, Black Belt Protein frequently ranks at the top when users compare real protein yield rather than marketing claims.</p>

  <h4>Why Black Belt Protein Leads for Everyday Value</h4>
  <ul>
    <li>Very competitive price per kilogram</li>
    <li>High protein percentage per serve</li>
    <li>Even cheaper when buying larger bulk sizes</li>
    <li>Minimal marketing markup</li>
  </ul>

  <p>If you are not waiting for major retail sales, Black Belt Protein consistently delivers one of the lowest cost-per-protein figures available in Australia in 2025.</p>

  <h3>Similar Budget Price Tier</h3>
  <p>These brands sit very close to Black Belt Protein in everyday pricing:</p>
  <ul>
    <li>Bulk Nutrients (standard whey range)</li>
    <li>Pure Product Australia</li>
    <li>Black Belt Protein</li>
  </ul>

  <p>In most comparisons, these three fall within a narrow margin when measuring grams of protein per dollar. The difference usually comes down to shipping costs, bulk discounts, flavour preference, and digestibility.</p>
</section>

<hr>

<section>
  <h2>Cheapest Protein Powder During Chemist Warehouse Sales</h2>

  <p>When Chemist Warehouse runs 30–50% off protein promotions, the pricing hierarchy shifts significantly.</p>

  <p>During these large sales, products stocked in-store can temporarily become the cheapest protein powder in Australia — even cheaper than Black Belt Protein and Bulk Nutrients.</p>

  <h3>Sale Winners (When 40–50% Off)</h3>
  <ul>
    <li>Vital Strength Whey</li>
    <li>INC Protein</li>
    <li>BSC (Body Science) Whey</li>
  </ul>

  <p>At 40–50% off, their grams of protein per dollar can surpass most online bulk suppliers.</p>

  <h3>Smart Buying Strategy</h3>
  <ul>
    <li>Buy Black Belt Protein or Bulk Nutrients for consistent everyday value</li>
    <li>Stock up on Vital Strength, INC or BSC during major Chemist Warehouse sales</li>
  </ul>

  <p>This hybrid strategy is frequently recommended in cheap protein powder Australia Reddit discussions — buy online for stability, buy retail during aggressive promotions.</p>
</section>

<hr>

<section>
  <h2>Cheapest Vegan Protein Powder in Australia</h2>

  <h3>Coles Wellness Road Pea Protein</h3>

  <p>When searching for the cheapest vegan protein powder Australia Reddit users mention, Coles Wellness Road Pea Protein appears frequently.</p>

  <h4>Why It's Popular</h4>
  <ul>
    <li>Extremely affordable</li>
    <li>Simple ingredient list</li>
    <li>Widely accessible</li>
    <li>Strong protein per dollar ratio</li>
  </ul>

  <h4>Important: It Is Unflavoured</h4>
  <p>This product is unflavoured and has a natural pea taste. Most users add ingredients such as cocoa powder, frozen berries, banana, honey, or stevia to improve taste. Blending it into smoothies is common.</p>

  <p>On its own, it is not very palatable, but from a pure cost perspective, it remains one of the cheapest plant-based protein options in Australia.</p>
</section>

<hr>

<section>
  <h2>How to Calculate the Cheapest Protein Powder (Grams of Protein per Dollar)</h2>

  <p>To properly compare protein powders, calculate:</p>

  <h3>Grams of Protein per Dollar</h3>

  <p><strong>Formula:</strong></p>
  <p>Total grams of protein in the tub ÷ Price = Grams of protein per dollar</p>

  <p><strong>Example:</strong></p>
  <p>If a 2kg tub contains 1600g of actual protein and costs $60:</p>
  <p>1600 ÷ 60 = 26.6 grams of protein per dollar</p>

  <p>The higher this number, the better the value.</p>

  <h3>Use the Comparison Tool Instead</h3>

  <p>Rather than calculating manually, you can use the comparison tool on:</p>

  <p><a href="https://www.proteinpowderhelper.com/products">Protein Powder Helper – Products Comparison Page</a></p>

  <p>On this page, grams of protein per dollar is already calculated for over 100 protein powder products available in Australia.</p>

  <ul>
    <li>Sort by protein per dollar</li>
    <li>Compare whey, isolate, blends and plant proteins</li>
    <li>Instantly see which product currently offers the best value</li>
    <li>Identify when sales temporarily change rankings</li>
  </ul>

  <p>Because the cheapest protein powder in Australia is not fixed — it changes with promotions, bulk discounts and retail sales.</p>
</section>

<hr>

<section>
  <h2>Final Verdict: Cheapest Protein Powder in Australia (2025)</h2>

  <ul>
    <li><strong>Best everyday value:</strong> Black Belt Protein</li>
    <li><strong>Similar budget tier:</strong> Bulk Nutrients and Pure Product Australia</li>
    <li><strong>Cheapest during major sales:</strong> Vital Strength, INC, BSC (Chemist Warehouse 40–50% off)</li>
    <li><strong>Cheapest vegan option:</strong> Coles Wellness Road Pea Protein (unflavoured)</li>
  </ul>

  <p>The cheapest protein powder in Australia isn't one brand — it's a strategy based on grams of protein per dollar and timing your purchases correctly.</p>
</section>

</article>

</body>
</html>`

// Function to create slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Function to extract excerpt from HTML
function extractExcerpt(html, maxLength = 200) {
  // Remove HTML tags and get plain text
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  
  if (text.length <= maxLength) {
    return text
  }
  
  // Find the last complete sentence before maxLength
  const truncated = text.substring(0, maxLength)
  const lastPeriod = truncated.lastIndexOf('.')
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastPeriod > maxLength * 0.7) {
    return truncated.substring(0, lastPeriod + 1)
  } else if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '...'
  }
  
  return truncated + '...'
}

async function addBlogPost() {
  try {
    // Parse HTML to extract title
    const titleMatch = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i)
    const title = titleMatch ? titleMatch[1].trim() : 'Best & Cheapest Protein Powder in Australia (2025 Guide)'
    
    // Extract article content (everything inside <article> tag)
    const articleMatch = htmlContent.match(/<article[^>]*>([\s\S]*?)<\/article>/i)
    const articleContent = articleMatch ? articleMatch[1].trim() : htmlContent
    
    // Create slug
    const slug = createSlug(title)
    
    // Extract excerpt from first paragraph
    const excerpt = extractExcerpt(htmlContent, 200)
    
    // Prepare the blog post data
    const blogPost = {
      title: title,
      slug: slug,
      content: `<article>${articleContent}</article>`,
      excerpt: excerpt,
      featured_image: null,
      published: true,
      published_at: new Date().toISOString(),
      author_id: null
    }
    
    console.log('Inserting blog post:', {
      title: blogPost.title,
      slug: blogPost.slug,
      excerpt: blogPost.excerpt.substring(0, 100) + '...'
    })
    
    // Insert into Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([blogPost])
      .select()
    
    if (error) {
      console.error('Error inserting blog post:', error)
      throw error
    }
    
    console.log('✅ Blog post added successfully!')
    console.log('Post ID:', data?.[0]?.id)
    console.log('Slug:', data?.[0]?.slug)
    console.log('View at: /blog/' + slug)
    
    return data?.[0]
  } catch (error) {
    console.error('Failed to add blog post:', error)
    throw error
  }
}

// Run the script
addBlogPost()
  .then(() => {
    console.log('Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Script failed:', error)
    process.exit(1)
  })
