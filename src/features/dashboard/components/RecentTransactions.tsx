import { Colors, type ThemeColors } from '@/constants/theme';
import { formatCurrency } from '@/shared/formatting/formatCurrency';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme
} from 'react-native';

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

export function RecentTransactions() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      {transactions.map((transaction, index) => {
        const isIncome = transaction.amount > 0;

        return (
          <View key={transaction.id}>
            <View style={styles.row}>
              <View
                style={[
                  styles.icon,
                  isIncome
                    ? styles.incomeIcon
                    : styles.expenseIcon,
                ]}
              >
                <Text
                  style={[
                    styles.iconText,
                    isIncome
                      ? styles.incomeIconText
                      : styles.expenseIconText,
                  ]}
                >
                  {isIncome ? '+' : '−'}
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
                  isIncome ? styles.income : styles.expense,
                ]}
              >
                {isIncome ? '+' : '−'}
                {formatCurrency(transaction.amount)}
              </Text>
            </View>

            {index < transactions.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        );
      })}
    </View>
  );
}

/** Creates a StyleSheet object for the BalanceCard component based 
 * on the provided theme colors.
 * @param colors - An object containing the theme colors to be used in 
 * the styles.
 */
function createStyles(
  colors: ThemeColors
) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundElement,
      borderRadius: 18,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
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
      backgroundColor: colors.backgroundElement,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconText: {
      fontSize: 20,
      fontWeight: '600',
    },
    incomeIcon: {
      backgroundColor: colors.incomeBackground,
    },
    expenseIcon: {
      backgroundColor: colors.expenseBackground,
    },
    incomeIconText: {
      color: colors.income,
    },
    expenseIconText: {
      color: colors.expense,
    },
    details: {
      flex: 1,
      gap: 5,
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    subtitle: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    amount: {
      fontSize: 13,
      fontWeight: '600',
    },
    income: {
      color: colors.income,
    },
    expense: {
      color: colors.expense,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
    },
  });
}