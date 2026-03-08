import IngestionFormClient from '@/components/admin/IngestionFormClient';
import { AppLayout } from '@/components/layout/AppLayout';

export default function IngestionPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Manual Ingestion</h1>
          <p className="text-gray-600 dark:text-gray-400">Trigger manual Pokémon data ingestion jobs</p>
        </div>

        <IngestionFormClient />
      </div>
    </AppLayout>
  );
}
