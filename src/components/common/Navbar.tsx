'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/layout/ThemeContext';
import { Sun, Moon, Database, Menu, X, Activity, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/api/actions/auth';
import { toast } from '@/lib/toast';
import { ROUTES } from '@/lib/routes';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Determine if user is authenticated based on current route
  // If user is on a protected route, they must be authenticated (middleware ensures this)
  const protectedRoutes = ['/dashboard', '/pokemon', '/admin', '/profile'];
  const isAuthenticated = protectedRoutes.some(route => pathname.startsWith(route));

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    router.push(ROUTES.AUTH.LOGIN);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <nav className="backdrop-blur-md bg-white/80 dark:bg-slate-900/30 border-b border-gray-300 dark:border-slate-700/50 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
              <Database className="mr-2 h-6 w-6" />
              <span className="hidden sm:inline">PokéDex</span>
              <span className="sm:hidden">PokéDex</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10">
                  Home
                </Button>
              </Link>
             
              <Link href="/pokemon">
                <Button variant="ghost" className="text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10">
                  Pokémon
                </Button>
              </Link>
              <Link href="/health">
                <Button variant="ghost" className="text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10">
                  <Activity className="mr-2 h-4 w-4" />
                  System Health
                </Button>
              </Link>
              
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  className="text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10">
                    <Lock className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-gray-900 dark:text-white"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-gray-900 dark:text-white"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full bg-white/20 dark:bg-white/10 hover:bg-white/30 dark:hover:bg-white/20 text-gray-900 dark:text-white"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsOpen(false)} />
          <div
            ref={mobileNavRef}
            className="fixed top-16 left-0 right-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-white/20 dark:border-slate-700/50 shadow-lg md:hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-2">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10 justify-start">
                  Home
                </Button>
              </Link>
            
              <Link href="/pokemon" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10 justify-start">
                  Pokémon
                </Button>
              </Link>
              <Link href="/health" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10 justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  System Health
                </Button>
              </Link>
              
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10 justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10 justify-start">
                    <Lock className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
