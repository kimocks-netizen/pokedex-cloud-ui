'use server';

import { cookies } from 'next/headers';
import type { ApiResponse } from '@/lib/api-responses';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  powerScore: number;
}

export interface PokemonListResponse {
  pokemon: Pokemon[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PokemonFilters {
  search?: string;
  type?: string;
  sortBy?: 'id' | 'name' | 'powerScore';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

function transformPokemon(item: any): Pokemon {
  const stats = item.stats || [];
  const hp = stats.find((s: any) => s.statName === 'hp')?.baseStat || 0;
  const attack = stats.find((s: any) => s.statName === 'attack')?.baseStat || 0;
  const defense = stats.find((s: any) => s.statName === 'defense')?.baseStat || 0;
  const speed = stats.find((s: any) => s.statName === 'speed')?.baseStat || 0;
  const types = (item.types || []).map((t: any) => t.typeName);

  return {
    id: item.id,
    name: item.name,
    types,
    sprite: item.spriteUrl,
    hp,
    attack,
    defense,
    speed,
    powerScore: parseInt(item.powerScore) || 0,
  };
}

export async function getPokemonList(filters: PokemonFilters = {}): Promise<ApiResponse<PokemonListResponse>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
      };
    }

    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.type) params.append('type', filters.type);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    params.append('page', String(filters.page || 1));
    params.append('limit', String(filters.limit || 20));

    const response = await fetch(`${API_URL}/pokemon?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: false,
        error: { message: 'Failed to fetch Pokemon', code: 'SYSTEM_ERROR' },
      };
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      return {
        success: false,
        error: { message: 'Invalid response from server', code: 'SYSTEM_ERROR' },
      };
    }

    const items = result.data.items || [];
    const pagination = result.data.pagination || {};

    return {
      success: true,
      data: {
        pokemon: items.map(transformPokemon),
        total: pagination.total || 0,
        page: pagination.page || 1,
        limit: pagination.limit || 20,
        totalPages: pagination.totalPages || 0,
      },
    };
  } catch (error) {
    console.error('Pokemon API error:', error);
    return {
      success: false,
      error: { message: 'Failed to fetch Pokemon', code: 'SYSTEM_ERROR' },
    };
  }
}

export async function getPokemonTypes(): Promise<ApiResponse<string[]>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
      };
    }

    const response = await fetch(`${API_URL}/pokemon/types`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'force-cache',
    });

    if (!response.ok) {
      return {
        success: true,
        data: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
      };
    }

    const result = await response.json();
    
    if (result.success && result.data) {
      return result;
    }

    return {
      success: true,
      data: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
    };
  } catch (error) {
    console.error('Pokemon types API error:', error);
    return {
      success: true,
      data: ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'],
    };
  }
}

export async function getPokemonById(id: number): Promise<ApiResponse<Pokemon>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return {
        success: false,
        error: { message: 'Authentication required', code: 'UNAUTHORIZED' },
      };
    }

    const response = await fetch(`${API_URL}/pokemon/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        success: false,
        error: { message: 'Pokemon not found', code: 'NOT_FOUND' },
      };
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      return {
        success: false,
        error: { message: 'Invalid response', code: 'SYSTEM_ERROR' },
      };
    }

    return {
      success: true,
      data: transformPokemon(result.data),
    };
  } catch (error) {
    console.error('Pokemon detail API error:', error);
    return {
      success: false,
      error: { message: 'Failed to fetch Pokemon', code: 'SYSTEM_ERROR' },
    };
  }
}
