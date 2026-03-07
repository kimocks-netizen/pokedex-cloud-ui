/**
 * Backend API Response Types for PokeDex
 */

export type ApiResponseCode = 
  | 'SUCCESS' 
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED' 
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'SYSTEM_ERROR';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: ApiResponseCode;
  };
}

/**
 * Helper to check if response is successful
 */
export function isSuccessResponse(response: ApiResponse): boolean {
  return response.success === true;
}

/**
 * Helper to check if response requires re-authentication
 */
export function requiresAuth(response: ApiResponse): boolean {
  return response.error?.code === 'UNAUTHORIZED';
}

/**
 * Helper to get error message from response
 */
export function getErrorMessage(response: ApiResponse): string {
  return response.error?.message || 'An unexpected error occurred';
}
