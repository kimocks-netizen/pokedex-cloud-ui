'use client';

import React from 'react';
import Image from 'next/image';
import { SidebarProvider } from '@/components/ui/vsidebar';
import Sidebar from '@/components/common/Sidebar';
import DashboardHeader from '@/components/common/DashboardHeader';
import Mask from '@/components/Mask';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex overflow-visible relative">
        {/* Background Images */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/bg-images/bg-light.png"
            alt="Background"
            fill
            priority
            quality={90}
            className="object-cover dark:hidden"
          />
          <Image
            src="/bg-images/bg-dark.png"
            alt="Background"
            fill
            priority
            quality={90}
            className="object-cover hidden dark:block"
          />
        </div>

        {/* Mask Animation */}
        <Mask particleCount={100} />

        <div className="min-h-screen w-full flex overflow-visible relative bg-gray-50/50 dark:bg-gray-900/50">
          {/* Sidebar - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block sticky top-0 h-screen p-4 overflow-visible z-10">
            <Sidebar />
          </div>

          {/* Main Content Area - Scrollable */}
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
            {/* Header - Fixed */}
            <div className="flex-shrink-0">
              <DashboardHeader />
            </div>
            
            {/* Page Content - Scrollable */}
            <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6 overflow-y-auto">
              {children}
            </main>
          </div>
          
          {/* Mobile Sidebar Overlay */}
          <div className="lg:hidden">
            <Sidebar />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
