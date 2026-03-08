'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/layout/ThemeContext';
import { AuthProvider } from '@/context/AuthProvider';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </AuthProvider>
    </ThemeProvider>
  );
}