export interface Product {
  id: string
  name: string
  brand: string
  price: number
  weight: number
  proteinPerServing: number
  caloriesPerServing: number
  servingSize: number
  ingredients: string[]
  isNatural: boolean
  imageUrl: string
  pricePerKg: number
  proteinPerDollar: number
  averageRating?: number
  totalReviews?: number
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