import create from 'zustand'
import { titles } from '@/utils/constants'


interface IInvitedUser {
  userId: string
  username?: string
}

interface IUserStore {
  username: string
  userId: string
  coins: number
  rank: number
  referralCode: string
  invitedUsers: IInvitedUser[]
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
  referralCode: '',
  invitedUsers: [],
  loading: false,
  error: null,

  fetchUserProfile: async (userId) => {
    set({ loading: true })

    try {
      const res = await fetch(`https://priceme.store/api/users/${userId}/profile`, { method: 'GET' })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const { username, coins, rank, referralCode, invitedUsers } = await res.json()

      set({ username: username, coins: coins, rank: rank, referralCode: referralCode, invitedUsers: invitedUsers, loading: false})
    } catch (error) {
      set({ error: 'Ошибка при получении профиля', loading: false })
    }
  },

  getTitleByCoins: (userCoins) => {
    const userLevel = titles.find(level =>
      userCoins >= level.coins.min &&
      userCoins <= level.coins.max
    );
    return userLevel ? userLevel.title : 'Неизвестный уровень';
  }
}))