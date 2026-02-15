import api from '../utils/axios';
import { ApiResponse, LoginRequest, RegisterRequest, LoginResponse } from '../types/api';

export const authService = {
     async login(data: LoginRequest) {
          return api.post<ApiResponse<LoginResponse>>('/auth/login', data);
     },

     async register(data: RegisterRequest) {
          return api.post<ApiResponse<any>>('/auth/register', data);
     },

     async logout() {
          return api.post<ApiResponse<any>>('/auth/logout');
     },

     async refreshToken() {
          return api.post<ApiResponse<{ token: string }>>('/auth/refresh');
     },

     async forgotPassword(email: string) {
          return api.post<ApiResponse<any>>('/auth/forget-password', { email });
     },

     async resetPassword(password: string, token: string) {
          return api.post<ApiResponse<any>>('/auth/reset-password', { password, token });
     }
};
