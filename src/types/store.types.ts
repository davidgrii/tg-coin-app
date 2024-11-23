import { ICrypto, IGlobalMarketData, IPortfolioItem } from '@/types/crypto.types'

export interface ICryptoStore {
  favorites: string[]
  isLoading: boolean
  cryptoData: ICrypto[]
  addFavorite: (userId: string, id: string) => Promise<void>
  removeFavorite: (userId: string, id: string) => Promise<void>
  initializeFavorites: (userId: string) => Promise<void>
  setCryptoData: (data: ICrypto[]) => void
}

export interface IPortfolioStore {
  portfolio: IPortfolioItem[]
  initialPortfolio: IPortfolioItem[]
  cryptoData: ICrypto[]
  totalBalance: number
  totalInvestedUSD: number
  totalProfitLoss: number
  totalPriceChange24h: number
  totalProfitLossPercentage: number
  totalPercentageChange24h: number
  isLoading: boolean
  initializePortfolio: (userId: string) => Promise<void>
  addCrypto: (userId: string, cryptoId: string, quantity: number, purchase: number, notice?: string) => Promise<void>
  updateCrypto: (userId: string, cryptoId: string, updatedData: IPortfolioItem) => Promise<void>
  deleteCrypto: (userId: string, cryptoId: string) => Promise<void>
  updateCryptoData: (data: ICrypto[]) => void
  calculateTotalBalance: () => void
  calculateTotalInvestedUSD: () => void
  calculateTotalPercentageChange24h: () => void
  calculateTotalProfitLossPercentage: () => void
  calculateTotalProfitLoss: () => void
  calculateTotalPriceChange24h: () => void
  isSorted: boolean
  sortPortfolio: () => void
}

export interface IDashboardStore {
  dashboardData: IGlobalMarketData | null
  fetchGlobalData: () => Promise<void>
}

export interface ISearchStore {
  isSearchOpen: boolean
  toggleSearch: (state: boolean) => void
  closeSearch: () => void
}