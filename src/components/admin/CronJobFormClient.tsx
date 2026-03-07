'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createCronJob } from '@/app/api/actions/cron';
import { toast } from '@/lib/toast';
import { Plus } from 'lucide-react';

export default function CronJobFormClient() {
  const [jobType, setJobType] = useState('pokemon_ingestion');
  const [schedule, setSchedule] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!schedule.trim()) {
      toast.error('Please enter a cron schedule');
      return;
    }

    setLoading(true);
    const result = await createCronJob(jobType, schedule);
    setLoading(false);

    if (result.success) {
      toast.success('Cron job created successfully');
      setSchedule('');
    } else {
      toast.error(result.error || 'Failed to create cron job');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Job Type
        </label>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="pokemon_ingestion">Pokemon Ingestion</option>
          <option value="data_cleanup">Data Cleanup</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cron Schedule
        </label>
        <input
          type="text"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          placeholder="e.g., */5 * * * * (every 5 minutes)"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Format: minute hour day month weekday (e.g., 0 2 * * * = daily at 2 AM)
        </p>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? (
          'Creating...'
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Create Cron Job
          </>
        )}
      </Button>
    </form>
  );
}
