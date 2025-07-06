import { createClient } from '@supabase/supabase-js'

// Validate environment variables without exposing their values
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables')
  throw new Error('Missing Supabase environment variables')
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Test connection function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection error:', error.message)
      return { success: false, error: error.message }
    }
    
    return { success: true, data }
  } catch (error: any) {
    console.error('Supabase connection error:', error.message)
    return { success: false, error: error.message }
  }
}

// Test query function
export async function testSupabaseQuery() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name')
      .limit(1)
    
    if (error) {
      console.error('Test query error:', error.message)
      return { success: false, error: error.message }
    }
    
    return { success: true, data }
  } catch (error: any) {
    console.error('Test query exception:', error.message)
    return { success: false, error: error.message }
  }
}

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
          protein_per_serving: number
          serving_size: number
          image_url: string | null
          created_at: string
          updated_at: string
        }
      }
    }
  }
}

export default supabase 