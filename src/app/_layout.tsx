
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Colors } from '@/constants/theme';
import { initializeDatabase } from '@/infrastructure/database/migrations/initializeDatabase';
import * as NavigationBar from 'expo-navigation-bar';
import { DarkTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const backgroundColor = Colors.dark.background;

  useEffect(() => {
    if (Platform.OS === 'android') {
      void NavigationBar.setStyle('light');
    }
  }, []);

  return (
    <SafeAreaProvider>
      <SQLiteProvider
        databaseName="gestor_gastos.db"
        onInit={initializeDatabase}
      >
        <ThemeProvider value={DarkTheme}>
          <View style={{ flex: 1, backgroundColor }}>
            <SafeAreaView
              style={{ flex: 1, backgroundColor }}
              edges={['top', 'bottom']}
            >
              <AnimatedSplashOverlay />

              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
              </Stack>
            </SafeAreaView>
          </View>
        </ThemeProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
