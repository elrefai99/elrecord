
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const { logout, user } = authStore;

const handleLogout = () => {
  logout();
  router.push('/login');
};

onMounted(() => {
    authStore.fetchProfile().catch(() => {});
});

const servers = ref([
    { id: 1, name: 'Home', icon: 'i-heroicons-home' },
    { id: 2, name: 'Vue.js', icon: 'https://vuejs.org/images/logo.png', isImage: true },
    { id: 3, name: 'Vite', icon: 'https://vitejs.dev/logo.svg', isImage: true },
]);

const activeServer = ref(servers.value[0]);

const channels = ref([
    { id: 1, name: 'general', type: 'text' },
    { id: 2, name: 'help', type: 'text' },
    { id: 3, name: 'random', type: 'text' },
    { id: 4, name: 'Voice Chat', type: 'voice' },
]);
</script>

<template>
  <div class="flex h-screen bg-gray-900 text-white overflow-hidden">
    <!-- Server List -->
    <div class="w-18 flex flex-col items-center py-4 space-y-4 bg-gray-900 border-r border-gray-800">
        <div 
            v-for="server in servers" 
            :key="server.id"
            @click="activeServer = server"
            class="w-12 h-12 rounded-full bg-gray-700 hover:bg-indigo-500 hover:rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center group relative"
            :class="{ 'bg-indigo-500 rounded-xl': activeServer.id === server.id }"
        >
            <div v-if="server.isImage">
                <img :src="server.icon" :alt="server.name" class="w-8 h-8 object-contain" />
            </div>
            <div v-else class="text-xl" :class="server.icon"></div>
            
            <!-- Tooltip -->
            <div class="absolute left-16 bg-black px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {{ server.name }}
            </div>
        </div>
        
        <div class="w-12 h-12 rounded-full bg-gray-700 hover:bg-green-500 text-green-500 hover:text-white transition-all cursor-pointer flex items-center justify-center">
            <div class="i-heroicons-plus text-2xl"></div>
        </div>
    </div>

    <!-- Channel List -->
    <div class="w-60 bg-gray-800 flex flex-col">
        <div class="h-12 border-b border-gray-700 flex items-center px-4 font-bold shadow-sm hover:bg-gray-700 cursor-pointer transition-colors">
            {{ activeServer.name }}
            <div class="i-heroicons-chevron-down ml-auto"></div>
        </div>
        <div class="flex-1 overflow-y-auto p-2 space-y-1">
            <div 
                v-for="channel in channels" 
                :key="channel.id"
                class="flex items-center px-2 py-1 rounded hover:bg-gray-700 cursor-pointer text-gray-400 hover:text-gray-200 group"
            >
                <div class="mr-1 text-lg" :class="channel.type === 'voice' ? 'i-heroicons-speaker-wave' : 'i-heroicons-hashtag'"></div>
                <span>{{ channel.name }}</span>
                <div class="ml-auto i-heroicons-user-plus opacity-0 group-hover:opacity-100 hover:text-white" title="Create Invite"></div>
            </div>
        </div>
        
        <!-- User Control -->
        <div class="h-14 bg-gray-850 flex items-center px-2 bg-gray-850/50">
            <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
                <span v-if="user?.fullname">{{ user.fullname[0] }}</span>
                <span v-else class="i-heroicons-user"></span>
            </div>
            <div class="flex-1 min-w-0">
                <div class="text-sm font-bold truncate">{{ user?.fullname || 'User' }}</div>
                <div class="text-xs text-gray-400 truncate">#{{ user?.id || '0000' }}</div>
            </div>
            <div class="flex space-x-1">
                 <button class="p-1 hover:bg-gray-700 rounded" @click="handleLogout" title="Logout">
                    <div class="i-heroicons-arrow-right-start-on-rectangle"></div>
                </button>
            </div>
        </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 bg-gray-700 flex flex-col min-w-0">
        <div class="h-12 border-b border-gray-600 flex items-center px-4 shadow-sm">
            <div class="i-heroicons-hashtag text-gray-400 mr-2"></div>
            <span class="font-bold">general</span>
             <div class="ml-auto flex items-center space-x-4 text-gray-400">
                <div class="i-heroicons-bell hover:text-gray-200 cursor-pointer"></div>
                <div class="i-heroicons-users hover:text-gray-200 cursor-pointer"></div>
                <div class="relative">
                    <input type="text" placeholder="Search" class="bg-gray-900 rounded px-2 py-1 text-sm focus:outline-none w-36 transition-all focus:w-60 text-gray-200" />
                    <div class="i-heroicons-magnifying-glass absolute right-2 top-1.5 text-xs"></div>
                </div>
            </div>
        </div>
        
        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <!-- Mock Messages -->
            <div class="flex group hover:bg-gray-600/30 -mx-4 px-4 py-1" v-for="i in 5" :key="i">
                <div class="w-10 h-10 rounded-full bg-indigo-500 flex-shrink-0 mr-4 cursor-pointer hover:opacity-80"></div>
                <div>
                     <div class="flex items-baseline space-x-2">
                        <span class="font-bold cursor-pointer hover:underline">User {{ i }}</span>
                        <span class="text-xs text-gray-400">Today at 10:{{ 30 + i }} AM</span>
                    </div>
                    <p class="text-gray-300">This is a message that looks like a Discord message. UnoCSS is great!</p>
                </div>
            </div>
        </div>

        <!-- Message Input -->
        <div class="p-4 px-4">
            <div class="bg-gray-600 rounded-lg p-2.5 flex items-center">
                <button class="p-1 text-gray-400 hover:text-gray-200 mr-2 rounded-full hover:bg-gray-500">
                    <div class="i-heroicons-plus-circle text-xl"></div>
                </button>
                <input type="text" placeholder="Message #general" class="bg-transparent flex-1 focus:outline-none text-gray-200 placeholder-gray-400" />
                <div class="flex space-x-2 text-gray-400">
                     <div class="i-heroicons-gift text-xl hover:text-gray-200 cursor-pointer"></div>
                     <div class="i-heroicons-face-smile text-xl hover:text-gray-200 cursor-pointer"></div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Member List (Optional/Collapsible) -->
    <div class="w-60 bg-gray-800 p-4 hidden md:flex flex-col border-l border-gray-700">
        <h3 class="text-xs font-bold text-gray-400 uppercase mb-2">Online — 1</h3>
        <div class="flex items-center px-2 py-1 hover:bg-gray-700 rounded cursor-pointer opacity-50 hover:opacity-100">
             <div class="w-8 h-8 rounded-full bg-indigo-500 mr-2 relative">
                <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
             </div>
             <div>
                 <div class="font-bold text-gray-300">System Admin</div>
                 <div class="text-xs text-gray-400">Playing VS Code</div>
             </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #2f3136; 
}
::-webkit-scrollbar-thumb {
  background: #202225; 
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #18191c; 
}
</style>
