'use server';

import { cookies } from 'next/headers';
import { getApiUrl } from '@/lib/env';
import { revalidatePath } from 'next/cache';

export async function getCronJobs() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await fetch(`${getApiUrl()}/jobs`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: 'Failed to fetch cron jobs' };
  }
}

export async function createCronJob(jobType: string, schedule: string, pokemonLimit: number = 151) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await fetch(`${getApiUrl()}/jobs/schedule`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobType, schedule, pokemonLimit }),
    });

    const result = await response.json();
    
    if (result.success) {
      revalidatePath('/admin/cron-jobs');
    }
    
    return result;
  } catch (error) {
    return { success: false, error: 'Failed to create cron job' };
  }
}

export async function toggleCronJob(jobId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await fetch(`${getApiUrl()}/jobs/${jobId}/toggle`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    
    if (result.success) {
      revalidatePath('/admin/cron-jobs');
    }
    
    return result;
  } catch (error) {
    return { success: false, error: 'Failed to toggle cron job' };
  }
}

export async function deleteCronJob(jobId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await fetch(`${getApiUrl()}/jobs/${jobId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    
    if (result.success) {
      revalidatePath('/admin/cron-jobs');
    }
    
    return result;
  } catch (error) {
    return { success: false, error: 'Failed to delete cron job' };
  }
}
