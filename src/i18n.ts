import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEn from './locales/en.json'
import translationRu from './locales/ru.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      ru: { translation: translationRu },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
