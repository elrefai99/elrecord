import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { env } from '../config/env';
import { AppError, parseError } from './error-handler';

// Create axios instance with base URL and credentials
const api = axios.create({
     baseURL: env.apiBaseUrl,
     headers: {
          'Content-Type': 'application/json',
     },
     withCredentials: true, // Send cookies with requests
});

// Request interceptor
api.interceptors.request.use(
     (config: InternalAxiosRequestConfig) => {
          // You can add additional headers here if needed
          // For cookie-based auth, we don't need to add Authorization header manually
          return config;
     },
     (error) => {
          return Promise.reject(error);
     }
);

// Response interceptor
api.interceptors.response.use(
     (response) => {
          return response;
     },
     async (error: AxiosError) => {
          const originalRequest = error.config;

          // Handle 401 Unauthorized errors (Token expired)
          // If we receive a 401 and haven't retried yet, try to refresh the token
          if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
               (originalRequest as any)._retry = true;

               try {
                    // Call refresh token endpoint
                    // The cookie will be sent automatically
                    await api.post('/auth/refresh');

                    // Retry the original request
                    return api(originalRequest);
               } catch (refreshError) {
                    // If refresh fails, let the caller handle it (usually redirects to login)
                    return Promise.reject(new AppError('Session expired. Please login again.', 401, refreshError));
               }
          }

          // Parse and return structured error
          const message = parseError(error);
          const statusCode = error.response?.status || 500;

          return Promise.reject(new AppError(message, statusCode, error));
     }
);

export default api;
