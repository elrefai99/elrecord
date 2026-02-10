import { defineStore } from 'pinia';
import { ref } from 'vue';
import { chatService } from '../services/chat.service';
import { Chat, Message } from '../types/api';
import { socketService } from '../services/socket.service';
import { parseError } from '../utils/error-handler';

export const useChatStore = defineStore('chat', () => {
     const chats = ref<Chat[]>([]);
     const activeChatId = ref<string | null>(null);
     const messages = ref<Record<string, Message[]>>({}); // Map chatId -> messages
     const isLoading = ref(false);
     const error = ref<string | null>(null);

     // Initialize socket listeners
     function initSocketListeners() {
          socketService.on('message:receive', (message: Message) => {
               handleIncomingMessage(message);
          });
     }

     function handleIncomingMessage(message: Message) {
          const chatId = message.channel_id || message.dm_id;
          if (!chatId) return;

          if (!messages.value[chatId]) {
               messages.value[chatId] = [];
          }
          messages.value[chatId].push(message);

          // Update last message in chat list if it exists
          const chatIndex = chats.value.findIndex(c => c.id === chatId);
          if (chatIndex !== -1) {
               chats.value[chatIndex].last_message = message;
               if (activeChatId.value !== chatId) {
                    chats.value[chatIndex].unread_count = (chats.value[chatIndex].unread_count || 0) + 1;
               }
          }
     }

     async function fetchChats() {
          isLoading.value = true;
          try {
               const response = await chatService.getChats();
               chats.value = response.data.data!;
          } catch (err: any) {
               error.value = parseError(err);
          } finally {
               isLoading.value = false;
          }
     }

     async function fetchMessages(chatId: string) {
          // If we already have messages, maybe load more or sync?
          // For now, simple fetch
          try {
               const response = await chatService.getMessages(chatId);
               messages.value[chatId] = response.data.data!.reverse(); // Assuming API returns newest first
          } catch (err: any) {
               console.error('Failed to fetch messages:', err);
          }
     }

     async function sendMessage(content: string, type: 'DM' | 'CHANNEL' = 'DM') {
          if (!activeChatId.value) return;

          return new Promise<void>((resolve, reject) => {
               socketService.emit('message:send', {
                    content,
                    chatId: activeChatId.value!,
                    type
               }, (response: any) => {
                    if (response?.error) {
                         reject(new Error(response.error));
                    } else {
                         // Optimistic update or wait for message:receive?
                         // Usually wait for ack or receive
                         resolve();
                    }
               });
          });
     }

     function setActiveChat(chatId: string) {
          activeChatId.value = chatId;
          // Mark as read, fetch messages if needed
          if (!messages.value[chatId]) {
               fetchMessages(chatId);
          }
          // Reset unread count
          const chat = chats.value.find(c => c.id === chatId);
          if (chat) {
               chat.unread_count = 0;
          }
     }

     return {
          chats,
          activeChatId,
          messages,
          isLoading,
          error,
          initSocketListeners,
          fetchChats,
          fetchMessages,
          sendMessage,
          setActiveChat
     };
});
