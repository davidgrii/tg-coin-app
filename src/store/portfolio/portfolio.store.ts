import { create } from 'zustand'
import { useEffect } from 'react'
import { ICrypto, IPortfolio } from '@/types/crypto.types'
import { useCryptoStore } from '@/store'

interface IPortfolioStore extends IPortfolio {
  isLoading: boolean;
  portfolio: ICrypto[];
  initializePortfolio: () => void;
  savePortfolio: () => void;
  updateCryptoData: (data: ICrypto[]) => void; // Добавляем метод для обновления данных о криптовалютах
}

export const usePortfolioStore = create<IPortfolioStore>((set) => ({
  portfolio: [],
  totalBalance: 0,
  totalPercentageChange: 0,
  isLoading: true,

  initializePortfolio: () => {
    set({ isLoading: true });
    const storedPortfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
    set({ portfolio: storedPortfolio, isLoading: false });
  },

  savePortfolio: () => {
    set((state) => {
      localStorage.setItem('portfolio', JSON.stringify(state.portfolio));
      return state;
    });
  },

  addCrypto: (crypto) => set((state) => {
    const newPortfolio = [...state.portfolio, crypto];
    localStorage.setItem('portfolio', JSON.stringify(newPortfolio));
    return { portfolio: newPortfolio };
  }),

  updateCrypto: (index, updatedCrypto) => set((state) => {
    const newPortfolio = state.portfolio.map((crypto, i) =>
      i === index ? { ...crypto, ...updatedCrypto } : crypto
    );
    localStorage.setItem('portfolio', JSON.stringify(newPortfolio));
    return { portfolio: newPortfolio };
  }),

  deleteCrypto: (index) => set((state) => {
    const newPortfolio = state.portfolio.filter((_, i) => i !== index);
    localStorage.setItem('portfolio', JSON.stringify(newPortfolio));
    return { portfolio: newPortfolio };
  }),

  updateCryptoData: (data) => set((state) => ({
    portfolio: state.portfolio.map((crypto) => {
      const updatedCrypto = data.find(c => c.id === crypto.id); // Ищем обновленные данные для криптовалюты
      return updatedCrypto ? { ...crypto, ...updatedCrypto } : crypto; // Если нашли, обновляем, иначе оставляем как есть
    })
  })),

  calculateTotalBalance: () => set((state) => {
    const total = state.portfolio.reduce(
      (acc, crypto) => acc + crypto.current_price * crypto.quantity, 0
    );
    return { totalBalance: total };
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
}));

export const useInitializePortfolioStore = () => {
  const initializePortfolio = usePortfolioStore((state) => state.initializePortfolio);
  const updateCryptoData = usePortfolioStore((state) => state.updateCryptoData);
  const { cryptoData } = useCryptoStore();

  useEffect(() => {
    initializePortfolio();
  }, [initializePortfolio]);

  useEffect(() => {
    updateCryptoData(cryptoData); // Обновляем данные о криптовалютах при их изменении
  }, [cryptoData, updateCryptoData]);
};
