// src/app/(dashboard)/pokemon/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Search, Filter, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PokemonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Pokémon Database
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse, search, and filter through the complete Pokémon database
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full w-20 h-20 flex items-center justify-center">
              <Database className="w-10 h-10 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold">Coming Soon</CardTitle>
            <CardDescription className="text-lg">
              Pokémon list with server-side pagination
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                Planned Features:
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <Search className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Search Pokémon by name</span>
                </li>
                <li className="flex items-start">
                  <Filter className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Filter by type (Fire, Water, Grass, etc.)</span>
                </li>
                <li className="flex items-start">
                  <Database className="mr-2 h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Server-side pagination (20 items per page)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600 flex-shrink-0">📊</span>
                  <span>Sort by power score, name, or ID</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600 flex-shrink-0">🎨</span>
                  <span>Pokémon cards with sprites, types, and stats</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">🔥</div>
                  <p className="font-semibold text-gray-900 dark:text-white">Fire Type</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Filter example</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">💧</div>
                  <p className="font-semibold text-gray-900 dark:text-white">Water Type</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Filter example</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">🌿</div>
                  <p className="font-semibold text-gray-900 dark:text-white">Grass Type</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Filter example</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
