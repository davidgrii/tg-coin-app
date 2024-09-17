import { create } from 'zustand'
import { IPortfolio } from '@/types/crypto.types'

export const usePortfolioStore = create<IPortfolio>((set) => ({
  portfolio: [],
  totalBalance: 0,
  totalPercentageChange: 0,

  addCrypto: (crypto) => set((state) => {
    const newPortfolio = [...state.portfolio, crypto]
    return { portfolio: newPortfolio }
  }),

  updateCrypto: (index, updatedCrypto) => set((state) => {
    const newPortfolio = state.portfolio.map((crypto, i) =>
      i === index ? { ...crypto, ...updatedCrypto } : crypto
    );
    return { portfolio: newPortfolio };
  }),

  deleteCrypto: (index) => set((state) => ({
    portfolio: state.portfolio.filter((_, i) => i !== index)
  })),

  calculateTotalBalance: () => set((state) => {
    const total = state.portfolio.reduce(
      (acc, crypto) => acc + crypto.current_price * crypto.quantity, 0
    )
    return { totalBalance: total }
  }),

  calculateTotalPercentageChange: () => set((state) => {
    const totalPercentageChange = state.portfolio.reduce((acc, crypto) => {
      const cryptoValue = crypto.current_price * crypto.quantity;
      const percentageContribution = (crypto.price_change_percentage_24h / 100) * cryptoValue;
      return acc + percentageContribution;
    }, 0);

    const totalBalance = state.portfolio.reduce(
      (acc, crypto) => acc + crypto.current_price * crypto.quantity, 0
    );

    const overallPercentageChange = totalBalance > 0 ? (totalPercentageChange / totalBalance) * 100 : 0;
    return { totalPercentageChange: overallPercentageChange };
  }),
}))
