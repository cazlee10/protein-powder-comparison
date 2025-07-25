'use client'

import { AuthProvider } from '@/lib/contexts/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {/* Wrap with any necessary context providers here */}
      {children}
    </AuthProvider>
  );
} 