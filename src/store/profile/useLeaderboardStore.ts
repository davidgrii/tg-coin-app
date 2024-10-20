import { create } from 'zustand'

interface IUser {
  username: string
  coins: number
}

interface ILeaderboardStore {
  users: IUser[]
  totalUsers: number
  loading: boolean
  fetchLeaderboard: () => void
}


export const useLeaderboardStore = create<ILeaderboardStore>((set) => ({
  users: [],
  totalUsers: 0,
  loading: false,

  fetchLeaderboard:async () => {
    set({ loading: true })

    try {
      const res = await fetch(`https://priceme.store/api/leaderboard`, {
        method: 'GET'
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const { totalUsers, topUsers} = await res.json()

      set({ users: topUsers, totalUsers: totalUsers, loading: false })
    } catch (error) {
      console.error('Ошибка при получении лидерборда:', error)
      set({ loading: false })
    }
  }
}))