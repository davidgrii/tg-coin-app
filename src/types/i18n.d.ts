import 'i18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNamespace: 'translation'
    resources: {
      translation: {
        market: string
        favorites: string
        portfolio: string
        friends: string
        search: string
        table_header: {
          rank: string
          coin: string
          price: string
          change: string
        }
        balance_table_header: {
          coin: string
          price: string
          value: string
        }
        dashboard: {
          market_cap: string
          n_a: string
        }
        dashboard_balance: {
          my_balance: string
          '24h': string
          'over_time': string
        }
        "dashboard_friends": {
          "coin": string
        },
        empty_favorites: {
          no_coins: string
          add_first_tap: string
          add_first: string
        }
        "empty_profile": {
          "no_invited": string
          "start_inviting": string
          "share": string
        },
        my_portfolio_page: {
          edit: string
          delete: string
          'purchase': string,
          'invested': string,
          'over_entry': string
          'are_agree': string,
          'agree_btn': string,
          'disagree': string
        }
        "my_friends_page": {
          "invite": string
          "leaderboard": string
          "users": string
          "you": string
          "friends": string
          "coin": string
          "copy_text": string
          "copy_link": string
          "invite_button": string
        }
        add_crypto: {
          add_coin: string
          add_coin_desc: string
          choose: string
          quantity: string
          'purchase': string,
          'note': string,
          btn: string
        }
        edit_crypto: {
          edit_coin: string
          quantity: string
          btn: string
        }
        input_search: {
          search: string
          cancel: string
        }
      }
    }
  }
}
