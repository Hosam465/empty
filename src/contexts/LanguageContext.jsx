import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => localStorage.getItem('appLang') || 'en');

    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    useEffect(() => {
        document.documentElement.setAttribute('dir', dir);
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('appLang', lang);
    }, [lang, dir]);

    const toggleLanguage = () => setLang((prev) => (prev === 'en' ? 'ar' : 'en'));

    const t = (key) => translations[lang]?.[key] ?? translations.en[key] ?? key;

    return (
        <LanguageContext.Provider value={{ lang, dir, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
