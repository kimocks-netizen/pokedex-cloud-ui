'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Database, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HealthData {
  status: string;
  timestamp: string;
  service: string;
  database: string;
}

export default function HealthPage() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
        const data = await response.json();
        if (data.success) {
          setHealth(data.data);
        } else {
          setError('Failed to fetch health status');
        }
      } catch (err) {
        setError('Unable to connect to API');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const isHealthy = health?.status === 'healthy' && health?.database === 'connected';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            System Health
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Basic health status of the PokéDex API
          </p>
        </div>

        {loading ? (
          <Card className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
            <CardContent className="p-8 text-center">
              <Activity className="w-12 h-12 mx-auto mb-4 animate-pulse text-primary" />
              <p className="text-gray-600 dark:text-gray-300">Loading health status...</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-red-200 dark:border-red-800">
            <CardContent className="p-8 text-center">
              <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <p className="text-red-600 dark:text-red-400 font-semibold mb-2">Error</p>
              <p className="text-gray-600 dark:text-gray-300">{error}</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className={`backdrop-blur-md bg-white/80 dark:bg-slate-900/80 mb-6 ${isHealthy ? 'border-green-200 dark:border-green-800' : 'border-red-200 dark:border-red-800'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {isHealthy ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-500" />
                  )}
                  <span className={isHealthy ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {isHealthy ? 'System Healthy' : 'System Unhealthy'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-primary" />
                    <span className="font-medium text-gray-900 dark:text-white">Service</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">{health?.service}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-primary" />
                    <span className="font-medium text-gray-900 dark:text-white">Database</span>
                  </div>
                  <span className={`font-semibold ${health?.database === 'connected' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {health?.database}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium text-gray-900 dark:text-white">Last Check</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {health?.timestamp ? new Date(health.timestamp).toLocaleString() : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
              <CardContent className="p-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  For detailed health metrics and monitoring, please login to access the full dashboard.
                </p>
                <Link href="/login">
                  <Button size="lg">
                    Login for Detailed Health
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
