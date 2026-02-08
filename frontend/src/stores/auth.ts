
import { defineStore } from 'pinia';
import api from '../utils/axios';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
     const user = ref<any>(null);
     const token = ref<string | null>(localStorage.getItem('access_token'));
     const isAuthenticated = computed(() => !!token.value);

     async function login(data: any) {
          try {
               const response = await api.post('/auth/login', data); // using updated baseURL
               // Adjust based on your API response structure
               token.value = response.data.token;
               if (token.value) {
                    localStorage.setItem('access_token', token.value);
               }
               await fetchProfile();
          } catch (error) {
               throw error;
          }
     }

     async function register(data: any) {
          try {
               await api.post('/auth/register', data);
               // After register, you might want to auto-login or redirect to login
          } catch (error) {
               throw error;
          }
     }

     async function fetchProfile() {
          if (!token.value) return;
          try {
               const response = await api.get('/user/profile');
               user.value = response.data;
          } catch (error) {
               // handle error, maybe logout if 401
               console.error(error);
               logout();
          }
     }

     function logout() {
          token.value = null;
          user.value = null;
          localStorage.removeItem('access_token');
          // also call backend logout if needed
          api.post('/auth/logout').catch(() => { });
     }

     return {
          user,
          token,
          isAuthenticated,
          login,
          register,
          fetchProfile,
          logout
     };
});
