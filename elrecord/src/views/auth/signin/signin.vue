<template>
  <div class="p-8 max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-2 text-center text-gray-800">Sign In</h1>
    <p class="mb-6 text-center text-gray-600">Please fill in the form below to create an account.</p>

    <form @submit.prevent="submitForm" class="space-y-5">
      <div>
        <label for="email" class="block mb-1 text-gray-700 font-medium">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="password" class="block mb-1 text-gray-700 font-medium">Password</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Sign In
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axiosInstance from '../../../services/axios'
import { useUserStore } from '../../../stores/user'
import Cookies from "js-cookie";
import router from '@/router';

const userStore = useUserStore()

const form = ref({
  email: '',
  password: '',
})


const submitForm = async () => {
  try {
    const res = await axiosInstance.post('/v1/auth/login', form.value)
    if(res.status !== 200) {
      throw new Error('Login failed')
    }
    else{
      const access_token: any = Cookies.get("access_token");
      localStorage.setItem('token', access_token)
      axiosInstance.defaults.headers.common['token'] = `${access_token}`
      await userStore.fetchProfile()    
      console.log('Logged in successfully')      
      router.push('/')
    }
  } catch (err) {
    console.error('Login failed:', err)
  }
}
</script>
