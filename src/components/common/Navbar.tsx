// src/components/common/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '@/layout/ThemeContext';
import { Sun, Moon, Database, Menu, X, Activity, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Close mobile nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo + Title */}
            <Link href="/" className="text-xl font-bold flex items-center">
              <Database className="mr-2 h-6 w-6" />
              <span className="hidden sm:inline">PokéDex</span>
              <span className="sm:hidden">PokéDex</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  Home
                </Button>
              </Link>
             
              <Link href="/pokemon">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  Pokémon
                </Button>
              </Link>
              <Link href="/health">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Activity className="mr-2 h-4 w-4" />
                  System Health
                </Button>
              </Link>
              
              <Link href="/login">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Lock className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full bg-white/10 hover:bg-white/20"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsOpen(false)} />
          <div
            ref={mobileNavRef}
            className="fixed top-20 left-0 right-0 z-50 bg-blue-600 border-t border-blue-500 shadow-lg md:hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-2">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                  Home
                </Button>
              </Link>
            
              <Link href="/pokemon" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                  Pokémon
                </Button>
              </Link>
              <Link href="/health" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  System Health
                </Button>
              </Link>
              
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-white hover:bg-white/20 justify-start">
                  <Lock className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </>
      )}


    </>
  );
};

export default Navbar;