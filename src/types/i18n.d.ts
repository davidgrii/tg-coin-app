import 'i18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNamespace: 'translation';
    resources: {
      translation: {
        market: string;          
        favorites: string;
        portfolio: string;
        market_cap: string;
        n_a: string;
      };
    };
  }
}
