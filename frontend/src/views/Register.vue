
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const fullname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const phone = ref('');
const country_code = ref('+20'); // Default country code
const error = ref('');

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }
  try {
    await authStore.register({
        fullname: fullname.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        country_code: country_code.value
    });
    router.push('/login');
  } catch (err: any) {
    error.value = err.response?.data?.message || err.message || 'Registration failed';
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md dark:bg-gray-800">
      <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="fullname" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input 
            v-model="fullname"
            type="text" 
            id="fullname" 
            required 
            minlength="3"
            class="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
        <div class="grid grid-cols-3 gap-2">
            <div class="col-span-1">
                 <label for="country_code" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Code</label>
                 <input 
                    v-model="country_code"
                    type="text" 
                    id="country_code" 
                    required 
                    placeholder="+20"
                    class="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
            </div>
            <div class="col-span-2">
                 <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                 <input 
                    v-model="phone"
                    type="tel" 
                    id="phone" 
                    required 
                    class="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
            </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input 
            v-model="password"
            type="password" 
            id="password" 
            required 
            minlength="6"
            class="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
          <input 
            v-model="confirmPassword"
            type="password" 
            id="confirmPassword" 
            required 
            minlength="6"
            class="w-full px-3 py-2 mt-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        <button 
          type="submit" 
          class="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
      <p class="text-sm text-center text-gray-600 dark:text-gray-400">
        Already have an account? 
        <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>
