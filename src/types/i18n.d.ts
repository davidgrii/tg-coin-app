import 'i18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNamespace: 'translation';
    resources: {
      translation: {
        market_cap: string;
        n_a: string;
      };
    };
  }
}
