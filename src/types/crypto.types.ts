export interface ICrypto {
  _id: string
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  price_change_24h: number
}

export interface IPortfolioItem {
  _id: string
  cryptoId: string
  quantity: number
  purchasePrice: number
  notice?: string
  crypto: ICrypto
}

export interface IPortfolioStore {
  portfolio: IPortfolioItem[]
  initialPortfolio: IPortfolioItem[]
  cryptoData: ICrypto[]
  totalBalance: number
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
  calculateTotalPercentageChange24h: () => void
  calculateTotalProfitLossPercentage: () => void
  calculateTotalProfitLoss: () => void
  calculateTotalPriceChange24h: () => void
  isSorted: boolean
  sortPortfolio: () => void
}

export interface IGlobalMarketData {
  active_cryptocurrencies?: number
  total_market_cap?: { [key: string]: number }
  total_volume?: { [key: string]: number }
  market_cap_change_percentage_24h_usd?: number
  market_cap_percentage?: { btc: number}
}
