import 'i18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: {
        market: string
        favorites: string
        portfolio: string
        search: string
        table_header: {
          rank: string
          coin: string
          price: string
          change: string
        }
        dashboard: {
          market_cap: string
          n_a: string
        }
        dashboard_balance: {
          my_balance: string
          "24h": string
        }
        empty_favorites: {
          no_coins: string
          add_first: string
        }
        add_crypto: {
          add_coin: string
          add_coin_desc: string
          choose: string
          quantity: string
          btn: string
        }
        edit_crypto: {
          edit_coin: string
          quantity: string
          btn: string
        }
      }
    }
  }
}
