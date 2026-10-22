import { Ionicons } from '@expo/vector-icons';
import {
    Pressable,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import { Colors, ThemeColors } from '@/constants/theme';
import { Expense } from '@/domain/expenses/Expense';
import { formatCurrency } from '@/shared/formatting/formatCurrency';
import { EXPENSE_PRESENTATION } from '../utils/expensePresentation';

interface Props{
    expense: Expense;
    onPress: (expense: Expense) => void;
}

/**
 * Renders a single transaction row, displaying the expense's
 * category and amount.
 *
 * @param expense - The expense to display.
 * @param onPress - Callback invoked when the row is pressed.
 */
export function TransactionRow({
    expense,
    onPress,
}: Props) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

    const styles = createStyles(colors);
    const presentation = EXPENSE_PRESENTATION[expense.category];

    const isIncome = expense.amount > 0;
    const amountColor = isIncome ? colors.income : colors.expense;
    const amountPrefix = isIncome ? '+' : '-';

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${expense.description}, ${formatCurrency(expense.amount)}`}
            onPress={() => onPress(expense)}
            style={({pressed}) => [
                styles.row,
                pressed && styles.pressed,
            ]}
        >
            <Ionicons
                name={presentation.icon}
                size={22}
                color={colors.textSecondary}
            />

            <View style={styles.details}>
                <Text 
                    numberOfLines={1}
                    style={styles.title}
                >
                    {presentation.label}
                </Text>

                <Text
                    numberOfLines={1}
                    style={styles.subtitle}
                >
                    {presentation.label}
                </Text>
            </View>

            <Text 
                numberOfLines={1}
                style= {[
                    styles.amount,
                    {color: amountColor},
            ]}>
                {amountPrefix}
                {formatCurrency(Math.abs(expense.amount))}
            </Text>
        </Pressable>
    )
}

/**
 * Creates styles adapted to the active color scheme.
 *
 * @param theme - Colors for the current theme.
 */
function createStyles(theme: ThemeColors) {
  return StyleSheet.create({
    row: {
      minHeight: 68,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingVertical: 10,
    },
    pressed: {
      opacity: 0.7,
    },
    details: {
      flex: 1,
      minWidth: 0,
      gap: 4,
    },
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.text,
    },
    subtitle: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    amount: {
      fontSize: 14,
      fontWeight: '600',
      fontVariant: ['tabular-nums'],
    },
  });
}