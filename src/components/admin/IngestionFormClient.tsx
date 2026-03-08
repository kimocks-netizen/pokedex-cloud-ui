'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { triggerIngestion } from '@/app/api/actions/ingestion';
import { isSuccessResponse, getErrorMessage } from '@/lib/api-responses';
import { toast } from '@/lib/toast';
import { Loader2, Play, CheckCircle, XCircle } from 'lucide-react';

export default function IngestionFormClient() {
  const router = useRouter();
  const [limit, setLimit] = useState('100');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const limitNum = parseInt(limit);

    if (isNaN(limitNum) || limitNum < 1 || limitNum > 1000) {
      toast.error('Limit must be between 1 and 1000');
      return;
    }

    setIsLoading(true);
    setResult(null);

    const response = await triggerIngestion(limitNum);

    if (isSuccessResponse(response)) {
      const message = response.data?.message || `Ingestion started for ${limitNum} Pokémon`;
      const jobId = response.data?.jobId;
      setResult({ success: true, message });
      toast.success(message + (jobId ? ` (Job ID: ${jobId.slice(0, 8)}...)` : ''));
      router.refresh();
    } else {
      setResult({ success: false, message: getErrorMessage(response) });
      toast.error(getErrorMessage(response));
    }

    setIsLoading(false);
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg border-2 border-gray-200 dark:border-gray-700 rounded-2xl">
      <CardHeader className="border-b border-gray-200 dark:border-gray-700">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Trigger Manual Ingestion</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Start a manual Pokémon data ingestion job
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="limit" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Number of Pokémon to Ingest (1-1000)
            </Label>
            <Input
              id="limit"
              type="number"
              min="1"
              max="1000"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              disabled={isLoading}
              className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Enter the number of Pokémon records to fetch from the API
            </p>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting Ingestion...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Ingestion
              </>
            )}
          </Button>

          {result && (
            <div
              className={`p-4 rounded-xl border-2 ${
                result.success
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
                <p
                  className={`text-sm font-medium ${
                    result.success
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-red-700 dark:text-red-300'
                  }`}
                >
                  {result.message}
                </p>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
