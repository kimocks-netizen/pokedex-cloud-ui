'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { retryDLQMessage } from '@/app/api/actions/dlq';
import { toast } from '@/lib/toast';
import { RefreshCw } from 'lucide-react';

export default function RetryMessageButton({ messageId }: { messageId: string }) {
  const [loading, setLoading] = useState(false);

  const handleRetry = async () => {
    setLoading(true);
    const result = await retryDLQMessage(messageId);
    setLoading(false);

    if (result.success) {
      toast.success('Message retry initiated');
    } else {
      toast.error(result.error || 'Failed to retry message');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleRetry}
      disabled={loading}
      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20"
    >
      <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
    </Button>
  );
}
