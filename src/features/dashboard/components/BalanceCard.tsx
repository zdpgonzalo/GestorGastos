import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { type ThemeColors } from '@/constants/theme';
import { formatCurrency } from '@/shared/formatting/formatCurrency';
import { useTheme } from '@/shared/theme/ThemeProvider';

type BalanceCardProps = {
  balance: number;
  income: number;
  expenses: number;
};

/** A card component that displays the user's balance, income, and expenses 
 * for the current month.
 * @param balance - The total balance for the month.
 * @param income - The total income for the month.
 * @param expenses - The total expenses for the month.
 */
export function BalanceCard({
  balance,
  income,
  expenses,
}: BalanceCardProps) {
    const { colors } = useTheme();
    
    const styles = createSytles(colors);

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

/** Creates a StyleSheet object for the BalanceCard component based 
 * on the provided theme colors.
 * @param colors - An object containing the theme colors to be used in 
 * the styles.
 */
function createSytles(
    colors: ThemeColors
){
    return StyleSheet.create({
        card: {
            backgroundColor: colors.backgroundElement,
            borderRadius: 20,
            padding: 22,
            gap: 2,
            borderWidth: 1,
            borderColor: colors.border,
        },
        label: {
            fontSize: 14,
            fontWeight: '500',
            color: colors.textSecondary,
        },
        balance: {
            fontSize: 32,
            fontWeight: '700',
            color: colors.text,
            letterSpacing: -0.8,
        },
        summary: {
            flexDirection: 'row',
            gap: 32,
            marginTop: 36,
        },
        summaryItem: {
            flex: 1,
            gap: 2,
        },
        summaryLabel: {
            fontSize: 13,
            fontWeight: '500',
            color: colors.textSecondary,
        },
        income: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.income,
        },
        expenses: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.expense,
        },
    });
}