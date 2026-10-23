import { type ThemeColors } from '@/constants/theme';
import { Expense } from '@/domain/expenses/Expense';
import { ExpenseCategory } from '@/domain/expenses/ExpenseCategory';
import { TransactionRow } from '@/features/transactions/components/TransactionRow';
import { useTheme } from '@/shared/theme/ThemeProvider';
import {
  StyleSheet,
  View
} from 'react-native';

function createMockExpense(
  description: string,
  amount: number,
  category: ExpenseCategory,
  date: Date,
): Expense {
  const result = Expense.create(
    description,
    amount,
    category,
    date,
  );

  if (!result.isSuccess) {
    throw new Error(
      `Error creando la transacción de prueba: ${description}`,
    );
  }

  return result.value;
}

const RECENT_TRANSACTIONS: Expense[] = [
  createMockExpense(
    'Compra supermercado',
    -54.8,
    ExpenseCategory.Food,
    new Date(2026, 9, 23, 10, 30),
  ),
  createMockExpense(
    'Factura de internet',
    -39.99,
    ExpenseCategory.Utilities,
    new Date(2026, 9, 22, 12, 0),
  ),
  createMockExpense(
    'Nómina',
    3200,
    ExpenseCategory.Miscellaneous,
    new Date(2026, 9, 1, 9, 0),
  ),
];

export function RecentTransactions() {
  const { colors } = useTheme();
  
  const styles = createStyles(colors);

  const handleTransactionPress = (expense: Expense) => {
  };

  return (
    <View style={styles.container}>
      {RECENT_TRANSACTIONS.map((transaction, index) => (
        <View key={transaction.id}>
          <TransactionRow
            expense={transaction}
            onPress={handleTransactionPress}
          />

          {index < RECENT_TRANSACTIONS.length - 1 && (
            <View style={styles.divider} />
          )}
        </View>
      ))}
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.backgroundElement,
      borderRadius: 18,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    divider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
    },
  });
}