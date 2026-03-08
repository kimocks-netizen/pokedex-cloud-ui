import { getDashboardStats } from '@/app/api/actions/dashboard';
import { isSuccessResponse } from '@/lib/api-responses';
import { Database, Activity, Heart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AppLayout } from '@/components/layout/AppLayout';
import RealtimeIngestionStatus from '@/components/realtime/RealtimeIngestionStatus';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const statsResponse = await getDashboardStats();
  const stats = isSuccessResponse(statsResponse) ? statsResponse.data : null;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your Pokémon system overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-blue-200 dark:border-blue-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Database className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                Total Pokémon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white transition-transform duration-300 group-hover:scale-105">
                {stats?.totalPokemon.toLocaleString() || '0'}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">In database</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-green-200 dark:border-green-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-green-400 dark:hover:border-green-600 cursor-pointer group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Activity className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                Recent Ingestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white transition-transform duration-300 group-hover:scale-105">
                {stats?.recentIngestions || '0'}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-purple-200 dark:border-purple-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-purple-400 dark:hover:border-purple-600 cursor-pointer group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Heart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold capitalize text-gray-900 dark:text-white transition-transform duration-300 group-hover:scale-105">
                {stats?.systemHealth || 'Unknown'}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">All systems operational</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-orange-200 dark:border-orange-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-orange-400 dark:hover:border-orange-600 cursor-pointer group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white transition-transform duration-300 group-hover:scale-105">1</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Currently online</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <RealtimeIngestionStatus />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-400 dark:hover:border-gray-500">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <Link href="/pokemon">
                  <Button className="w-full justify-start transition-all duration-200 hover:scale-105 hover:shadow-md dark:bg-accent dark:hover:bg-background" variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Browse Pokémon Database
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button className="w-full justify-start transition-all duration-200 hover:scale-105 hover:shadow-md dark:bg-accent dark:hover:bg-background" variant="outline">
                    <Activity className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-400 dark:hover:border-gray-500">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">System Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between transition-all duration-200 hover:translate-x-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">API Status</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">Online</span>
                </div>
                <div className="flex items-center justify-between transition-all duration-200 hover:translate-x-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Database</span>
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">Connected</span>
                </div>
                <div className="flex items-center justify-between transition-all duration-200 hover:translate-x-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Check</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {stats?.lastHealthCheck ? new Date(stats.lastHealthCheck).toLocaleTimeString() : 'N/A'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
