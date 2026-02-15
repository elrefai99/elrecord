import api from '../utils/axios';
import { ApiResponse, User } from '../types/api';

export const userService = {
     async getProfile() {
          return api.get<ApiResponse<User>>('/user/profile');
     },

     // Add other user related endpoints here
};
