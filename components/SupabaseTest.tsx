import React from 'react';
import supabase from '@/lib/supabase/client';

export default async function SupabaseTest() {
  try {
    // First test the connection and get a sample row to see the structure
    const { data: sampleData, error: sampleError } = await supabase
      .from('products')
      .select('*')
      .limit(1)
      .single();
    
    if (sampleError) {
      console.error('Supabase connection error:', {
        message: sampleError.message,
        details: sampleError.details,
        hint: sampleError.hint,
        code: sampleError.code
      });
      
      return (
        <div className="p-4 mb-4 text-red-600 bg-red-50 rounded-md">
          Error connecting to database: {sampleError.message}
          {sampleError.hint && <div className="mt-2 text-sm">Hint: {sampleError.hint}</div>}
        </div>
      );
    }

    // Get the total count
    const { data: countData, error: countError } = await supabase
      .from('products')
      .select('count')
      .single();

    if (countError) {
      console.error('Error getting count:', countError);
      return (
        <div className="p-4 mb-4 text-orange-600 bg-orange-50 rounded-md">
          Connected to database, but cannot get product count.
        </div>
      );
    }

    // Display available columns
    const availableColumns = sampleData ? Object.keys(sampleData) : [];

    return (
      <div className="p-4 mb-4 text-green-600 bg-green-50 rounded-md">
        <div>✓ Connected to database successfully!</div>
        <div>✓ Products table is accessible</div>
        <div>Total products: {countData?.count || 0}</div>
        <div className="mt-2">
          <strong>Available columns:</strong>
          <pre className="mt-1 text-sm">{JSON.stringify(availableColumns, null, 2)}</pre>
          <strong>Sample data structure:</strong>
          <pre className="mt-1 text-sm">{JSON.stringify(sampleData, null, 2)}</pre>
        </div>
      </div>
    );
  } catch (err) {
    console.error('Unexpected error in SupabaseTest:', err);
    return (
      <div className="p-4 mb-4 text-red-600 bg-red-50 rounded-md">
        An unexpected error occurred while testing the database connection.
      </div>
    );
  }
} 