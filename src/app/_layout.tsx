
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Colors } from '@/constants/theme';
import { initializeDatabase } from '@/infrastructure/database/migrations/initializeDatabase';
import * as NavigationBar from 'expo-navigation-bar';

import { ThemeProvider as AppThemeProvider } from '@/shared/theme/ThemeProvider';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
  Stack
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import { Platform, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const colorScheme = systemColorScheme === 'dark' 
    ? 'dark' 
    : 'light';

  const colors = Colors[colorScheme];
  const navigationTheme = colorScheme === 'dark' 
    ? DarkTheme 
    : DefaultTheme;

  useEffect(() => {
    if (Platform.OS === 'android') {
      void NavigationBar.setStyle(
        colorScheme === 'dark' ? 'light' : 'dark'
      );
    }
  }, [colorScheme]);

  return (
    <SafeAreaProvider>
      <SQLiteProvider
        databaseName="gestor_gastos.db"
        onInit={initializeDatabase}
      >
        <NavigationThemeProvider value={navigationTheme}>
          <AppThemeProvider>
            <View 
              style={{ 
                flex: 1, 
                backgroundColor: colors.background 
              }}>
            
              <SafeAreaView
                style={{ 
                  flex: 1, 
                  backgroundColor: colors.background
                }}
                edges={['top']}
              >
                <AnimatedSplashOverlay />

                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(tabs)" />
                </Stack>
              </SafeAreaView>
            </View>
          
          </AppThemeProvider>
        </NavigationThemeProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
