/**
 * Environment configuration
 */
export const env = {
     apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000/api/v1',
     socketUrl: import.meta.env.VITE_SOCKET_URL || 'http://localhost:9000',
     isDev: import.meta.env.DEV,
     isProd: import.meta.env.PROD,
};
