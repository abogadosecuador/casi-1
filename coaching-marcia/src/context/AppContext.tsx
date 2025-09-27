import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [language, setLanguage] = useState<'es' | 'en'>('es');

    useEffect(() => {
        // Cargar preferencias del localStorage
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const savedLanguage = localStorage.getItem('language') as 'es' | 'en' | null;

        if (savedTheme) {
            setTheme(savedTheme);
        }

        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    useEffect(() => {
        // Aplicar tema al documento
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        // Guardar idioma en localStorage
        localStorage.setItem('language', language);
    }, [language]);

    const value: AppContextType = {
        theme,
        setTheme,
        language,
        setLanguage
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
