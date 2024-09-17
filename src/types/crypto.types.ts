export interface ICrypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  quantity: number
  current_price: number;
  price_change_percentage_24h: number;
}

export interface IPortfolio {
  portfolio: ICrypto[]
  totalBalance: number
  totalPercentageChange: number;
  addCrypto: (crypto: ICrypto) => void
  updateCrypto: (index: number, updatedCrypto: ICrypto) => void
  deleteCrypto: (index: number) => void
  calculateTotalBalance: () => void
  calculateTotalPercentageChange: () => void
}

export interface IGlobalMarketData {
  active_cryptocurrencies?: number
  total_market_cap?: { [key: string]: number }
  market_cap_change_percentage_24h_usd?: number
}
