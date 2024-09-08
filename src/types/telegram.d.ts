interface TelegramWebApp {
  ready: () => void;                            // Метод для инициализации
  setHeaderColor: (color: string) => void;     // Метод для установки цвета заголовка
  setFooterColor: (color: string) => void;     // Метод для установки цвета нижней панели
  expand: () => void;                           // Метод для развертывания мини-приложения
  isExpanded: boolean;                          // Свойство, показывающее, развернуто ли приложение
  // Добавляем методы для установки цвета фона и нижней панели
  setBackgroundColor: (color: string) => void; // Метод для установки цвета фона
  setBottomBarColor: (color: string) => void;  // Метод для установки цвета нижней панели
  themeParams: {
    bg_color: string;                           // Цвет фона
    secondary_bg_color: string;
  };
}

interface Window {
  Telegram: {
    WebApp: TelegramWebApp;
  };
}
