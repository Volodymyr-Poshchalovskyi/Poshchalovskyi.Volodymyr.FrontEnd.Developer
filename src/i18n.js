// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // Додаємо детектор мови
  .use(LanguageDetector)
  // Додаємо бекенд для завантаження JSON перекладів
  .use(HttpBackend)
  // Підключаємо React
  .use(initReactI18next)
  .init({
    fallbackLng: 'uk', // мова за замовчуванням
    debug: true,       // логування для дебагу

    interpolation: {
      escapeValue: false, // React сам екранує
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // шлях до перекладів
    },

    detection: {
      // порядок перевірки мови
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'], // зберігаємо вибір мови
    },
  });

export default i18n;
