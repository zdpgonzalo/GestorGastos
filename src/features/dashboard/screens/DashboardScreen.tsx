import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { type ThemeColors } from '@/constants/theme';
import { useTheme } from '@/shared/theme/ThemeProvider';

import { BalanceCard } from '../components/BalanceCard';
import { RecentTransactions } from '../components/RecentTransactions';

export default function DashboardScreen() {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          Tu resumen financiero
        </Text>
      </View>

      <BalanceCard
        balance={2450.75}
        income={3200}
        expenses={749.25}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Últimos movimientos
        </Text>

        <RecentTransactions />
      </View>
    </ScrollView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 20,
      paddingTop: 16,
      paddingBottom: 32,
      gap: 24,
    },
    header: {
      gap: 6,
    },
    greeting: {
      fontSize: 15,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    title: {
      fontSize: 25,
      fontWeight: '700',
      color: colors.text,
    },
    section: {
      gap: 10,
    },
    sectionTitle: {
      fontSize: 19,
      fontWeight: '700',
      color: colors.text,
    },
  });
}