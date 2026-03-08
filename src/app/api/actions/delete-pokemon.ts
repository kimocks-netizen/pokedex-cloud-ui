'use server';

import { cookies } from 'next/headers';
import type { ApiResponse } from '@/lib/api-responses';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function deletePokemon(ids: number[]): Promise<ApiResponse<{ message: string; count: number }>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
      };
    }

    const response = await fetch(`${API_URL}/pokemon`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: false,
        error: { message: 'Failed to delete Pokemon', code: 'SYSTEM_ERROR' },
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Delete Pokemon API error:', error);
    return {
      success: false,
      error: { message: 'Failed to delete Pokemon', code: 'SYSTEM_ERROR' },
    };
  }
}

export async function deleteAllPokemon(): Promise<ApiResponse<{ message: string; count: number }>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
      };
    }

    const response = await fetch(`${API_URL}/pokemon/all`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: false,
        error: { message: 'Failed to delete all Pokemon', code: 'SYSTEM_ERROR' },
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Delete all Pokemon API error:', error);
    return {
      success: false,
      error: { message: 'Failed to delete all Pokemon', code: 'SYSTEM_ERROR' },
    };
  }
}
