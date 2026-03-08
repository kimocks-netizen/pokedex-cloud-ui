const DEFAULT_API_URL = 'https://1o7s4ez9j2.execute-api.af-south-1.amazonaws.com/Prod';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;

if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn('NEXT_PUBLIC_API_URL not set, using default:', DEFAULT_API_URL);
}
