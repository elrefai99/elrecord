import api from '../utils/axios';
import { ApiResponse, FriendRequest, Friend } from '../types/api';

export const friendsService = {
     async sendRequest(userId: string) {
          return api.post<ApiResponse<FriendRequest>>('/friends/send', { friend_id: userId });
     },

     async getFriends() {
          return api.get<ApiResponse<Friend[]>>('/friends/list');
     },

     async getRequests() {
          return api.get<ApiResponse<FriendRequest[]>>('/friends/requests');
     },

     async acceptRequest(requestId: string) {
          return api.post<ApiResponse<Friend>>(`/friends/accept/${requestId}`);
     },

     async rejectRequest(requestId: string) {
          return api.post<ApiResponse<any>>(`/friends/reject/${requestId}`);
     }
};
