export interface ICrypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export interface IGlobalMarketData {
  active_cryptocurrencies?: number
  total_market_cap?: { [key: string]: number }
  market_cap_change_percentage_24h_usd?: number
}
