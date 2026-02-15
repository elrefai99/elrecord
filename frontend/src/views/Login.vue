<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';

const router = useRouter();
const authStore = useAuthStore();
const { isLoading, error } = storeToRefs(authStore);

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push('/dashboard');
  } catch (err) {
    // Error is handled in store and exposed via error ref
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md dark:bg-gray-800">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input 
            v-model="email"
            type="email" 
            id="email" 
            required 
            class="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input 
            v-model="password"
            type="password" 
            id="password" 
            required 
            class="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        <button 
          type="submit" 
          class="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </form>
      <p class="text-sm text-center text-gray-600 dark:text-gray-400">
        Don't have an account? 
        <router-link to="/register" class="text-blue-600 hover:underline">Register</router-link>
      </p>
    </div>
  </div>
</template>
