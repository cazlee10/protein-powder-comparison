# Protein Powder Directory MVP Requirements

## Overview
Build a responsive web application comparing protein powder products with core comparison features, user reviews, and blog functionality. Priority: Mobile-first approach.

---

## User Stories
### Anonymous Users
- View product comparison table with key metrics
- Sort products by price/kg, protein value, ratings
- Filter by product type (whey, vegan, etc.) and ingredients
- Read product details and user reviews
- Access blog articles
- Sign up/login via email or Google

### Registered Users
- Submit product reviews/ratings
- Edit/delete their reviews
- View review submission history
- Update profile information

### Admin Users
- Manage product database via dashboard
- Moderate user reviews
- Create/edit blog content
- Manage affiliate links

---

## Core Functional Requirements

### 1. Product Listing Page
```jsx

// Sample product card structure
{
  id: string,
  name: string,
  brand: string,
  price: number,
  weight: number,
  proteinPerServing: number,
  rating: number,
  isNatural: boolean,
  imageUrl: string,
  affiliateLink: string
}


### 2. Sorting Controls:
- Price per kg
- Protein content per dollar
- User rating (1-5 stars)
- Most reviews
- Newest added


### 3. Filters:
- Product type (whey, casein, plant-based)
- Natural ingredients only toggle
- Price range slider
- Brand multiselect


### 4. Display:
- Grid/list view toggle
- Product comparison chart (key metrics)
- "Best Value" badge (algorithmically determined)
- Affiliate link buttons with click tracking
- "Peview Product button" (to open user review submission form) 


### 5. Product Detail Page
Tabs:
- Nutritional Info (table format)
- User Reviews (with pagination)
- Where to Buy (affiliate links)


### 6. Features:
- Review submission form
- Social share buttons


### 7. Review System
- Star rating input (1-5)
- Text review (500 char limit)


### 8. Blog System
- Category pages (Nutrition, Comparisons, Guides)
- Article template with:
    - Featured image
    - Table of contents
    - Related products embeds
    - Author bio
    - Comments section


### 9. User Authentication
- Modal-based auth flow using supabase
- Password reset functionality
- Social login (Google)
- Profile management:Display name


## Technical Requirements

### Stack Requirements
- Next.js 14 (App Router)
- Supabase JS Client v2
- Tailwind CSS + Headless UI
- react-table v8
- SWR for data fetching


### Performance
- Largest Contentful Paint < 2.5s
- Lazy loading for images below fold
- Paginated API requests (20 items/page)
- Static generation for blog content


### Accessibility
- WCAG 2.1 AA compliance
- Screen reader support
- Keyboard navigation
- Color contrast ratio ≥ 4.5:1


### Error Handling
- API error boundaries
- Empty states for:
    - No search results
    - Failed data loading
    - Empty reviews
    - Form validation messages


### Design Requirements
- Layout: Canstar-like comparison table 
- Health/fitness aesthetic:
- Clean, minimal interface
- High-quality product imagery
- Nutrition-focused color palette
- Responsive breakpoints:
- Mobile (≤768px)
- Tablet (769-1024px)
- Desktop (≥1025px)


### Content Guidelines
- Price display format: $X.XX / kg
- Protein value: XXg per serving
- Review placeholder text examples
- Affiliate link disclaimer text
- Empty state illustrations


### SEO
- Meta titles/descriptions for all pages
- Product schema markup
- Blog post structured data
- Auto-generated sitemap.xml
- Canonical URL handling


## Acceptance Criteria
- All product sorting/filtering works without JS errors
- Affiliate links track clicks in Supabase
- Review submission works with RLS policies
- Blog posts render markdown content
- Passes Lighthouse scores:
- Performance ≥ 90
- Accessibility ≥ 95
- SEO ≥ 100

## File Structure
- File structure for the Next.js/Supabase web application following the requirements:

protein-directory/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx
│   │   ├── page.tsx          # Homepage
│   │   ├── products/
│   │   │   ├── page.tsx      # Product listing
│   │   │   └── [id]/
│   │   │       └── page.tsx  # Product detail
│   │   ├── blog/
│   │   │   ├── page.tsx      # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Blog post
│   │   └── auth/
│   │       └── page.tsx      # Authentication
│   ├── (protected)/
│   │   └── dashboard/        # Admin area
│   ├── api/
│   │   ├── products/
│   │   │   └── route.ts
│   │   ├── reviews/
│   │   │   └── route.ts
│   │   └── affiliate/
│   │       └── route.ts
│   └── layouts/
│       ├── RootLayout.tsx
│       └── BlogLayout.tsx
├── components/
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── SortControls.tsx
│   │   └── Filters.tsx
│   ├── reviews/
│   │   ├── ReviewForm.tsx
│   │   └── ReviewList.tsx
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   └── TableOfContents.tsx
│   └── ui/
│       ├── RatingStars.tsx
│       ├── PriceChart.tsx
│       └── AffiliateButton.tsx
├── lib/
│   ├── supabase/
│   │   └── client.ts
│   ├── utils/
│   │   ├── pricing.ts        # Price calculations
│   │   └── validation.ts     # Form validation
│   └── types/
│       └── types.ts          # TypeScript types
├── public/
│   ├── images/               # Static product images
│   └── logos/                # Brand logos
├── styles/
│   ├── globals.css           # Tailwind imports
│   └── theme.css             # Custom variables
├── content/
│   └── blog/                 # MDX blog posts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.local.example
├── package.json
└── tsconfig.json

###Key File Explanations:

#### App Router Structure
- (public)/(protected): Group routes by auth state
- Dynamic routes: products/[id], blog/[slug]
- API routes: Separate endpoints for core features

#### Component Organization
- Feature-based grouping (products, reviews, blog)
- UI components in separate directory
- TypeScript interfaces in /lib/types

#### Supabase Integration
- Client initialization in /lib/supabase
- Row Level Security policies in Supabase dashboard
- Type definitions for database tables

#### Styling
- Tailwind configuration in globals.css
- Component-scoped styles when needed
- Theme variables in theme.css

#### Content Management
- Blog posts in /content/blog as MDX files
- Product data managed through Supabase

#### Important Config Files:

.env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY= # Server-side only
AFFILIATE_API_KEYS=        # CSV of affiliate credentials

#### Development Considerations:
- Use Next.js 14 App Router features
- Implement ISR for product pages
- Use Zod for form validation
- Add React Query for client-side data management
- Include Playwright for E2E testing
- Set up Husky for pre-commit hooks
