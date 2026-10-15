import { StyleSheet, Text, View } from 'react-native';

type Transaction = {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
};

const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Compra supermercado',
    category: 'Alimentación',
    date: 'Hoy',
    amount: -54.8,
  },
  {
    id: '2',
    title: 'Factura de internet',
    category: 'Hogar',
    date: 'Ayer',
    amount: -39.99,
  },
  {
    id: '3',
    title: 'Nómina',
    category: 'Ingresos',
    date: '1 oct.',
    amount: 3200,
  },
];

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(Math.abs(amount));

export function RecentTransactions() {
  return (
    <View style={styles.container}>
      {transactions.map((transaction, index) => (
        <View key={transaction.id}>
          <View style={styles.row}>
            <View style={styles.icon}>
              <Text style={styles.iconText}>
                {transaction.amount > 0 ? '+' : '−'}
              </Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.title}>
                {transaction.title}
              </Text>

              <Text style={styles.subtitle}>
                {transaction.category} · {transaction.date}
              </Text>
            </View>

            <Text
              style={[
                styles.amount,
                transaction.amount > 0
                  ? styles.income
                  : styles.expense,
              ]}
            >
              {transaction.amount > 0 ? '+' : '−'}
              {formatCurrency(transaction.amount)}
            </Text>
          </View>

          {index < transactions.length - 1 && (
            <View style={styles.divider} />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#475569',
  },
  details: {
    flex: 1,
    gap: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  amount: {
    fontSize: 13,
    fontWeight: '600',
  },
  income: {
    color: '#15803D',
  },
  expense: {
    color: '#DC2626',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});