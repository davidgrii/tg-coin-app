interface TelegramWebApp {
  ready: () => void;
  setHeaderColor: (color: string) => void;
  setFooterColor: (color: string) => void;
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}