interface TelegramWebApp {
  ready: () => void
  setHeaderColor: (color: string) => void
  expand: () => void
  isExpanded: boolean
  isVerticalSwipesEnabled:boolean
  setBackgroundColor: (color: string) => void
  setBottomBarColor: (color: string) => void
  initDataUnsafe: {
    user: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code: string
    }
  }

  themeParams: {
    bg_color: string
    secondary_bg_color: string;
  }
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp
  }
}
