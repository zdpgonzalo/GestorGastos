import {
    createContext,
    useContext,
    useMemo,
    type ReactNode,
} from 'react';

import { Colors, type ThemeColors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

type ThemeContextValue = {
    colors: ThemeColors;
    colorScheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
    children: ReactNode;
}

/**
 * Provides theme context to the application, 
 * allowing components to access color schemes and theme colors.
 * @param children - The child components that will have access 
 * to the theme context.
 */
export function ThemeProvider(
    {children}: ThemeProviderProps
){
    const systemColorScheme = useColorScheme();

    const colorScheme: 'light' | 'dark' =
        systemColorScheme === 'dark' ? 'dark' : 'light';
    
    const value = useMemo(() => ({
        colors: Colors[colorScheme],
        colorScheme,
    }), [colorScheme]);

    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * A custom hook to access the theme context, providing the current color scheme and theme colors.
 * @returns The current theme context value, including colors and color scheme.
 * @throws Will throw an error if used outside of a ThemeProvider.
 */
export function useTheme(){
    const context = useContext(ThemeContext);

    if(!context){
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}