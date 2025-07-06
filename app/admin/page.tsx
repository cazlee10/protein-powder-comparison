'use client'

import { PriceUpdateButton } from '@/components/admin/PriceUpdateButton';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link'

export default function AdminPage() {
  const { user, signOut } = useAuth()
  
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Product Management</h2>
          <PriceUpdateButton />
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <div className="flex gap-4">
            <Link
              href="/products"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              View Products
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              View Blog
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 