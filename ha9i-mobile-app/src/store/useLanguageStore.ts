import { create } from 'zustand';
import i18n, { configureLanguageDirection, isRTL } from '../i18n';

interface LanguageState {
  language: string;
  isRtl: boolean;
  setLanguage: (lang: string) => boolean; // returns true if App requires reload (due to I18nManager forceRTL)
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'ar',
  isRtl: true,
  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    const requiresReload = configureLanguageDirection(lang);
    set({
      language: lang,
      isRtl: isRTL(lang),
    });
    return requiresReload;
  },
}));
