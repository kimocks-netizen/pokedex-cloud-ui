import { getCronJobs } from '@/app/api/actions/cron';
import { isSuccessResponse } from '@/lib/api-responses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, XCircle, Calendar, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import CronJobFormClient from '@/components/admin/CronJobFormClient';
import DeleteJobButton from '@/components/admin/DeleteJobButton';
import ToggleJobButton from '@/components/admin/ToggleJobButton';
import { AppLayout } from '@/components/layout/AppLayout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

const JOB_DESCRIPTIONS: Record<string, string> = {
  'pokemon_ingestion': 'Automatically fetch and ingest Pokemon data from external API',
  'data_cleanup': 'Clean up old or invalid data from the database',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CronJobsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 4;
  
  const cronResponse = await getCronJobs();
  console.log('Cron response:', JSON.stringify(cronResponse, null, 2));
  const allJobs = isSuccessResponse(cronResponse) ? cronResponse.data.jobs : [];
  const total = allJobs.length;
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const jobs = allJobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(total / limit);
  
  console.log('Jobs:', jobs, 'Total:', total);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Cron Jobs</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage scheduled tasks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl lg:col-span-1 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Create New Job</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CronJobFormClient />
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl lg:col-span-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Scheduled Jobs ({total})</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500 dark:text-gray-400 text-lg">No cron jobs configured</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Scheduled tasks will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job: any) => (
                  <div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                            {job.jobType.replace(/_/g, ' ')}
                          </h3>
                          {job.enabled === true ? (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Enabled
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400 rounded-full flex items-center gap-1">
                              <XCircle className="w-3 h-3" />
                              Disabled
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {JOB_DESCRIPTIONS[job.jobType] || 'Scheduled task'}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span className="font-mono">{job.schedule}</span>
                          </div>
                          {job.nextRun && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              <PlayCircle className="w-4 h-4" />
                              Next: {new Date(job.nextRun).toLocaleString()}
                            </div>
                          )}
                          {job.lastRun && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              Last: {new Date(job.lastRun).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ToggleJobButton jobId={job.id} enabled={job.enabled} />
                        <DeleteJobButton jobId={job.id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Showing {startIndex + 1}-{Math.min(endIndex, total)} of {total} jobs
                </p>
                
                <div className="flex items-center gap-2">
                  <Link href={`/admin/cron-jobs?page=${page - 1}`}>
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
                    {page} / {totalPages}
                  </span>
                  <Link href={`/admin/cron-jobs?page=${page + 1}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= totalPages}
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
        </div>
      </div>
    </AppLayout>
  );
}
