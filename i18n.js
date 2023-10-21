import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import En from './src/renderer/locales/en.json';
import Es from './src/renderer/locales/es.json';
import Ru from './src/renderer/locales/ru.json';
import Ja from './src/renderer/locales/ja.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: En,
      },
      es: {
        translation: Es,
      },
      ru: {
        translation: Ru,
      },
      ja: {
        translation: Ja,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;