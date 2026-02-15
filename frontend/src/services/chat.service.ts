import api from '../utils/axios';
import { ApiResponse, Chat, Message } from '../types/api';

export const chatService = {
     async getChats() {
          return api.get<ApiResponse<Chat[]>>('/chat/list');
     },

     async getMessages(chatId: string, page: number = 1, limit: number = 50) {
          return api.get<ApiResponse<Message[]>>(`/chat/${chatId}/messages`, {
               params: { page, limit }
          });
     },

     async createDM(userId: string) {
          return api.post<ApiResponse<Chat>>('/chat/dm', { user_id: userId });
     }
};
