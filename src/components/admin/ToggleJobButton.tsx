'use client';

import { useState } from 'react';
import { toggleCronJob } from '@/app/api/actions/cron';
import { toast } from '@/lib/toast';

export default function ToggleJobButton({ jobId, enabled }: { jobId: string; enabled: boolean }) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const result = await toggleCronJob(jobId);
    setLoading(false);

    if (result.success) {
      toast.success(`Job ${enabled ? 'disabled' : 'enabled'} successfully`);
    } else {
      toast.error(result.error || 'Failed to toggle job');
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
      } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
