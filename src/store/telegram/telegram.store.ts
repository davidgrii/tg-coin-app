import { create } from 'zustand'
import i18n from '@/i18n'

interface ITelegramStore {
  bot: typeof window.Telegram.WebApp | null
  userId: string
  userLanguage: string
  hasRecordedVisit: boolean
  initializeBot: () => Promise<void>
  recordVisit: (userId: string) => Promise<void>
}

export const useTelegramStore = create<ITelegramStore>((set, get) => ({
  bot: null,
  userId: '1422316270',
  userLanguage: 'en',
  hasRecordedVisit: false,

  initializeBot: async () => {
    const isBrowser = typeof window !== 'undefined'
    const botInstance = isBrowser ? window.Telegram.WebApp : null
    const userIdInstance = isBrowser ? String(botInstance?.initDataUnsafe?.user?.id || '1422316270') : '1422316270'
    const userLanguage = botInstance?.initDataUnsafe?.user?.language_code || 'en'

    set({ bot: botInstance, userId: userIdInstance, userLanguage })

    try {
      await i18n.changeLanguage(userLanguage)
    } catch (error) {
      console.error('Ошибка при смене языка:', error)
    }

    if (botInstance) {
      botInstance.ready()
      // bot.setHeaderColor('#000')
      // bot.setBackgroundColor('#000')
      // bot.setBottomBarColor('#000')
      botInstance.isVerticalSwipesEnabled = false

      if (!botInstance.isExpanded) {
        botInstance.expand()
      }
    }
  },

  recordVisit: async (userId: string) => {
    if (get().hasRecordedVisit) return
    set({ hasRecordedVisit: true })

    try {
      await fetch(`https://priceme.store/api/users/${userId}/visits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
      })
    } catch (error) {
      console.error('Ошибка при записи визита:', error)
    }
  }
}))
