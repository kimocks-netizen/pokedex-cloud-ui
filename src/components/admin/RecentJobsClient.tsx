'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, XCircle, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Job {
  id: string;
  status: string;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  createdAt: string;
  errorMessage?: string | null;
}

interface Props {
  initialJobs: Job[];
  pagination: { page: number; limit: number; total: number; totalPages: number } | null;
}

export default function RecentJobsClient({ initialJobs, pagination }: Props) {
  const router = useRouter();
  const { lastMessage } = useWebSocket();
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  useEffect(() => {
    if (lastMessage?.type === 'ingestion_progress' || lastMessage?.type === 'ingestion_complete') {
      setJobs(prev => prev.map(job => 
        job.id === lastMessage.jobId 
          ? { 
              ...job, 
              processedRecords: lastMessage.processed,
              failedRecords: lastMessage.failed,
              status: lastMessage.status
            }
          : job
      ));
      
      if (lastMessage.type === 'ingestion_complete') {
        const timer = setTimeout(() => router.refresh(), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [lastMessage, router]);

  const page = pagination?.page || 1;
  const limit = pagination?.limit || 4;

  return (
    <Card className="lg:col-span-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Recent Jobs</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {jobs.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">No ingestion jobs yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => {
              const progress = job.totalRecords > 0 ? (job.processedRecords / job.totalRecords) * 100 : 0;
              const isRunning = job.status === 'running' || job.status === 'pending';
              const isCompleted = job.status === 'completed';
              const isFailed = job.status === 'failed';

              return (
                <div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {isRunning && <Loader2 className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />}
                      {isCompleted && <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />}
                      {isFailed && <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />}
                      <span className={`text-xs font-semibold uppercase ${
                        isRunning ? 'text-blue-600 dark:text-blue-400' :
                        isCompleted ? 'text-green-600 dark:text-green-400' :
                        isFailed ? 'text-red-600 dark:text-red-400' :
                        'text-gray-600 dark:text-gray-400'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(job.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {job.processedRecords} / {job.totalRecords}
                        {job.failedRecords > 0 && (
                          <span className="text-red-600 dark:text-red-400 ml-2">({job.failedRecords} failed)</span>
                        )}
                      </span>
                    </div>
                    
                    {job.totalRecords > 0 && (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isCompleted ? 'bg-green-600' :
                            isFailed ? 'bg-red-600' :
                            'bg-blue-600'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    )}

                    {job.errorMessage && (
                      <div className="flex items-start gap-2 mt-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700 dark:text-red-300">{job.errorMessage}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Showing {((page - 1) * limit) + 1}-{Math.min(page * limit, pagination.total)} of {pagination.total} jobs
            </p>
            
            <div className="flex items-center gap-2">
              <Link href={`/admin/ingestion?page=${page - 1}`}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <span className="px-4 py-2 text-sm font-bold text-gray-900 dark:text-white">
                {page} / {pagination.totalPages}
              </span>
              <Link href={`/admin/ingestion?page=${page + 1}`}>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= pagination.totalPages}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
