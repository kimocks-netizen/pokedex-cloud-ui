import { getCronJobs } from '@/app/api/actions/cron';
import { isSuccessResponse } from '@/lib/api-responses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, XCircle, Calendar, PlayCircle } from 'lucide-react';
import CronJobFormClient from '@/components/admin/CronJobFormClient';
import DeleteJobButton from '@/components/admin/DeleteJobButton';
import ToggleJobButton from '@/components/admin/ToggleJobButton';
import Image from 'next/image';

const JOB_DESCRIPTIONS: Record<string, string> = {
  'pokemon_ingestion': 'Automatically fetch and ingest Pokemon data from external API',
  'data_cleanup': 'Clean up old or invalid data from the database',
};

export default async function CronJobsPage() {
  const cronResponse = await getCronJobs();
  const jobs = isSuccessResponse(cronResponse) ? cronResponse.data.jobs : [];
  const total = isSuccessResponse(cronResponse) ? cronResponse.data.total : 0;

  return (
    <div className="min-h-screen relative">
      <Image src="/bg-images/bg-light.png" alt="" fill className="object-cover dark:hidden" priority />
      <Image src="/bg-images/bg-dark.png" alt="" fill className="object-cover hidden dark:block" priority />
      
      <div className="relative z-10 max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Cron Jobs</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and manage scheduled tasks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl lg:col-span-1">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Create New Job</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <CronJobFormClient />
            </CardContent>
          </Card>

          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl lg:col-span-2">
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
                  <div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
