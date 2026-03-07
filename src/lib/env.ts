// Environment utility functions
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export const getApiUrl = () => {
  // Use environment variable or throw error
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!envUrl) {
    throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
  }
  
  return envUrl;
};

export const getEnvironment = () => {
  if (isDevelopment) return 'development';
  if (isProduction) return 'production';
  return 'unknown';
};

export const isLocalhost = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1';
};

export const isProductionDomain = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname !== 'localhost' && 
         window.location.hostname !== '127.0.0.1';
};

export const isVercel = () => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.includes('vercel.app');
};

export const getCurrentApiUrl = () => {
  return getApiUrl();
};
