export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          brand: string
          price: number
          weight: number
          protein_per_100g: number
          Kilojoules_per_serving: number
          serving_size: number
          ingredients: string[] | null
          is_natural: boolean
          image_url: string | null
          created_at: string
          updated_at: string
        }
      }
      reviews: {
        Row: {
          id: string
          product_id: string
          user_id: string
          rating: number
          comment: string | null
          helpful_count: number
          created_at: string
        }
      }
    }
  }
}
