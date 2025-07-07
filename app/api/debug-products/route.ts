import { NextResponse } from 'next/server'
import supabase from '@/lib/supabase/client'

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
      userAgent: 'Server-side request'
    }

    // Test Supabase connection
    const { data, error } = await supabase
      .from('products')
      .select('id, name')
      .limit(1)

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        envCheck,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      productCount: data?.length || 0,
      sampleProduct: data?.[0] || null,
      envCheck,
      timestamp: new Date().toISOString()
    })

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 