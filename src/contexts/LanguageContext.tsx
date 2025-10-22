import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: typeof translations.en;
  isAdminRoute: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Helper function to check if current route is admin
const checkIsAdminRoute = (): boolean => {
  return window.location.pathname.startsWith('/admin');
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdminRoute());

  // Admin routes are always LTR and English, public routes follow language setting
  const effectiveLanguage = isAdminRoute ? 'en' : language;
  const isRTL = !isAdminRoute && language === 'ar';

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Only update document direction if not on admin route
    if (!checkIsAdminRoute()) {
      document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLanguage;
    }
  };

  // Listen for route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdminRoute(checkIsAdminRoute());
    };

    // Check on mount and when pathname changes
    handleRouteChange();

    // Listen to popstate (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange);
    
    // Listen to pushState and replaceState (programmatic navigation)
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function(...args) {
      originalPushState.apply(window.history, args);
      handleRouteChange();
    };

    window.history.replaceState = function(...args) {
      originalReplaceState.apply(window.history, args);
      handleRouteChange();
    };

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  useEffect(() => {
    // Admin routes always stay LTR and English
    if (isAdminRoute) {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    } else {
      // Public routes follow language setting
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, isAdminRoute]);

  const value = {
    language,
    setLanguage,
    isRTL,
    t: translations[effectiveLanguage],
    isAdminRoute,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};