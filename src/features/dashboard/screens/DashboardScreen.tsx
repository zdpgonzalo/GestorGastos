import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { BalanceCard } from '../components/BalanceCard';
import { RecentTransactions } from '../components/RecentTransactions';

export default function DashboardScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola 👋</Text>
        <Text style={styles.title}>Tu resumen financiero</Text>
      </View>

      <BalanceCard
        balance={2450.75}
        income={3200}
        expenses={749.25}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Últimos movimientos</Text>
        <RecentTransactions />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    color: '#64748B',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: '#0F172A',
  },
  section: {
    gap: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#0F172A',
  },
});