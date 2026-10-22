import { type ThemeColors } from '@/constants/theme';
import { Expense } from '@/domain/expenses/Expense';
import { useTheme } from '@/shared/theme/ThemeProvider';
import { useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { ExpenseCategory } from '@/domain/expenses/ExpenseCategory';
import { TransactionList } from '@/features/transactions/components/TransactionList';
import { TransactionSearchBar } from '@/features/transactions/components/TransactionSearchBar';
import {
    TransactionTypeTabs,
    type TransactionFilter,
} from '@/features/transactions/components/TransactionTypeTabs';

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

const MOCK_EXPENSES: Expense[] = [
  createMockExpense(
    'Compra semanal',
    -54.80,
    ExpenseCategory.Food,
    new Date(2026, 9, 22, 10, 30),
  ),

  createMockExpense(
    'Gasolina',
    -42.00,
    ExpenseCategory.Transportation,
    new Date(2026, 9, 22, 12, 15),
  ),

  createMockExpense(
    'Café con amigos',
    8.50,
    ExpenseCategory.Food,
    new Date(2026, 9, 21, 17, 45),
  ),

  createMockExpense(
    'Suscripción mensual',
    -12.99,
    ExpenseCategory.Entertainment,
    new Date(2026, 9, 20, 9, 0),
  ),

  createMockExpense(
    'Cena del viernes',
    -32.40,
    ExpenseCategory.Food,
    new Date(2026, 9, 18, 21, 0),
  ),

];

interface Props {
  onExpensePress?: (expense: Expense) => void;
}

export function TransactionsScreen({
  onExpensePress,
}: Props) {
  const { colors } = useTheme();

  const styles = useMemo(
    () => createStyles(colors),
    [colors],
  );

  const [filter, setFilter] = useState<TransactionFilter>('all');
  const [search, setSearch] = useState('');

  const visibleExpenses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return MOCK_EXPENSES.filter((expense) => {
      // No hay ingresos de ejemplo todavía.
      if (filter === 'income') {
        return false;
      }

      if (filter === 'expenses' && expense.amount >= 0) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return expense.description
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [filter, search]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Transacciones
        </Text>
      </View>

      <View style={styles.controls}>
        <TransactionSearchBar
          value={search}
          onChangeText={setSearch}
        />

        <TransactionTypeTabs
          value={filter}
          onChange={setFilter}
        />
      </View>

      <View style={styles.listContainer}>
        {visibleExpenses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              {filter === 'income'
                ? 'Todavía no hay ingresos'
                : 'No se encontraron transacciones'}
            </Text>

            <Text style={styles.emptyDescription}>
              {filter === 'income'
                ? 'Los ingresos aparecerán aquí cuando estén disponibles.'
                : 'Prueba con otra búsqueda.'}
            </Text>
          </View>
        ) : (
          <TransactionList
            expenses={visibleExpenses}
            onExpensePress={(expense) => {
              onExpensePress?.(expense);
            }}
          />
        )}
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 20,
      gap: 6,
    },
    title: {
      fontSize: 25,
      fontWeight: '700',
      color: colors.text,
    },
    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    controls: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      gap: 12,
    },
    listContainer: {
      flex: 1,
      paddingHorizontal: 20,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
      gap: 8,
    },
    emptyTitle: {
      fontSize: 17,
      fontWeight: '600',
      textAlign: 'center',
      color: colors.text,
    },
    emptyDescription: {
      fontSize: 14,
      lineHeight: 20,
      textAlign: 'center',
      color: colors.textSecondary,
    },
  });
}