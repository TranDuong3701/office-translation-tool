import { http } from '@/services'

export const authService = {
  async getMe() {
    const info: any = await http.get('/api/v1/auth/me')
    return info
  },
}
