import IngestionFormClient from '@/components/admin/IngestionFormClient';
import Image from 'next/image';

export default function IngestionPage() {
  return (
    <div className="min-h-screen relative">
      <Image src="/bg-images/bg-light.png" alt="" fill className="object-cover dark:hidden" priority />
      <Image src="/bg-images/bg-dark.png" alt="" fill className="object-cover hidden dark:block" priority />
      
      <div className="relative z-10 max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Manual Ingestion</h1>
          <p className="text-gray-600 dark:text-gray-400">Trigger manual Pokémon data ingestion jobs</p>
        </div>

        <IngestionFormClient />
      </div>
    </div>
  );
}
