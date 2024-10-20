import create from 'zustand'
import { titles } from '@/utils/constants'

interface IUserStore {
  username: string
  userId: string
  coins: number
  rank: number
  loading: boolean
  error: string | null
  fetchUserProfile: (userId: string) => Promise<void>
  getTitleByCoins: (coins: number) => string
}

export const useUserStore = create<IUserStore>((set) => ({
  username: '',
  userId: '',
  coins: 0,
  rank: 0,
  loading: false,
  error: null,

  fetchUserProfile: async (userId) => {
    set({ loading: true })

    try {
      const res = await fetch(`https://priceme.store/api/users/${userId}/profile`, { method: 'GET' })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const { username, coins, rank } = await res.json()

      set({ username: username, coins: coins, rank: rank, loading: false})
    } catch (error) {
      set({ error: 'Ошибка при получении профиля', loading: false })
    }
  },

  getTitleByCoins: (coins) => {
    const titleObj = titles.slice().reverse().find((t) => coins >= t.coins);
    return titleObj ? titleObj.title : 'Beginner'
  }
}))