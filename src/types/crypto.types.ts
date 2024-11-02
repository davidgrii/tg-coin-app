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

export interface ITrendingCrypto extends ICrypto {
  price: number
  market_cap_rank: number
  price_change_percentage_24h_usd: number
}

export interface IPortfolioItem {
  _id: string
  cryptoId: string
  quantity: number
  purchasePrice: number
  notice?: string
  crypto: ICrypto
}

export interface IGlobalMarketData {
  active_cryptocurrencies?: number
  total_market_cap?: { [key: string]: number }
  total_volume?: { [key: string]: number }
  market_cap_change_percentage_24h_usd?: number
  market_cap_percentage?: { btc: number }
}
