import { getSystemHealth } from '@/app/api/actions/health';
import { getDLQStats } from '@/app/api/actions/dlq';
import { isSuccessResponse } from '@/lib/api-responses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Database, Activity, Server, Clock, AlertTriangle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';

export default async function SystemHealthPage() {
  const [healthResponse, dlqResponse] = await Promise.all([
    getSystemHealth(),
    getDLQStats(),
  ]);
  
  const health = isSuccessResponse(healthResponse) ? healthResponse.data : null;
  const dlqStats = isSuccessResponse(dlqResponse) ? dlqResponse.data : null;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">System Health Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor system status and performance metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Server className="h-4 w-4" />
                API Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {health?.apiStatus === 'online' ? (
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                )}
                <span className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
                  {health?.apiStatus || 'Unknown'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {health?.databaseStatus === 'connected' ? (
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                )}
                <span className="text-2xl font-bold capitalize text-gray-900 dark:text-white">
                  {health?.databaseStatus || 'Unknown'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-blue-200 dark:border-blue-800 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Total Pokémon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {health?.totalPokemon.toLocaleString() || '0'}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Records in database</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-orange-200 dark:border-orange-800 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                DLQ Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {dlqStats?.totalFailed || 0}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Failed messages</p>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-purple-200 dark:border-purple-800 rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Last Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {health?.lastCheck ? new Date(health.lastCheck).toLocaleTimeString() : 'N/A'}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {health?.lastCheck ? new Date(health.lastCheck).toLocaleDateString() : ''}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">System Components</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">REST API</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  health?.apiStatus === 'online'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {health?.apiStatus === 'online' ? 'Operational' : 'Down'}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">PostgreSQL Database</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  health?.databaseStatus === 'connected'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {health?.databaseStatus === 'connected' ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-900 dark:text-white">SQS Message Queue</span>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                  Operational
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">Dead Letter Queue</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {dlqStats?.totalFailed || 0} failed | {dlqStats?.pendingRetry || 0} pending | {dlqStats?.resolved || 0} resolved
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  (dlqStats?.totalFailed || 0) > 0
                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                }`}>
                  {(dlqStats?.totalFailed || 0) > 0 ? 'Attention' : 'Healthy'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
