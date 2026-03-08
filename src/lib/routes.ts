export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  OVERVIEW: '/overview',
  POKEMON: {
    LIST: '/pokemon',
    DETAIL: (id: number) => `/pokemon/${id}`,
  },
  ADMIN: {
    INGESTION: '/admin/ingestion',
    JOBS: '/admin/jobs',
    DLQ: '/admin/dlq',
    SYSTEM_HEALTH: '/admin/system-health',
  },
  PROFILE: '/profile',
} as const;
