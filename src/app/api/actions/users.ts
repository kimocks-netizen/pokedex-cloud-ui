'use server';

import { cookies } from 'next/headers';
import { getApiUrl } from '@/lib/env';

export async function getUsers() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    const response = await fetch(`${getApiUrl()}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    return { success: false, error: 'Failed to fetch users' };
  }
}
