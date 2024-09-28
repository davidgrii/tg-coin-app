import { create } from 'zustand'
import { useEffect } from 'react'
import { ICrypto, IPortfolio } from '@/types/crypto.types'
import { useCryptoStore } from '@/store'

interface IPortfolioStore extends IPortfolio {
  isLoading: boolean
  portfolio: ICrypto[]
  initializePortfolio: () => void
  savePortfolio: () => void
  addCrypto: (crypto: ICrypto) => void
  updateCrypto: (index: number, updatedCrypto: ICrypto) => void
  deleteCrypto: (index: number) => void
  updateCryptoData: (data: ICrypto[]) => void
  calculateTotalBalance: () => void
  calculateTotalPercentageChange: () => void
}

export const usePortfolioStore = create<IPortfolioStore>((set) => ({
  portfolio: [],
  totalBalance: 0,
  totalPercentageChange: 0,
  isLoading: true,

  // Инициализация портфолио с бэкенда
  initializePortfolio: async () => {
    set({ isLoading: true })

    try {
      const userId = 'USER_ID' // Замените на реальный userId или получите его из контекста
      const response = await fetch(`https://your-api.com/api/portfolio/${userId}`)

      if (!response.ok) {
        throw new Error('Failed to fetch portfolio')
      }

      const portfolio = await response.json()
      set({ portfolio, isLoading: false })

    } catch (error) {
      console.error('Error fetching portfolio:', error)
      set({ isLoading: false })
    }
  },

  // Сохранение в localStorage, если нужно
  savePortfolio: () => {
    set((state) => {
      localStorage.setItem('portfolio', JSON.stringify(state.portfolio))
      return state
    })
  },

  addCrypto: (crypto) => set((state) => {
    const newPortfolio = [...state.portfolio, crypto]
    return { portfolio: newPortfolio }
  }),

  updateCrypto: (index, updatedCrypto) => set((state) => {
    const newPortfolio = state.portfolio.map((crypto, i) =>
      i === index ? { ...crypto, ...updatedCrypto } : crypto
    )
    return { portfolio: newPortfolio }
  }),

  deleteCrypto: (index) => set((state) => {
    const newPortfolio = state.portfolio.filter((_, i) => i !== index)
    return { portfolio: newPortfolio }
  }),

  updateCryptoData: (data) => set((state) => ({
    portfolio: state.portfolio.map((crypto) => {
      const updatedCrypto = data.find(c => c.id === crypto.id)
      return updatedCrypto ? { ...crypto, ...updatedCrypto } : crypto
    })
  })),

  calculateTotalBalance: () => set((state) => {
    const total = state.portfolio.reduce(
      (acc, crypto) => acc + crypto.current_price * crypto.quantity, 0
    )
    return { totalBalance: total };
  }),

  calculateTotalPercentageChange: () => set((state) => {
    const totalPercentageChange = state.portfolio.reduce((acc, crypto) => {
      const cryptoValue = crypto.current_price * crypto.quantity
      const percentageContribution = (crypto.price_change_percentage_24h / 100) * cryptoValue
      return acc + percentageContribution;
    }, 0)

    const totalBalance = state.portfolio.reduce(
      (acc, crypto) => acc + crypto.current_price * crypto.quantity, 0
    )

    const overallPercentageChange = totalBalance > 0 ? (totalPercentageChange / totalBalance) * 100 : 0
    return { totalPercentageChange: overallPercentageChange }
  }),
}))

export const useInitializePortfolioStore = () => {
  const initializePortfolio = usePortfolioStore((state) => state.initializePortfolio)
  const updateCryptoData = usePortfolioStore((state) => state.updateCryptoData)
  const { cryptoData } = useCryptoStore()

  useEffect(() => {
    initializePortfolio() // Инициализация данных с бэкенда
  }, [initializePortfolio])

  useEffect(() => {
    updateCryptoData(cryptoData) // Обновление данных криптовалют
  }, [cryptoData, updateCryptoData])
}
