import { StyleSheet, Text, View } from 'react-native';

type BalanceCardProps = {
  balance: number;
  income: number;
  expenses: number;
};

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);

export function BalanceCard({
  balance,
  income,
  expenses,
}: BalanceCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Balance del mes</Text>

      <Text style={styles.balance}>
        {formatCurrency(balance)}
      </Text>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Ingresos</Text>
          <Text style={styles.income}>
            +{formatCurrency(income)}
          </Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Gastos</Text>
          <Text style={styles.expenses}>
            -{formatCurrency(expenses)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  label: {
    fontSize: 14,
    color: '#64748B',
  },
  balance: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0F172A',
  },
  summary: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 12,
  },
  summaryItem: {
    flex: 1,
    gap: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#64748B',
  },
  income: {
    fontSize: 16,
    fontWeight: '600',
    color: '#15803D',
  },
  expenses: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
});