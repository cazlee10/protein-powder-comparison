export interface Product {
  id: string
  name: string
  brand: string
  price: number
  weight: number
  protein_per_100g: number
  serving_size: number
  image_url: string
  price_per_kg: number
  Kilojoules_per_serving: number
  category: string
  link: string
  is_natural: boolean
}

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  comment: string
  photos: string[]
  helpfulCount: number
  createdAt: string
  user?: {
    name: string
    avatarUrl?: string
  }
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage: string
  published: boolean
  publishedAt: string
} 