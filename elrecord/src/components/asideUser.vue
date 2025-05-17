<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchProfile()
})
const profile = computed(() => userStore.profile?.data)
</script>

<template>
  
    <aside class="w-64 bg-gray-850 border-r border-gray-700 p-4 flex flex-col">
      <h2 class="text-lg font-semibold mb-4">Account Info</h2>
<div class="mb-4" v-if="profile">
  <img
    src="https://via.placeholder.com/80"
    alt="Avatar"
    class="rounded-full mb-2"
  />
  
  <p class="font-medium">{{ profile.fullname }}</p>
  <p class="text-sm text-gray-400">{{ profile.email }}</p>
        <nav class="flex-1 space-y-2">
        <button class="w-full text-left text-sm hover:text-blue-400">Settings</button>
        <button class="w-full text-left text-sm hover:text-blue-400">Logout</button>
      </nav>
</div>

<div class="mb-4" v-else>
  <router-link to="/login">Login</router-link>
</div>
    </aside>

</template>
