import { useQuery } from '@tanstack/react-query'
import i18n from '@/i18n'

interface ITelegramUser {
  bot: typeof window.Telegram.WebApp | null
  userId: string
  userLanguage: string
}

const fetchUserData = async (): Promise<ITelegramUser> => {
  const isBrowser = typeof window !== 'undefined'
  const botInstance = isBrowser ? window.Telegram.WebApp : null
  const userIdInstance = isBrowser ? String(botInstance?.initDataUnsafe?.user?.id || '1422316270') : '1422316270'
  const userLanguage = botInstance?.initDataUnsafe?.user?.language_code || 'en'

  try {
    await i18n.changeLanguage(userLanguage)
  } catch (error) {
    console.error('Ошибка при смене языка:', error)
  }

  const data = {
    userId: userIdInstance,
    userLanguage,
    bot: botInstance
  }

  if (botInstance) {
    botInstance.ready()
    // bot.setHeaderColor('#000')
    // bot.setBackgroundColor('#000')
    // bot.setBottomBarColor('#000')
    botInstance.isVerticalSwipesEnabled = false

    if (botInstance.isExpanded) botInstance.expand()
  }

  return data
}

export const useTelegramUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
    staleTime: Infinity,
  })
}