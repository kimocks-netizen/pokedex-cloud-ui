// src/app/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Activity, Zap, Shield, TrendingUp, Search } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const features = [
    {
      icon: <Database className="w-8 h-8 text-blue-600" />,
      title: "Resilient Data Pipeline",
      description: "Asynchronous ingestion from PokeAPI with retry logic and error handling"
    },
    {
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      title: "Real-Time Monitoring",
      description: "Live system health dashboard with WebSocket updates"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure & Scalable",
      description: "JWT authentication with production-ready architecture"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              PokéDex
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            A resilient data pipeline and dashboard that ingests Pokémon data from PokeAPI, 
            processes it asynchronously, and serves it through a high-performance API.
          </p>
          
          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link href="/pokemon">
              <Button 
                size="lg" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Search className="w-6 h-6 mr-3" />
                Browse Pokémon
              </Button>
            </Link>
            <Link href="/health">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Activity className="w-6 h-6 mr-3" />
                System Health
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need for efficient document processing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isHovered === `feature-${index}` 
                    ? 'shadow-2xl border-blue-300 dark:border-blue-600' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
                onMouseEnter={() => setIsHovered(`feature-${index}`)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full w-16 h-16 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 dark:text-gray-400 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Get Started Today
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/pokemon">
              <Card 
                className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isHovered === 'pokemon' 
                    ? 'shadow-2xl border-blue-300 dark:border-blue-600' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
                onMouseEnter={() => setIsHovered('pokemon')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <CardContent className="p-8 text-center">
                  <Search className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Pokémon Database
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Browse, search, and filter through the complete Pokémon database
                  </p>
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                    Explore Pokémon
                  </Button>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/health">
              <Card 
                className={`transform transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isHovered === 'health' 
                    ? 'shadow-2xl border-blue-300 dark:border-blue-600' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
                onMouseEnter={() => setIsHovered('health')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <CardContent className="p-8 text-center">
                  <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    System Health
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Monitor ingestion jobs, system metrics, and real-time processing status
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    View Dashboard
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}