import { create } from 'zustand'
import { useEffect } from 'react'
import { ICrypto, IPortfolio } from '@/types/crypto.types'

interface IPortfolioStore extends IPortfolio {
  isLoading: boolean
  portfolio: ICrypto[]
  initializePortfolio: () => void
  savePortfolio: () => void
  updatePortfolioFromCryptoData: (cryptoData: ICrypto[]) => void
}

export const usePortfolioStore = create<IPortfolioStore>((set) => ({
  portfolio: [],
  totalBalance: 0,
  totalPercentageChange: 0,
  isLoading: true,

  initializePortfolio: () => {
    set({ isLoading: true })
    const storedPortfolio = JSON.parse(localStorage.getItem('portfolio') || '[]')
    set({ portfolio: storedPortfolio, isLoading: false })
  },

  updatePortfolioFromCryptoData: (cryptoData: ICrypto[]) => set((state) => {
    const updatedPortfolio = state.portfolio.map((crypto) => {
      const updatedCryptoData = cryptoData.find(data => data.id === crypto.id);
      if (updatedCryptoData) {
        return {
          ...crypto,
          current_price: updatedCryptoData.current_price,
          price_change_percentage_24h: updatedCryptoData.price_change_percentage_24h,
        };
      }
      return crypto;
    });

    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
    return { portfolio: updatedPortfolio };
  }),

  savePortfolio: () => {
    set((state) => {
      localStorage.setItem('portfolio', JSON.stringify(state.portfolio))
      return state
    })
  },

  addCrypto: (crypto) => set((state) => {
    const newPortfolio = [...state.portfolio, crypto]
    localStorage.setItem('portfolio', JSON.stringify(newPortfolio))
    return { portfolio: newPortfolio }
  }),

  updateCrypto: (index, updatedCrypto) => set((state) => {
    const newPortfolio = state.portfolio.map((crypto, i) =>
      i === index ? { ...crypto, ...updatedCrypto } : crypto
    )
    localStorage.setItem('portfolio', JSON.stringify(newPortfolio))
    return { portfolio: newPortfolio }
  }),

  deleteCrypto: (index) => set((state) => {
    const newPortfolio = state.portfolio.filter((_, i) => i !== index)
    localStorage.setItem('portfolio', JSON.stringify(newPortfolio))
    return { portfolio: newPortfolio }
  }),

  calculateTotalBalance: () => set((state) => {
    const total = state.portfolio.reduce(
      (acc, crypto) => acc + crypto.current_price * crypto.quantity, 0
    )
    return { totalBalance: total }
  }),

  calculateTotalPercentageChange: () => set((state) => {
    const totalPercentageChange = state.portfolio.reduce((acc, crypto) => {
      const cryptoValue = crypto.current_price * crypto.quantity
      const percentageContribution = (crypto.price_change_percentage_24h / 100) * cryptoValue
      return acc + percentageContribution
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

  useEffect(() => {
    initializePortfolio()
  }, [initializePortfolio])
}
