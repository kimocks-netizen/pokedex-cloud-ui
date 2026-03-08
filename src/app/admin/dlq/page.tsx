import { getDLQStats, getDLQMessages } from '@/app/api/actions/dlq';
import { isSuccessResponse } from '@/lib/api-responses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import RetryMessageButton from '@/components/admin/RetryMessageButton';
import { AppLayout } from '@/components/layout/AppLayout';

export const dynamic = 'force-dynamic';

export default async function DLQPage() {
  const dlqResponse = await getDLQStats();
  const stats = isSuccessResponse(dlqResponse) ? dlqResponse.data : null;
  
  const messagesResponse = await getDLQMessages();
  const messages = isSuccessResponse(messagesResponse) ? messagesResponse.data.items : [];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dead Letter Queue Monitoring</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage failed message processing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-red-200 dark:border-red-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Total Failed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.totalFailed || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Retry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.pendingRetry || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-blue-200 dark:border-blue-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Retrying
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.retrying || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Permanent Fail
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.permanentlyFailed || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-green-200 dark:border-green-800 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Resolved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats?.resolved || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl mt-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Failed Messages</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No failed messages</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">All messages are processing successfully</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Message ID</TableHead>
                      <TableHead>Error</TableHead>
                      <TableHead>Retry Count</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Failed At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((msg: any) => (
                      <TableRow key={msg.id} className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-200">
                        <TableCell className="font-mono text-xs">{msg.id}</TableCell>
                        <TableCell className="text-sm text-red-600 dark:text-red-400">{msg.error}</TableCell>
                        <TableCell>{msg.retryCount}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 rounded-full">
                            {msg.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{new Date(msg.failedAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <RetryMessageButton messageId={msg.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
