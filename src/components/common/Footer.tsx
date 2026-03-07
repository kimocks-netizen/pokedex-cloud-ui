'use client';

import { FaGithub, FaEnvelope, FaDatabase, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-white py-8 mt-auto border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              PokéDex Assessment
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              A resilient data pipeline demonstrating senior full-stack engineering principles. 
              Built with Next.js, Node.js, PostgreSQL, and AWS services.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Architecture
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center space-x-2">
                <FaDatabase className="text-blue-600 dark:text-blue-400" />
                <span>PostgreSQL + Prisma</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaShieldAlt className="text-blue-600 dark:text-blue-400" />
                <span>JWT Authentication</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaChartLine className="text-blue-600 dark:text-blue-400" />
                <span>Real-Time WebSocket</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li><Link href="/pokemon" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Browse Pokémon</Link></li>
              <li><Link href="/health" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">System Health</Link></li>
              <li><Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Developer
            </h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <a
                href="mailto:kimocks12@gmail.com"
                className="flex items-center space-x-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                <span>kimocks12@gmail.com</span>
              </a>
              
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://github.com/kimocks-netizen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xl"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="mailto:kimocks12@gmail.com"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xl"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} PokéDex Assessment - Planet42. 
            Developed by <span className="text-blue-600 dark:text-blue-400 font-semibold">Bryne Kimocks</span> | 
            <a 
              href="https://github.com/kimocks-netizen"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline ml-1"
            >
              View on GitHub
            </a>
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Senior Full Stack Assessment - Resilient Data Pipeline & Dashboard
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
