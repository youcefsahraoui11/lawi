import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import ar from './ar.json';
import fr from './fr.json';
import en from './en.json';

const resources = {
  ar: { translation: ar },
  fr: { translation: fr },
  en: { translation: en },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export const isRTL = (lang: string) => {
  return lang === 'ar';
};

// React Native helper to change direction layout
export const configureLanguageDirection = (lang: string) => {
  const shouldBeRTL = isRTL(lang);
  
  // Set HTML document direction if running in a web browser
  if (typeof document !== 'undefined') {
    document.documentElement.dir = shouldBeRTL ? 'rtl' : 'ltr';
  }

  try {
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      return true; // indicates restart might be required in real device
    }
  } catch (e) {
    console.warn('I18nManager calls failed (expected on Web):', e);
  }
  return false;
};

export default i18n;
