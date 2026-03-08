'use client';

import { SidebarTrigger } from '@/components/ui/vsidebar';
import { Button } from '@/components/ui/button';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '@/layout/ThemeContext';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/api/actions/auth';
import { toast } from '@/lib/toast';
import { ROUTES } from '@/lib/routes';

export default function DashboardHeader() {
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.push(ROUTES.AUTH.LOGIN);
  };

  return (
    <header className="mt-2 z-50 w-full px-2">
      <div className="ml-auto w-fit flex h-10 items-center gap-2 border border-gray-200 dark:border-blue-400/20 bg-white dark:bg-slate-900/95 backdrop-blur-3xl rounded-lg px-2" style={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <SidebarTrigger />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 h-8 w-8"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="gap-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 h-8 px-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-xs">Logout</span>
        </Button>
      </div>
    </header>
  );
}
