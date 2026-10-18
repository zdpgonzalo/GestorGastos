/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';


export const Colors = {
  light: {
    text: '#202522',
    background: '#F3F3EF',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E1E5DF',
    textSecondary: '#707871',

    accent: '#1B6A50',
    accentPressed: '#124A39',
    border: '#D9DED8',

    income: '#18794E',
    incomeBackground: '#DCEFE3',
    expense: '#C44747',
    expenseBackground: '#F8E3E1',

    warning: '#996016',
    warningBackground: '#F5E9CF',
  },

  dark: {
    text: '#F0F2EF',
    background: '#0D100F',
    backgroundElement: '#191E1B',
    backgroundSelected: '#29322C',
    textSecondary: '#A1AAA3',

    accent: '#72B59A',
    accentPressed: '#91CDB3',
    border: '#303832',

    income: '#72B59A',
    incomeBackground: '#19372B',
    expense: '#F08078',
    expenseBackground: '#402321',

    warning: '#E8BC69',
    warningBackground: '#3B301C',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
