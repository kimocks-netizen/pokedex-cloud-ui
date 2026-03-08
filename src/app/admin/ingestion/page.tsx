import IngestionFormClient from '@/components/admin/IngestionFormClient';
import RecentJobsClient from '@/components/admin/RecentJobsClient';
import { AppLayout } from '@/components/layout/AppLayout';
import { getIngestionJobs } from '@/app/api/actions/ingestion';
import { isSuccessResponse } from '@/lib/api-responses';
import RealtimeIngestionStatus from '@/components/realtime/RealtimeIngestionStatus';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function IngestionPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = 4;
  
  const jobsResponse = await getIngestionJobs(page, limit);
  const jobs = isSuccessResponse(jobsResponse) && jobsResponse.data ? jobsResponse.data.jobs : [];
  const pagination = isSuccessResponse(jobsResponse) && jobsResponse.data ? jobsResponse.data.pagination : null;
  


  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Manual Ingestion</h1>
          <p className="text-gray-600 dark:text-gray-400">Trigger manual Pokémon data ingestion jobs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <IngestionFormClient />
            <RealtimeIngestionStatus />
          </div>

          <RecentJobsClient initialJobs={jobs} pagination={pagination} />
        </div>
      </div>
    </AppLayout>
  );
}
