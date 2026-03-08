'use server';

import { cookies } from 'next/headers';
import type { ApiResponse } from '@/lib/api-responses';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export interface DashboardStats {
  totalPokemon: number;
  recentIngestions: number;
  systemHealth: 'healthy' | 'degraded' | 'down';
  lastHealthCheck: string;
}

export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
      };
    }

    const [pokemonRes, healthRes, ingestionRes] = await Promise.all([
      fetch(`${API_URL}/pokemon?page=1&limit=1`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }),
      fetch(`${API_URL}/health`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }),
      fetch(`${API_URL}/ingestion/jobs?page=1&limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      }),
    ]);

    const pokemonData = await pokemonRes.json();
    const healthData = await healthRes.json();
    const ingestionData = await ingestionRes.json();

    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentJobs = ingestionData.data?.items?.filter((job: any) => 
      new Date(job.createdAt) > last24Hours
    ) || [];

    const stats: DashboardStats = {
      totalPokemon: pokemonData.data?.pagination?.total || 0,
      recentIngestions: recentJobs.length,
      systemHealth: healthRes.ok ? 'healthy' : 'down',
      lastHealthCheck: new Date().toISOString(),
    };

    return {
      success: true,
      data: stats,
    };
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return {
      success: false,
      error: { message: 'Failed to fetch dashboard stats', code: 'SYSTEM_ERROR' },
    };
  }
}
