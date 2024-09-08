interface TelegramWebApp {
  ready: () => void;                            // Метод для инициализации
  setHeaderColor: (color: string) => void;     // Метод для установки цвета заголовка
  setFooterColor: (color: string) => void;     // Метод для установки цвета нижней панели
  expand: () => void;                           // Метод для развертывания мини-приложения
  isExpanded: boolean;                          // Свойство, показывающее, развернуто ли приложение
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}
