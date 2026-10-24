import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Fonts, type ThemeColors } from '@/constants/theme';
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

    const total = income - expenses;

    const incomePercentage =
        total > 0 ? (income/total)*100 : 0;

    const expensesPercentage =
        total > 0 ? (expenses/total)*100 : 0;

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

                <View style={[styles.summaryItem, styles.expensesItem]}>
                    <Text style={styles.summaryLabel}>Gastos</Text>
                    <Text style={styles.expenses}>
                        -{formatCurrency(expenses)}
                    </Text>
                </View>
            </View>

            <View style={styles.progressContainer}>
                <View
                    style={[
                        styles.progressBar,
                        {
                            flex: incomePercentage,
                            backgroundColor: colors.income,
                        }
                    ]}
                />
                <View
                    style={[
                        styles.progressBar,
                        {
                            flex: expensesPercentage,
                            backgroundColor: colors.expense,
                        }
                    ]}
                />
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
            fontFamily: Fonts.medium,
            fontSize: 14,
            fontWeight: '500',
            color: colors.textSecondary,
        },
        balance: {
            fontFamily: Fonts.bold,
            fontSize: 32,
            fontWeight: '700',
            color: colors.text,
            letterSpacing: -0.8,
        },
        summary: {
            flexDirection: 'row',
            gap: 32,
            marginTop: 16,
        },
        summaryItem: {
            flex: 1,
            gap: 2,
        },
        summaryLabel: {
            fontFamily: Fonts.medium,
            fontSize: 13,
            color: colors.textSecondary,
        },
        expensesItem: {
            alignItems: 'flex-end',
        },
        income: {
            fontFamily: Fonts.semiBold,
            fontSize: 16,
            color: colors.income,
        },
        expenses: {
            fontFamily: Fonts.semiBold,
            fontSize: 16,
            color: colors.expense,
        },
        progressContainer: {
            flexDirection: 'row',
            gap: 5,
            height: 4,
            marginTop: 5,
        },
        progressBar: {
            height: '100%',
            borderRadius: 999,
        },
    });
}