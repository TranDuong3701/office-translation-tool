import { defineStore } from 'pinia'
import { authService } from '@/services'
import type { User } from '@/types'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = reactive<{
      user: User | null
    }>({
      user: null,
    })

    const isAuthenticated = computed(() => !!state.user)

    const getUser = async () => {
      try {
        const user = await authService.getMe()
        state.user = user
      }
      catch (error) {
      }
    }

    return { ...toRefs(state), isAuthenticated, getUser }
  },
)
