// src/app/(dashboard)/health/page.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, Database, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function HealthPage() {
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
            System Health Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor ingestion jobs, system metrics, and real-time processing status
          </p>
        </div>

        {/* Coming Soon Card */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-green-100 dark:bg-green-900/20 rounded-full w-20 h-20 flex items-center justify-center">
              <Activity className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold">Coming Soon</CardTitle>
            <CardDescription className="text-lg">
              Real-time system health monitoring with WebSocket updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                Planned Features:
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Real-time ingestion job progress (WebSocket)</span>
                </li>
                <li className="flex items-start">
                  <Database className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Total Pokémon count and database metrics</span>
                </li>
                <li className="flex items-start">
                  <Activity className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Active jobs and processing status</span>
                </li>
                <li className="flex items-start">
                  <Zap className="mr-2 h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Failed records and retry queue (DLQ)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600 flex-shrink-0">📊</span>
                  <span>Job history with success/failure rates</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600 flex-shrink-0">⚡</span>
                  <span>Live progress bars and status indicators</span>
                </li>
              </ul>
            </div>

            {/* Mock Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pokémon</p>
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">---</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Coming soon</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Jobs</p>
                    <Activity className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">---</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Coming soon</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Failed Records</p>
                    <Zap className="h-5 w-5 text-orange-600" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">---</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Coming soon</p>
                </CardContent>
              </Card>
            </div>

            {/* Mock Progress Bar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Ingestion Job</CardTitle>
                <CardDescription>Real-time progress tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Status:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Waiting for backend...</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full animate-pulse" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-500 text-center">
                    WebSocket connection will provide live updates
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
