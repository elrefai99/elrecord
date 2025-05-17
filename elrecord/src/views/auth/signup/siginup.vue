<template>
  <div class="p-8 max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-2 text-center text-gray-800">Sign Up</h1>
    <p class="mb-6 text-center text-gray-600">Please fill in the form below to create an account.</p>

    <form @submit.prevent="submitForm" class="space-y-5">
      <div>
        <label for="fullname" class="block mb-1 text-gray-700 font-medium">Full Name</label>
        <input
          id="fullname"
          v-model="form.fullname"
          placeholder="Full Name"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

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

      <div>
        <label for="code" class="block mb-1 text-gray-700 font-medium">Code</label>
        <input
          id="code"
          v-model="form.code"
          placeholder="Code"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="phone" class="block mb-1 text-gray-700 font-medium">Phone Number</label>
        <input
          id="phone"
          v-model="form.phone"
          placeholder="Phone Number"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axiosInstance from '../../../services/axios'
import { useUserStore } from '../../../stores/user'
import Cookies from "js-cookie";

const userStore = useUserStore()

const form = ref({
  fullname: '',
  email: '',
  password: '',
  code: '',
  phone: ''
})


const submitForm = async () => {
  try {
    const res = await axiosInstance.post('/v1/auth/register', form.value)
    const access_token: any = Cookies.get("access_token");

    // احفظ التوكن
    localStorage.setItem('token', access_token)

    // ضع التوكن في الهيدر للاستخدام التالي
    axiosInstance.defaults.headers.common['token'] = `${access_token}`

    // جلب بيانات البروفايل
    await userStore.fetchProfile()
    
    console.log('Logged in successfully')
  } catch (err) {
    console.error('Login failed:', err)
  }
}
</script>
