import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '../services/auth.service';
import { userService } from '../services/user.service';
import { socketService } from '../services/socket.service';
import { LoginRequest, RegisterRequest, User } from '../types/api';
import { parseError } from '../utils/error-handler';

export const useAuthStore = defineStore('auth', () => {
     const user = ref<User | null>(null);
     const isLoading = ref(false);
     const error = ref<string | null>(null);
     const isAuthenticated = computed(() => !!user.value);

     async function login(data: LoginRequest) {
          isLoading.value = true;
          error.value = null;
          try {
               await authService.login(data);
               await fetchProfile();
               socketService.connect();
          } catch (err: any) {
               error.value = parseError(err);
               throw err;
          } finally {
               isLoading.value = false;
          }
     }

     async function register(data: RegisterRequest) {
          isLoading.value = true;
          error.value = null;
          try {
               await authService.register(data);
               // Optionally auto-login or redirect
          } catch (err: any) {
               error.value = parseError(err);
               throw err;
          } finally {
               isLoading.value = false;
          }
     }

     async function logout() {
          try {
               await authService.logout();
               user.value = null;
               socketService.disconnect();
          } catch (err) {
               console.error('Logout error:', err);
          }
     }

     async function fetchProfile() {
          try {
               const response = await userService.getProfile();
               user.value = response.data.data!;
               if (!socketService.connected) {
                    socketService.connect();
               }
          } catch (err) {
               user.value = null;
               throw err;
          }
     }

     return {
          user,
          isLoading,
          error,
          isAuthenticated,
          login,
          register,
          logout,
          fetchProfile
     };
});
