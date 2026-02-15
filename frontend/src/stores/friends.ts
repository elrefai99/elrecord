import { defineStore } from 'pinia';
import { ref } from 'vue';
import { friendsService } from '../services/friends.service';
import { Friend, FriendRequest } from '../types/api';
import { parseError } from '../utils/error-handler';

export const useFriendsStore = defineStore('friends', () => {
     const friends = ref<Friend[]>([]);
     const pendingRequests = ref<FriendRequest[]>([]);
     const isLoading = ref(false);
     const error = ref<string | null>(null);

     async function fetchFriends() {
          isLoading.value = true;
          try {
               const response = await friendsService.getFriends();
               friends.value = response.data.data!;
          } catch (err: any) {
               error.value = parseError(err);
          } finally {
               isLoading.value = false;
          }
     }

     async function fetchRequests() {
          try {
               const response = await friendsService.getRequests();
               pendingRequests.value = response.data.data!;
          } catch (err: any) {
               console.error('Failed to fetch friend requests:', err);
          }
     }

     async function sendRequest(userId: string) {
          try {
               await friendsService.sendRequest(userId);
               // Ideally show a success notification
          } catch (err: any) {
               throw err;
          }
     }

     async function acceptRequest(requestId: string) {
          try {
               const response = await friendsService.acceptRequest(requestId);
               // Optimistically update UI
               pendingRequests.value = pendingRequests.value.filter(req => req.id !== requestId);
               // Fetch friends again to update the list
               await fetchFriends();
          } catch (err: any) {
               throw err;
          }
     }

     async function rejectRequest(requestId: string) {
          try {
               await friendsService.rejectRequest(requestId);
               pendingRequests.value = pendingRequests.value.filter(req => req.id !== requestId);
          } catch (err: any) {
               throw err;
          }
     }

     return {
          friends,
          pendingRequests,
          isLoading,
          error,
          fetchFriends,
          fetchRequests,
          sendRequest,
          acceptRequest,
          rejectRequest
     };
});
