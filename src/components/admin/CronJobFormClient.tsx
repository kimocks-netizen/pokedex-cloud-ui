'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createCronJob } from '@/app/api/actions/cron';
import { toast } from '@/lib/toast';
import { Plus } from 'lucide-react';

type ScheduleType = 'minutes' | 'hours' | 'daily' | 'custom';

export default function CronJobFormClient() {
  const [jobType, setJobType] = useState('pokemon_ingestion');
  const [scheduleType, setScheduleType] = useState<ScheduleType>('minutes');
  const [intervalValue, setIntervalValue] = useState('5');
  const [pokemonLimit, setPokemonLimit] = useState('151');
  const [customSchedule, setCustomSchedule] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCronExpression = (): string => {
    switch (scheduleType) {
      case 'minutes':
        return `*/${intervalValue} * * * *`;
      case 'hours':
        return `0 */${intervalValue} * * *`;
      case 'daily':
        return `0 ${intervalValue} * * *`; // Daily at specific hour
      case 'custom':
        return customSchedule;
      default:
        return '';
    }
  };

  const getScheduleDescription = (): string => {
    switch (scheduleType) {
      case 'minutes':
        return `Every ${intervalValue} minute${intervalValue !== '1' ? 's' : ''}`;
      case 'hours':
        return `Every ${intervalValue} hour${intervalValue !== '1' ? 's' : ''}`;
      case 'daily':
        return `Daily at ${intervalValue}:00`;
      case 'custom':
        return customSchedule;
      default:
        return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cronExpression = generateCronExpression();
    
    if (!cronExpression.trim()) {
      toast.error('Please configure a valid schedule');
      return;
    }

    setLoading(true);
    const result = await createCronJob(jobType, cronExpression, parseInt(pokemonLimit));
    setLoading(false);

    if (result.success) {
      toast.success(`Cron job scheduled: ${getScheduleDescription()}`);
      setIntervalValue('5');
      setPokemonLimit('151');
      setCustomSchedule('');
      window.location.reload();
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
          Schedule Type
        </label>
        <select
          value={scheduleType}
          onChange={(e) => setScheduleType(e.target.value as ScheduleType)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="minutes">Every X Minutes</option>
          <option value="hours">Every X Hours</option>
          <option value="daily">Daily at Specific Hour</option>
          <option value="custom">Custom Cron Expression</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Pokemon Limit (1-1000)
        </label>
        <input
          type="number"
          min="1"
          max="1000"
          value={pokemonLimit}
          onChange={(e) => setPokemonLimit(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {scheduleType !== 'custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {scheduleType === 'minutes' && 'Minutes (1-59)'}
            {scheduleType === 'hours' && 'Hours (1-23)'}
            {scheduleType === 'daily' && 'Hour of Day (0-23)'}
          </label>
          <input
            type="number"
            min={scheduleType === 'daily' ? '0' : '1'}
            max={scheduleType === 'minutes' ? '59' : '23'}
            value={intervalValue}
            onChange={(e) => setIntervalValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {scheduleType === 'custom' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cron Expression
          </label>
          <input
            type="text"
            value={customSchedule}
            onChange={(e) => setCustomSchedule(e.target.value)}
            placeholder="e.g., */5 * * * * (every 5 minutes)"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Format: minute hour day month weekday
          </p>
        </div>
      )}

      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
          Schedule: {getScheduleDescription()}
        </p>
        <p className="text-xs text-blue-700 dark:text-blue-400 mt-1 font-mono">
          Cron: {generateCronExpression()}
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
