// frontend/components/Layout.tsx
'use client';

import React from 'react';
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

  // Public pages (login, register, home, health)
  const publicPages = ['/', '/login', '/register', '/health'];
  const isPublicPage = publicPages.includes(pathname);

  // If public page, show regular navbar
  if (isPublicPage) {
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

  // Protected pages - no wrapper, they use AppLayout themselves
  return <>{children}</>;
};

export default Layout;