<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import AsideUser from '@/components/asideUser.vue'

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchProfile()
})
const profile = computed(() => userStore.profile?.data)
</script>

<template>
  <div class="h-screen flex bg-gray-900 text-white">
    <!-- Left Sidebar (Icons/Servers) -->
    <aside class="w-16 bg-gray-800 flex flex-col items-center py-4 space-y-4">
      <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
        U
      </div>
    </aside>

    <AsideUser />

    <!-- Main Chat Area -->
    <main class="flex-1 flex flex-col">
      <!-- Chat Header -->
      <div class="h-16 bg-gray-850 border-b border-gray-700 flex items-center px-6">
        <h1 class="text-xl font-semibold"># general</h1>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-900">
        <div class="flex items-start space-x-3">
          <img src="https://via.placeholder.com/40" class="rounded-full" />
          <div>
            <div class="font-semibold">Alice <span class="text-xs text-gray-400 ml-2">10:21 AM</span></div>
            <p class="text-gray-200">Hey team, the server is up!</p>
          </div>
        </div>
        <div class="flex items-start space-x-3 justify-end">
          <div class="text-right">
            <div class="font-semibold">You <span class="text-xs text-gray-400 ml-2">10:22 AM</span></div>
            <p class="text-gray-200">Awesome, thanks!</p>
          </div>
          <img src="https://via.placeholder.com/40" class="rounded-full" />
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-4 bg-gray-850 border-t border-gray-700 flex items-center gap-2">
        <input
          type="text"
          placeholder="Message #general"
          class="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button class="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Send</button>
      </div>
    </main>
  </div>
</template>
