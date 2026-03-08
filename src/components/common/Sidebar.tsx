'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  User, 
  Upload, 
  Users, 
  AlertTriangle, 
  Clock, 
  Activity,
  Database,
  Zap,
} from 'lucide-react';
import {
  Sidebar as VSidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/vsidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/overview', icon: LayoutDashboard, label: 'Overview' },
  { href: '/pokemon', icon: Database, label: 'Pokémon' },
];

const adminItems = [
  { href: '/admin/ingestion', icon: Upload, label: 'Manual Ingestion' }, 
  { href: '/admin/dlq', icon: AlertTriangle, label: 'Failed Messages' },
  { href: '/admin/cron-jobs', icon: Clock, label: 'Scheduled Ingestion' },
  { href: '/admin/system-health', icon: Activity, label: 'System Health' },
  { href: '/performance', icon: Zap, label: 'Performance' },
   { href: '/admin/users', icon: Users, label: 'Users' },
];

const profileItem = { href: '/profile', icon: User, label: 'Profile' };

export default function Sidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [isAdmin, setIsAdmin] = useState(false);
  
  const isIconMode = state === "icon";

  useEffect(() => {
    // Read user role from cookie
    const userDataCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('user_data='));
    
    if (userDataCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]));
        setIsAdmin(userData.role === 'admin');
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const allItems = useMemo(() => {
    const items = isAdmin ? [...navItems, ...adminItems] : navItems;
    return [...items, profileItem];
  }, [isAdmin]);

  return (
    <VSidebar className="bg-white dark:bg-slate-900/95 backdrop-blur-3xl border-r border-gray-200 dark:border-blue-400/20 text-gray-700 dark:text-gray-300 h-full transition-all duration-300 rounded-lg">
      <SidebarHeader className="p-4 border-b border-gray-200 dark:border-blue-400/20 bg-transparent flex items-center justify-center">
        <Link href="/" className={cn("flex items-center gap-2", isIconMode && "justify-center")}>
          {isIconMode ? (
            <Image src="/logo-small.png" alt="PokéDex" width={40} height={40} className="object-contain" />
          ) : (
            <Image src="/logo.png" alt="PokéDex" width={150} height={50} className="object-contain" />
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        <div className={cn("px-3 py-4", isIconMode && "px-2")}>
          <nav className="space-y-1">
            {allItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              
              if (isIconMode) {
                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center justify-center p-3 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", isActive ? "text-blue-600 dark:text-blue-400" : "text-blue-600 dark:text-blue-400")} />
                    </Link>
                    <span className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 px-4 py-2.5 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white text-sm font-medium rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[9999] border border-blue-400/30">
                      <Icon className="inline h-4 w-4 mr-2 opacity-90" />
                      {item.label}
                      <span className="absolute right-full top-1/2 -translate-y-1/2 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-blue-600"></span>
                    </span>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold"
                      : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                  )}
                >
                  <Icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-blue-600 dark:text-blue-400" : "text-blue-600 dark:text-blue-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </SidebarContent>
    </VSidebar>
  );
}
