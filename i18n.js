import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Global from './src/renderer/locales/global.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ...Global,
    },
    lng: 'es',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
