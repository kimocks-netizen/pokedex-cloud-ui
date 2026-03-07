'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Activity, Shield, Search, TrendingUp } from 'lucide-react';
import Mask from '@/components/Mask';

export default function HomePage() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const features = [
    {
      icon: <Database className="w-8 h-8 text-primary" />,
      title: "Resilient Data Pipeline",
      description: "Asynchronous ingestion from PokeAPI with retry logic and error handling"
    },
    {
      icon: <Activity className="w-8 h-8 text-primary" />,
      title: "Real-Time Monitoring",
      description: "Live system health dashboard with WebSocket updates"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure & Scalable",
      description: "JWT authentication with production-ready architecture"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/bg-images/bg-dark.png"
          alt="Background"
          fill
          priority
          quality={90}
          className="object-cover dark:block hidden"
        />
        <Image
          src="/bg-images/bg-light.png"
          alt="Background"
          fill
          priority
          quality={90}
          className="object-cover dark:hidden block"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-950/85 to-purple-950/90 dark:from-slate-900/90 dark:via-blue-950/85 dark:to-purple-950/90 hidden dark:block" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-indigo-500/25 to-purple-500/30 dark:hidden" />
      </div>

      <Mask particleCount={100} />

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-lg">
              Welcome to{' '}
              <span className="text-gray-900 dark:text-white">
                PokéDex
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-12 max-w-3xl mx-auto drop-shadow-lg">
              A resilient data pipeline and dashboard that ingests Pokémon data from PokeAPI, 
              processes it asynchronously, and serves it through a high-performance API.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/pokemon">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Search className="w-6 h-6 mr-3" />
                  Browse Pokémon
                </Button>
              </Link>
              <Link href="/health">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-4 border-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white hover:bg-transparent dark:hover:bg-transparent hover:text-gray-900 dark:hover:text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
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
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-lg">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-800 dark:text-gray-200 drop-shadow-lg">
                Everything you need for efficient data processing
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className={`transform transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md bg-white/30 dark:bg-slate-900/50 border-white/20 ${
                    isHovered === `feature-${index}` 
                      ? 'shadow-2xl' 
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                  onMouseEnter={() => setIsHovered(`feature-${index}`)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-800 dark:text-gray-200 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 drop-shadow-lg">
              Get Started Today
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link href="/pokemon">
                <Card 
                  className={`transform transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md bg-white/30 dark:bg-slate-900/50 border-white/20 ${
                    isHovered === 'pokemon' 
                      ? 'shadow-2xl' 
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                  onMouseEnter={() => setIsHovered('pokemon')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <CardContent className="p-8 text-center">
                    <Search className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Pokémon Database
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200 mb-4">
                      Browse, search, and filter through the complete Pokémon database
                    </p>
                    <Button variant="outline" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white hover:bg-transparent dark:hover:bg-transparent hover:text-gray-900 dark:hover:text-white backdrop-blur-sm">
                      Explore Pokémon
                    </Button>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/health">
                <Card 
                  className={`transform transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-md bg-white/30 dark:bg-slate-900/50 border-white/20 ${
                    isHovered === 'health' 
                      ? 'shadow-2xl' 
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                  onMouseEnter={() => setIsHovered('health')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <CardContent className="p-8 text-center">
                    <TrendingUp className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      System Health
                    </h3>
                    <p className="text-gray-800 dark:text-gray-200 mb-4">
                      Monitor ingestion jobs, system metrics, and real-time processing status
                    </p>
                    <Button>
                      View Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
