'use client';

import { useEffect } from 'react';
import { Github, Mail, Database, Shield, TrendingUp, Activity, Lock, Home } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.footer-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <footer className="backdrop-blur-md bg-white/80 dark:bg-slate-900/30 border-t border-gray-300 dark:border-slate-700/50 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 footer-animate" style={{ transitionDelay: '0s' }}>
              <Image src="/logo.png" alt="PokéDex" width={150} height={50} className="object-contain" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 footer-animate" style={{ transitionDelay: '0.1s' }}>
              A resilient data pipeline demonstrating senior full-stack engineering principles. 
              Built with Next.js, Node.js, PostgreSQL, and AWS services.
            </p>
            <div className="flex gap-3 footer-animate" style={{ transitionDelay: '0.2s' }}>
              <a href="https://github.com/kimocks-netizen" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-primary/10 text-primary hover:scale-125 hover:rotate-12 transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:kimocks12@gmail.com" className="p-2 rounded-lg bg-primary/10 text-primary hover:scale-125 hover:rotate-12 transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-animate" style={{ transitionDelay: '0.15s' }}>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
              <li className="flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                <Link href="/" className="hover:text-primary transition-all hover:translate-x-2 inline-block">Home</Link>
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                <Link href="/pokemon" className="hover:text-primary transition-all hover:translate-x-2 inline-block">Browse Pokémon</Link>
              </li>
              <li className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <Link href="/health" className="hover:text-primary transition-all hover:translate-x-2 inline-block">System Health</Link>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                <Link href="/login" className="hover:text-primary transition-all hover:translate-x-2 inline-block">Login</Link>
              </li>
            </ul>
          </div>

          {/* Architecture */}
          <div className="footer-animate" style={{ transitionDelay: '0.25s' }}>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Architecture
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm">
              <li className="flex items-center gap-2 hover:text-primary transition-all hover:translate-x-2 cursor-pointer">
                <Database className="w-4 h-4 text-primary flex-shrink-0" /> 
                <span>PostgreSQL + Prisma</span>
              </li>
              <li className="flex items-center gap-2 hover:text-primary transition-all hover:translate-x-2 cursor-pointer">
                <Shield className="w-4 h-4 text-primary flex-shrink-0" /> 
                <span>JWT Authentication</span>
              </li>
              <li className="flex items-center gap-2 hover:text-primary transition-all hover:translate-x-2 cursor-pointer">
                <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" /> 
                <span>Real-Time WebSocket</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-slate-700/50 mt-8 pt-8">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm footer-animate" style={{ transitionDelay: '0.35s' }}>
              &copy; {new Date().getFullYear()} PokéDex Assessment - Planet42. 
              Developed by <a href="mailto:kimocks12@gmail.com" className="text-primary font-semibold hover:underline">Bryne Kimocks</a> | 
              <a 
                href="https://github.com/kimocks-netizen"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                View my GitHub (Portfolio)
              </a>
              <br />
              <span className="text-gray-500 dark:text-gray-500 text-xs mt-1 inline-block">
                Senior Full Stack Assessment - Resilient Data Pipeline & Dashboard
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
