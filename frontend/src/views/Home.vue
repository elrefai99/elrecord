
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
    router.push('/login')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
    <div class="text-center">
      <h1 class="text-6xl font-extrabold mb-4">Welcome to ElRecord</h1>
      <p class="text-xl mb-8 opacity-90">A powerful Discord-like platform for your community.</p>
      
      <div class="space-x-4">
        <button 
          @click="goToLogin"
          class="px-8 py-3 bg-white text-indigo-600 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Get Started
        </button>
        <button 
          class="px-8 py-3 bg-transparent border-2 border-white rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-colors"
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
</template>
