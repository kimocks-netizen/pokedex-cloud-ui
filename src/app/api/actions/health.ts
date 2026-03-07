'use server';

import { cookies } from 'next/headers';
import type { ApiResponse } from '@/lib/api-responses';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export interface SystemHealth {
  apiStatus: 'online' | 'offline';
  databaseStatus: 'connected' | 'disconnected';
  totalPokemon: number;
  lastCheck: string;
}

export async function getSystemHealth(): Promise<ApiResponse<SystemHealth>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
      };
    }

    const [healthRes, pokemonRes] = await Promise.all([
      fetch(`${API_URL}/health`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }),
      fetch(`${API_URL}/pokemon?page=1&limit=1`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }),
    ]);

    const pokemonData = await pokemonRes.json();

    return {
      success: true,
      data: {
        apiStatus: healthRes.ok ? 'online' : 'offline',
        databaseStatus: healthRes.ok ? 'connected' : 'disconnected',
        totalPokemon: pokemonData.data?.pagination?.total || 0,
        lastCheck: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('System health error:', error);
    return {
      success: false,
      error: { message: 'Failed to fetch system health', code: 'SYSTEM_ERROR' },
    };
  }
}
