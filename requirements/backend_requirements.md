# Protein Powder Directory - Backend Requirements (MVP)

## Database Requirements

### Supabase Schema Design

```sql
-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price NUMERIC(8,2) NOT NULL,
  weight NUMERIC(6,3) NOT NULL, -- in kilograms
  protein_per_serving NUMERIC(5,1) NOT NULL,
  calories_per_serving NUMERIC(5,1) NOT NULL,
  serving_size NUMERIC(5,1) NOT NULL, -- in grams
  ingredients TEXT[],
  is_natural BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Generated Columns
  price_per_kg NUMERIC GENERATED ALWAYS AS (price / weight) STORED,
  protein_per_dollar NUMERIC GENERATED ALWAYS AS ((protein_per_serving * 1000 / serving_size) / price) STORED
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT CHECK (char_length(comment) <= 500),
  photos TEXT[],
  helpful_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (product_id, user_id) -- One review per user per product
);

-- Blog Posts Table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Affiliate Links Table
CREATE TABLE affiliate_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  network TEXT NOT NULL CHECK (network IN ('amazon', 'shareasale', 'other')),
  clicks INT DEFAULT 0,
  last_checked TIMESTAMPTZ DEFAULT NOW()
);
### API Requirements
Core Endpoints

#### Products API
- GET /products - List products with sorting/filtering
- Query params: sort_by, min_price, max_price, is_natural, etc.
- GET /products/{id} - Get single product with aggregate rating
- POST /products (Admin only) - Create new product
- PATCH /products/{id} (Admin only) - Update product

#### Reviews API
- GET /reviews?product_id={id} - List reviews for product
- POST /reviews - Create review (authenticated)
- DELETE /reviews/{id} - Delete review (owner/admin)

#### Blog API
- GET /blog - List published posts
- GET /blog/{slug} - Get single post
- POST /blog (Admin only) - Create post

#### Affiliate API
- GET /redirect/{link_id} - Track click and redirect
- GET /affiliate-links?product_id={id} - Get links for product

### Security Requirements

#### Row Level Security (RLS) Policies
- Products Table
    - SELECT: Public
    - INSERT/UPDATE: admin only
- Reviews Table
    -SELECT: Public
    -INSERT: Authenticated users (with rate limiting)
    -UPDATE/DELETE: Review owner or admin
- Affiliate Links
    - SELECT: Public
    - INSERT/UPDATE: Admin only

### Authentication
- Enable Supabase Auth with:
    - Email/password
    - Google OAuth
- Session timeout: 7 days
- Password complexity requirements: Minimum 8 characters

### Data Management
- Product Data Ingestion
- CSV import endpoint (Admin only)
- Basic web scraper service for price updates
- Daily validation cron job:
    - Check for broken product images
    - Verify affiliate links

### Aggregations
- Materialized view for product ratings:

sql
Copy
CREATE MATERIALIZED VIEW product_ratings AS
SELECT product_id, 
  COUNT(*) as total_reviews,
  AVG(rating) as average_rating
FROM reviews
GROUP BY product_id;
Refresh materialized views daily

## Performance Requirements

### Indexing
- products: price, weight, created_at
- reviews: product_id, user_id
- affiliate_links: product_id

### Response Times
- Product listings: < 500ms
- Review submissions: < 300ms
- Blog posts: < 200ms

### Caching
- Redis cache for product listings (1 hour TTL)
- CDN caching for blog images

### Error Handling

#### Custom Error Codes:
    - 429: Too many review submissions
    - 451: Invalid affiliate link
    - 452: Product validation failed

#### Logging
- Log all admin actions
- Track failed login attempts
- Monitor API error rates
- 
### Testing Requirements

#### Unit Tests
- Price calculations
- Rating aggregations
- Affiliate link validation

#### Load Testing
- Simulate 100 concurrent users
- 500 requests/second for product listings

#### Security Tests
- SQL injection attempts
- XSS payload detection
- Authentication bypass attempts

### Acceptance Criteria
- All RLS policies properly implemented
- Product sorting/filtering via query params
- Review aggregation updates within 5 minutes
- Affiliate click tracking accuracy ≥ 99%
- Pass OWASP ZAP baseline scan
- Database backup system in place

### 1. Web Scraping Setup
#### Tools Needed:
  -Puppeteer (Node.js library for browser automation) 3
  -Supabase JS Client (@supabase/supabase-js) 511

#### Steps:

-Scrape Product Data:
```javascript
Copy
const puppeteer = require('puppeteer');
async function scrapeMyprotein() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('https://au.myprotein.com/nutrition/protein/whey-protein.list');
  
  // Extract product details
  const products = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.productListProducts_product')).map(item => ({
      name: item.querySelector('.athenaProductBlock_title').innerText.trim(),
      price: parseFloat(item.querySelector('.athenaProductBlock_price').innerText.replace('AU$', '')),
      weight: parseFloat(item.querySelector('.athenaProductBlock_weight').innerText.match(/(\d+\.?\d*)\s?kg/)[1]),
      protein_per_serving: parseFloat(item.querySelector('.productDetail_values').innerText.split('Protein')[1].split('g')[0].trim()),
      image_url: item.querySelector('.athenaProductBlock_image img').src
    }));
  });
  
  await browser.close();
  return products;
}
- Note: Adjust CSS selectors based on the site's actual structure 38.

#### Handle Anti-Scraping Measures:
- Use puppeteer-extra-plugin-stealth to avoid bot detection 6.
-Add delays between requests to mimic human behavior 8.

#### Data Import to Supabase
Option 1: Direct Insertion via JS Client

```javascript
Copy
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function uploadToSupabase(products) {
  const { data, error } = await supabase
    .from('products')
    .insert(products);
  
  if (error) console.error('Upload failed:', error);
  else console.log('Uploaded', data.length, 'products');
}
#### Key Points:

Ensure your table schema matches the scraped data (e.g., price, weight, protein_per_serving) 111.

