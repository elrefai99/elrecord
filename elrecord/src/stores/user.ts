// stores/user.ts
import { defineStore } from 'pinia'
import axiosInstance from '@/services/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    profile: null as null | {
      id: string
      name: string
      email: string
      avatar?: string
    },
  }),
  actions: {
    async fetchProfile() {
      try {
        const { data } = await axiosInstance.get('/v1/user/profile')
        this.profile = data
        this.isLoggedIn = true
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        this.isLoggedIn = false
        this.profile = null
      }
    },
    logout() {
      this.isLoggedIn = false
      this.profile = null
      localStorage.removeItem('token')
    }
  },
})
