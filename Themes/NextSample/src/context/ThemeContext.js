import { createContext, useContext } from 'react';

const AppContext = createContext()

export function ThemeConfigWrapper({ themeConfig, children }) {
    return (
        <AppContext.Provider value={themeConfig}>
            {children}
        </AppContext.Provider>
    );
}

export function useThemeConfigContext() {
    return useContext(AppContext)
}