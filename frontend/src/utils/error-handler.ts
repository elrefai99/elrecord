import { AxiosError } from 'axios';

export interface ApiErrorResponse {
     message: string | string[];
     error?: string;
     statusCode?: number;
}

export class AppError extends Error {
     public statusCode: number;
     public originalError?: any;

     constructor(message: string, statusCode: number = 500, originalError?: any) {
          super(message);
          this.name = 'AppError';
          this.statusCode = statusCode;
          this.originalError = originalError;
     }
}

/**
 * Parse backend error response
 */
export const parseError = (error: any): string => {
     if (error instanceof AppError) {
          return error.message;
     }

     if (axiosIsError(error)) {
          const data = error.response?.data as ApiErrorResponse | undefined;

          if (data) {
               if (Array.isArray(data.message)) {
                    return data.message.join(', ');
               }
               if (typeof data.message === 'string') {
                    return data.message;
               }
               if (data.error) {
                    return data.error;
               }
          }

          if (error.message) {
               return error.message;
          }
     } else if (error instanceof Error) {
          return error.message;
     } else if (typeof error === 'string') {
          return error;
     }

     return 'An unexpected error occurred';
};

function axiosIsError(payload: any): payload is AxiosError {
     return payload && payload.isAxiosError === true;
}
