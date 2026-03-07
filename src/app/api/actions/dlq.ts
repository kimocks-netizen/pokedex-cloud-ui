'use server';

import { cookies } from 'next/headers';
import type { ApiResponse } from '@/lib/api-responses';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export interface DLQStats {
  totalFailed: number;
  pendingRetry: number;
  retrying: number;
  permanentlyFailed: number;
  resolved: number;
}

export async function getDLQStats(): Promise<ApiResponse<DLQStats>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
      };
    }

    const response = await fetch(`${API_URL}/dlq/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: true,
        data: {
          totalFailed: 0,
          pendingRetry: 0,
          retrying: 0,
          permanentlyFailed: 0,
          resolved: 0,
        },
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('DLQ stats error:', error);
    return {
      success: true,
      data: {
        totalFailed: 0,
        pendingRetry: 0,
        retrying: 0,
        permanentlyFailed: 0,
        resolved: 0,
      },
    };
  }
}

export async function getDLQMessages() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await fetch(`${API_URL}/dlq/messages`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: 'Failed to fetch DLQ messages' };
  }
}

export async function retryDLQMessage(messageId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await fetch(`${API_URL}/dlq/messages/${messageId}/retry`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: 'Failed to retry message' };
  }
}
