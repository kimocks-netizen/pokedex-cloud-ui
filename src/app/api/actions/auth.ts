'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ApiResponse } from '@/lib/api-responses';
import { ROUTES } from '@/lib/routes';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined in environment variables');
}

export async function loginUser(formData: FormData): Promise<ApiResponse> {
  try {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      cache: 'no-store',
    });

    const result = await response.json();

    if (result.success && result.data?.token) {
      const cookieStore = await cookies();
      
      cookieStore.set('auth_token', result.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      });

      cookieStore.set('user_data', JSON.stringify(result.data.user), {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return result;
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: {
        message: 'Network error. Please try again.',
        code: 'SYSTEM_ERROR',
      },
    };
  }
}

export async function registerUser(formData: FormData): Promise<ApiResponse> {
  try {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
      cache: 'no-store',
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: {
        message: 'Network error. Please try again.',
        code: 'SYSTEM_ERROR',
      },
    };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  cookieStore.delete('user_data');
  redirect(ROUTES.AUTH.LOGIN);
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value;
}

export async function getUserData(): Promise<any | null> {
  const cookieStore = await cookies();
  const userData = cookieStore.get('user_data')?.value;
  return userData ? JSON.parse(userData) : null;
}
