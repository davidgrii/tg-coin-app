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

export interface IChartCoinData {
  one_day: {
    prices: [number, number][]
    market_caps: [number, number][]
    volumes: [number, number][]
  }
  seven_days: {
    prices: [number, number][]
    market_caps: [number, number][]
    volumes: [number, number][]
  }
}

export interface ICoinGlobalMarketsData {
  exchange: string
  volume_24h: number
}

export interface IMarketsCoinData {
  market_cap: number
  fdv: number
  volume_24h: number
  circulating_supply: number
  total_supply: number
  all_time_high: number
}

export interface ICryptoDetails {
  markets_coin_data: IMarketsCoinData
  markets: ICoinGlobalMarketsData[]
  chart_data: IChartCoinData
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
