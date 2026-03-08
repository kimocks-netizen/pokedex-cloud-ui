'use server';

import { cookies } from 'next/headers';
import type { ApiResponse } from '@/lib/api-responses';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface IngestionJob {
  id: string;
  status: string;
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  startedAt: string | null;
  completedAt: string | null;
  errorMessage: string | null;
  createdAt: string;
}

export interface IngestionJobsResponse {
  jobs: IngestionJob[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TriggerIngestionResponse {
  jobId: string;
  totalRecords: number;
  message: string;
}

export async function triggerIngestion(limit: number): Promise<ApiResponse<TriggerIngestionResponse>> {
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

    if (!response.ok) {
      return {
        success: false,
        error: { message: 'Failed to trigger ingestion', code: 'SYSTEM_ERROR' },
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Trigger ingestion API error:', error);
    return {
      success: false,
      error: { message: 'Failed to trigger ingestion', code: 'SYSTEM_ERROR' },
    };
  }
}

export async function getIngestionJobs(page = 1, limit = 10): Promise<ApiResponse<IngestionJobsResponse>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
      };
    }

    const response = await fetch(`${API_URL}/ingestion/jobs?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: false,
        error: { message: 'Failed to fetch ingestion jobs', code: 'SYSTEM_ERROR' },
      };
    }

    const result = await response.json();
    
    // Backend returns { items, pagination }, transform to { jobs, pagination }
    if (result.success && result.data) {
      return {
        success: true,
        data: {
          jobs: result.data.items || [],
          pagination: {
            total: result.data.pagination?.total || 0,
            page: result.data.pagination?.page || 1,
            limit: result.data.pagination?.limit || 10,
            totalPages: result.data.pagination?.totalPages || 0,
          },
        },
      };
    }
    
    return result;
  } catch (error) {
    console.error('Ingestion jobs API error:', error);
    return {
      success: false,
      error: { message: 'Failed to fetch ingestion jobs', code: 'SYSTEM_ERROR' },
    };
  }
}
