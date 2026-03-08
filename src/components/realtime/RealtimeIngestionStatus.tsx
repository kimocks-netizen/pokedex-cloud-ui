'use client';

import { useWebSocket } from '@/hooks/useWebSocket';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Wifi, WifiOff } from 'lucide-react';

interface IngestionProgress {
  type: 'ingestion_progress' | 'ingestion_complete';
  jobId: string;
  processed: number;
  total: number;
  failed: number;
  status: string;
}

export default function RealtimeIngestionStatus() {
  const router = useRouter();
  const { isConnected, lastMessage } = useWebSocket();
  const [currentJob, setCurrentJob] = useState<IngestionProgress | null>(null);

  useEffect(() => {
    if (lastMessage?.type === 'ingestion_progress' || lastMessage?.type === 'ingestion_complete') {
      setCurrentJob(lastMessage);
      
      if (lastMessage.type === 'ingestion_complete') {
        router.refresh();
        setTimeout(() => setCurrentJob(null), 5000);
      }
    }
  }, [lastMessage, router]);

  if (!currentJob) return null;

  const progress = currentJob.total > 0 ? (currentJob.processed / currentJob.total) * 100 : 0;

  return (
    <Card className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Activity className="h-4 w-4 animate-pulse" />
          Live Ingestion Progress
          {isConnected ? (
            <Wifi className="h-3 w-3 text-green-600" />
          ) : (
            <WifiOff className="h-3 w-3 text-red-600" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentJob.processed} / {currentJob.total}
              {currentJob.failed > 0 && (
                <span className="text-red-600 ml-2">({currentJob.failed} failed)</span>
              )}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Job ID: {currentJob.jobId.slice(0, 8)}...
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
