import React, { createContext, useContext, useEffect, useState } from 'react';
import {LocaleType} from "@/schemas/GenericSchemas";

type PreferencesContextType = {
    localeActive: LocaleType;
    setLocaleActive: (value: LocaleType) => void;
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const usePreferences = () => {
    const context = useContext(PreferencesContext);
    if (!context) {
        throw new Error('usePreferences debe usarse dentro del PreferencesProvider');
    }
    return context;
};

const CURRENT_VERSION = '1.0.0';


export const PreferencesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [localeActive, setLocaleActive] = useState<LocaleType>("es");

    const resetPreferences = () => {
        localStorage.clear();
        localStorage.setItem('preferencesVersion', CURRENT_VERSION);
        setLocaleActive("es");
    }


    useEffect(() => {
        const storedPreferences = localStorage.getItem('userPreferences');
        const storedVersion = localStorage.getItem('preferencesVersion');

        if (storedPreferences && storedVersion === CURRENT_VERSION) {
            try {
                const preferences = JSON.parse(storedPreferences);
                setLocaleActive(preferences.localeActive || "es");
            } catch (e) {
                console.error("Error parsing user preferences:", e);
                resetPreferences();
            }
        } else {
            localStorage.setItem('preferencesVersion', CURRENT_VERSION);
            resetPreferences();
        }
    }, []);

    useEffect(() => {
        const preferences = JSON.stringify({
            localeActive
        });
        localStorage.setItem('userPreferences', preferences);
    }, [localeActive]);

    return (
        <PreferencesContext.Provider value={{
            localeActive, setLocaleActive
        }}>
            {children}
        </PreferencesContext.Provider>
    );
};
