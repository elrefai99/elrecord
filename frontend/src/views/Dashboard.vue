<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useChatStore } from '../stores/chat';
import { useFriendsStore } from '../stores/friends';
import { storeToRefs } from 'pinia';

const router = useRouter();
const authStore = useAuthStore();
const chatStore = useChatStore();
const friendsStore = useFriendsStore();

const { user } = storeToRefs(authStore);
const { chats, activeChatId, messages } = storeToRefs(chatStore);
const { friends } = storeToRefs(friendsStore);

const messageInput = ref('');
const messagesContainer = ref<HTMLElement | null>(null);

const activeChat = computed(() => 
    chats.value.find(c => c.id === activeChatId.value)
);

const currentMessages = computed(() => {
    if (!activeChatId.value) return [];
    return messages.value[activeChatId.value] || [];
});

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

const handleSendMessage = async () => {
    if (!messageInput.value.trim() || !activeChatId.value) return;
    
    try {
        await chatStore.sendMessage(messageInput.value);
        messageInput.value = '';
        scrollToBottom();
    } catch (err) {
        console.error('Failed to send message:', err);
    }
};

const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
};

watch(currentMessages, () => {
    scrollToBottom();
}, { deep: true });

onMounted(async () => {
    if (!authStore.isAuthenticated) {
        try {
            await authStore.fetchProfile();
        } catch {
            router.push('/login');
            return;
        }
    }
    
    chatStore.initSocketListeners();
    friendsStore.fetchFriends();
    await chatStore.fetchChats();
    
    if (chats.value.length > 0 && !activeChatId.value) {
        chatStore.setActiveChat(chats.value[0].id);
    }
});

// Mock servers for now, as API focus is on DMs/Chats first
const servers = ref([
    { id: 'home', name: 'Home', icon: 'i-heroicons-home' },
]);
const activeServerId = ref('home');
</script>

