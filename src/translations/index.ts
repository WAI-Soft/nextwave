import { navigationEn } from './navigation.en';
import { navigationAr } from './navigation.ar';
import { footerEn } from './footer.en';
import { footerAr } from './footer.ar';
import { contactEn } from './contact.en';
import { contactAr } from './contact.ar';
import { aboutEn } from './about.en';
import { aboutAr } from './about.ar';
import { portfolioEn } from './portfolio.en';
import { portfolioAr } from './portfolio.ar';
import { homeEn } from './home.en';
import { homeAr } from './home.ar';
import { servicesEn } from './services.en';
import { servicesAr } from './services.ar';

export const translations = {
  en: {
    navigation: navigationEn,
    footer: footerEn,
    contact: contactEn,
    about: aboutEn,
    portfolio: portfolioEn,
    home: homeEn,
    services: servicesEn
  },
  ar: {
    navigation: navigationAr,
    footer: footerAr,
    contact: contactAr,
    about: aboutAr,
    portfolio: portfolioAr,
    home: homeAr,
    services: servicesAr
  }
};

export type TranslationKey = keyof typeof translations.en;
export type Language = keyof typeof translations;