'use server';

import { cookies } from 'next/headers';
import type { ApiResponse } from '@/lib/api-responses';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export interface IngestionResponse {
  message: string;
  jobId?: string;
}

export async function triggerIngestion(limit: number): Promise<ApiResponse<IngestionResponse>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
      };
    }

    const response = await fetch(`${API_URL}/ingestion/trigger`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ limit }),
      cache: 'no-store',
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Ingestion trigger error:', error);
    return {
      success: false,
      error: { message: 'Failed to trigger ingestion', code: 'SYSTEM_ERROR' },
    };
  }
}
