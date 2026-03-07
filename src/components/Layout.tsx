// frontend/components/Layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '../layout/ThemeContext';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const authToken = document.cookie.split('; ').find(row => row.startsWith('auth_token='));
      setIsAuthenticated(!!authToken);
    };
    checkAuth();
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, [pathname]);

  // Auth pages and home page that should not have layout wrapper
  const fullScreenPages = ['/login', '/register', '/', '/pokemon', '/dashboard', '/profile', '/admin'];
  const isFullScreenPage = fullScreenPages.includes(pathname) || pathname.startsWith('/pokemon') || pathname.startsWith('/dashboard') || pathname.startsWith('/profile') || pathname.startsWith('/admin');

  // Public pages where footer should be shown
  const publicPages = ['/health'];
  const isPublicPage = publicPages.includes(pathname);
  const showFooter = !isAuthenticated && isPublicPage;

  // If full screen page, render with navbar and footer
  if (isFullScreenPage) {
    return (
      <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;