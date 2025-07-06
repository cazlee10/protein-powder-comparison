export interface Product {
  id: string
  name: string
  brand: string
  price: number
  weight: number
  protein_per_100g: number
  costPer100Gram: number
  pricePerKg: number
  Kilojoules_per_serving: number
  averageRating?: number
  totalReviews?: number
  imageUrl?: string
  link?: string
  category?: string
  // ... other properties from your requirements
} 