<template>
  <div class="flex h-screen bg-gray-900 text-white overflow-hidden">
    <!-- Server List -->
    <div class="w-18 flex flex-col items-center py-4 space-y-4 bg-gray-900 border-r border-gray-800">
        <div 
            v-for="server in servers" 
            :key="server.id"
            @click="activeServerId = server.id"
            class="w-12 h-12 rounded-full bg-gray-700 hover:bg-indigo-500 hover:rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center group relative"
            :class="{ 'bg-indigo-500 rounded-xl': activeServerId === server.id }"
        >
            <div class="text-xl" :class="server.icon"></div>
            <div class="absolute left-16 bg-black px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {{ server.name }}
            </div>
        </div>
    </div>

    <!-- Sidebar (Channels/DMs) -->
    <div class="w-60 bg-gray-800 flex flex-col hidden md:flex">
        <!-- Search / Header -->
        <div class="h-12 border-b border-gray-700 flex items-center px-4 font-bold shadow-sm">
            <input type="text" placeholder="Find or start a conversation" class="bg-gray-900 w-full rounded px-2 py-1 text-sm focus:outline-none text-gray-200" />
        </div>
        
        <!-- Chat List -->
        <div class="flex-1 overflow-y-auto p-2 space-y-1">
            <div v-if="chats.length === 0" class="text-gray-500 text-center text-sm mt-4">No chats yet</div>
            
            <div 
                v-for="chat in chats" 
                :key="chat.id"
                @click="chatStore.setActiveChat(chat.id)"
                class="flex items-center px-2 py-2 rounded hover:bg-gray-700 cursor-pointer group"
                :class="{ 'bg-gray-700 text-white': activeChatId === chat.id, 'text-gray-400': activeChatId !== chat.id }"
            >
                <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center mr-2 flex-shrink-0">
                    <span class="text-xs font-bold">{{ chat.name?.[0] || 'U' }}</span>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium truncate">{{ chat.name || 'Unknown' }}</div>
                    <div class="text-xs text-gray-500 truncate" v-if="chat.last_message">{{ chat.last_message.content }}</div>
                </div>
                <div v-if="chat.unread_count" class="bg-red-500 text-white text-xs rounded-full px-1.5 ml-1">
                    {{ chat.unread_count }}
                </div>
            </div>
        </div>
        
        <!-- User Control -->
        <div class="h-14 bg-gray-850 flex items-center px-2 bg-gray-850/50 border-t border-gray-700">
            <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
                <span v-if="user?.fullname">{{ user.fullname[0] }}</span>
                <span v-else class="i-heroicons-user"></span>
            </div>
            <div class="flex-1 min-w-0">
                <div class="text-sm font-bold truncate">{{ user?.fullname || 'User' }}</div>
                <div class="text-xs text-gray-400 truncate">#{{ user?.username?.slice(-4) || '0000' }}</div>
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
        <div class="h-12 border-b border-gray-600 flex items-center px-4 shadow-sm flex-shrink-0">
            <div class="i-heroicons-at-symbol text-gray-400 mr-2" v-if="activeChat?.type === 'DM'"></div>
            <div class="i-heroicons-hashtag text-gray-400 mr-2" v-else></div>
            <span class="font-bold">{{ activeChat?.name || 'Select a chat' }}</span>
        </div>
        
        <!-- Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
            <div v-if="!activeChatId" class="h-full flex items-center justify-center text-gray-400">
                Select a chat to start messaging
            </div>
            
            <template v-else>
                <div 
                    class="flex group hover:bg-gray-600/30 -mx-4 px-4 py-1" 
                    v-for="msg in currentMessages" 
                    :key="msg.id"
                >
                    <div class="w-10 h-10 rounded-full bg-indigo-500 flex-shrink-0 mr-4 cursor-pointer hover:opacity-80 flex items-center justify-center">
                        {{ msg.sender?.fullname?.[0] || '?' }}
                    </div>
                    <div>
                         <div class="flex items-baseline space-x-2">
                            <span class="font-bold cursor-pointer hover:underline">{{ msg.sender?.fullname || 'Unknown' }}</span>
                            <span class="text-xs text-gray-400">{{ new Date(msg.created_at).toLocaleTimeString() }}</span>
                        </div>
                        <p class="text-gray-300 whitespace-pre-wrap">{{ msg.content }}</p>
                    </div>
                </div>
            </template>
        </div>

        <!-- Message Input -->
        <div class="p-4 px-4 flex-shrink-0" v-if="activeChatId">
            <form @submit.prevent="handleSendMessage" class="bg-gray-600 rounded-lg p-2.5 flex items-center">
                <button type="button" class="p-1 text-gray-400 hover:text-gray-200 mr-2 rounded-full hover:bg-gray-500">
                    <div class="i-heroicons-plus-circle text-xl"></div>
                </button>
                <input 
                    v-model="messageInput"
                    type="text" 
                    :placeholder="`Message ${activeChat?.name ? '@'+activeChat.name : ''}`" 
                    class="bg-transparent flex-1 focus:outline-none text-gray-200 placeholder-gray-400" 
                />
            </form>
        </div>
    </div>
    
    <!-- Member List / Friends -->
    <div class="w-60 bg-gray-800 p-4 hidden lg:flex flex-col border-l border-gray-700">
        <h3 class="text-xs font-bold text-gray-400 uppercase mb-2">Friends — {{ friends.length }}</h3>
        <div 
            v-for="friend in friends" 
            :key="friend.id"
            class="flex items-center px-2 py-1 hover:bg-gray-700 rounded cursor-pointer opacity-50 hover:opacity-100"
        >
             <div class="w-8 h-8 rounded-full bg-indigo-500 mr-2 relative flex items-center justify-center">
                {{ friend.friend_data?.fullname?.[0] }}
                <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
             </div>
             <div class="min-w-0">
                 <div class="font-bold text-gray-300 truncate">{{ friend.friend_data?.fullname }}</div>
                 <div class="text-xs text-gray-400 truncate">{{ friend.status }}</div>
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
