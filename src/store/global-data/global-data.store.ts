import { create } from 'zustand'
import { IGlobalMarketData } from '@/types'

interface DashboardState {
  dashboardData: IGlobalMarketData | null
  fetchGlobalData: () => Promise<void>
}
export const useGlobalDataStore = create<DashboardState>((set) => ({
  dashboardData: null,

  fetchGlobalData: async () => {
    try {
      const res = await fetch(`https://priceme.store/api/global`, {
        cache: 'no-store'
      })

      if (!res.ok) {
        console.error('Ошибка при получении данных:', res.statusText)
        return
      }

      const response = await res.json()
      const { data } = response
      set({ dashboardData: data })
    } catch (error) {
      console.error('Произошла ошибка:', error)
    }
  }
}))