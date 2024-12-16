import { create } from 'zustand'
import { useEffect } from 'react'
import { useCryptoStore } from '@/store'
import { IPortfolioItem, IPortfolioStore } from '@/types'

export const usePortfolioStore = create<IPortfolioStore>((set) => ({
  portfolio: [],
  initialPortfolio: [],
  cryptoData: [],
  totalBalance: 0,
  totalProfitLoss: 0,
  totalInvestedUSD: 0,
  totalPriceChange24h: 0,
  totalPercentageChange24h: 0,
  totalProfitLossPercentage: 0,
  isLoading: true,
  isSorted: false,

  initializePortfolio: async (userId) => {
    set({ isLoading: true })

    try {
      const res = await fetch(`https://priceme.store/api/users/${userId}/portfolio`)
      const data = await res.json()

      const portfolio: IPortfolioItem[] = data.portfolio.map((item: any) => ({
        _id: item._id,
        cryptoId: item.cryptoId,
        quantity: item.quantity,
        purchasePrice: item.purchasePrice,
        notice: item.notice,
        crypto: item.crypto,
        profitLoss: (item.crypto.current_price - item.purchasePrice) * item.quantity
      }))

      set({ portfolio, initialPortfolio: portfolio, isLoading: false })
    } catch (error) {
      console.error('Ошибка при загрузке портфолио:', error)
      set({ isLoading: false })
    }
  },

  addCrypto: async (userId, cryptoId, quantity, purchasePrice, notice) => {
    try {
      const res = await fetch(`https://priceme.store/api/users/${userId}/portfolio`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cryptoId, quantity, purchasePrice, notice })
      })

      const updatedPortfolio = await res.json()
      set((state) => {
        const cryptoDetails = state.cryptoData.find(crypto => crypto.id === cryptoId)
        const fullCrypto = { ...updatedPortfolio, ...cryptoDetails }
        return { portfolio: [...state.portfolio, fullCrypto] }
      })
    } catch (error) {
      console.error('Ошибка при добавлении криптовалюты:', error)
    }
  },

  updateCrypto: async (userId, _id, updatedData) => {
    try {
      const { _id: ignoredId, ...dataWithoutId } = updatedData
      const res = await fetch(`https://priceme.store/api/users/${userId}/portfolio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id, ...dataWithoutId })
      })

      const updatedPortfolio = await res.json()
      set((state) => ({
        portfolio: state.portfolio.map(crypto => crypto._id === _id
          ? { ...crypto, ...updatedData } : crypto
        )
      }))
    } catch (error) {
      console.error('Ошибка при обновлении криптовалюты:', error)
    }
  },

  deleteCrypto: async (userId, _id) => {
    try {
      const res = await fetch(`https://priceme.store/api/users/${userId}/portfolio`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id })
      })

      const updatedPortfolio = await res.json()

      if (updatedPortfolio.portfolio) {
        set({ portfolio: updatedPortfolio.portfolio })
      } else {
        console.error('Unexpected portfolio structure:', updatedPortfolio)
      }
    } catch (error) {
      console.error('Ошибка при удалении криптовалюты:', error)
    }
  },

  updateCryptoData: (data) => set((state) => ({
    portfolio: state.portfolio.map((crypto) => {
      const updatedCrypto = data?.find(c => c._id === crypto._id)
      return updatedCrypto ? { ...crypto, ...updatedCrypto } : crypto
    })
  })),

  calculateTotalBalance: () => set((state) => {
    const total = state.portfolio.reduce(
      (acc, crypto) => {
        if (crypto.crypto && crypto.quantity) {
          return acc + crypto.crypto.current_price * crypto.quantity
        }
        return acc
      }, 0
    )
    return { totalBalance: total }
  }),

  calculateTotalInvestedUSD: () => set((state) => {
    const totalInvestedUSD = state.portfolio.reduce(
      (acc, crypto) => {
        if (crypto.purchasePrice && crypto.quantity) {
          return acc + crypto.purchasePrice * crypto.quantity
        }
        return acc
      }, 0
    )
    return { totalInvestedUSD: totalInvestedUSD }
  }),

  calculateTotalProfitLoss: () => set((state) => {
    const totalProfitLoss = state.portfolio.reduce((acc, crypto) => {
      if (crypto.crypto && crypto.quantity) {
        return acc + ((crypto.crypto.current_price - crypto.purchasePrice) * crypto.quantity)
      }
      return acc
    }, 0)

    return { totalProfitLoss }
  }),

  calculateTotalProfitLossPercentage: () => set((state) => {
    const totalInvested = state.portfolio.reduce((acc, crypto) => {
      if (crypto.purchasePrice && crypto.quantity) {
        return acc + crypto.purchasePrice * crypto.quantity
      }
      return acc
    }, 0)

    const totalProfitLoss = state.portfolio.reduce((acc, crypto) => {
      if (crypto.crypto && crypto.quantity) {
        return acc + ((crypto.crypto.current_price - crypto.purchasePrice) * crypto.quantity)
      }
      return acc
    }, 0)

    const profitLossPercentage = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0
    return { totalProfitLossPercentage: profitLossPercentage }
  }),

  calculateTotalPercentageChange24h: () => set((state) => {
    const totalPercentageChange = state.portfolio.reduce((acc, crypto) => {
      if (crypto.crypto && crypto.quantity) {
        const cryptoValue = crypto.crypto.current_price * crypto.quantity
        const percentageContribution = (crypto.crypto.price_change_percentage_24h / 100) * cryptoValue
        return acc + percentageContribution
      }
      return acc
    }, 0)

    const totalBalance = state.portfolio.reduce((acc, crypto) => {
        if (crypto.crypto && crypto.quantity) {
          return acc + crypto.crypto.current_price * crypto.quantity
        }
        return acc
      }, 0
    )

    const overallPercentageChange = totalBalance > 0 ? (totalPercentageChange / totalBalance) * 100 : 0
    return { totalPercentageChange24h: overallPercentageChange }
  }),

  calculateTotalPriceChange24h: () => set((state) => {
    const totalPriceChange24h = state.portfolio.reduce((acc, crypto) => {
      if (crypto.crypto && crypto.quantity) {
        const priceChange = crypto.crypto.price_change_24h * crypto.quantity
        return acc + priceChange
      }
      return acc
    }, 0)

    return { totalPriceChange24h }
  }),

  sortPortfolio: () => {
    set((state) => {
      let newPortfolio
      let newSorted

      if (state.isSorted) {
        newPortfolio = [...state.initialPortfolio]
        newSorted = false
      } else {
        newPortfolio = [...state.portfolio].sort((a, b) =>
          (b.quantity * b.crypto.current_price) - (a.quantity * a.crypto.current_price)
        )
        newSorted = true
      }

      return { portfolio: newPortfolio, isSorted: newSorted }
    })
  }
}))

export const useInitializePortfolioStore = (userId: string) => {
  const initializePortfolio = usePortfolioStore((state) => state.initializePortfolio)
  const updateCryptoData = usePortfolioStore((state) => state.updateCryptoData)
  const { cryptoData } = useCryptoStore()

  useEffect(() => {
    initializePortfolio(userId)
  }, [initializePortfolio, userId])

  useEffect(() => {
    updateCryptoData(cryptoData)
  }, [cryptoData, updateCryptoData])
}
