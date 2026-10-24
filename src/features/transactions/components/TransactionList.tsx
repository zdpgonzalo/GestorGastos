import {
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Fonts, type ThemeColors } from '@/constants/theme';
import { type Expense } from '@/domain/expenses/Expense';
import { formatTransactionDay } from '@/shared/formatting/formatTransactionDate';
import { useTheme } from '@/shared/theme/ThemeProvider';
import { groupExpensesByDay } from '../utils/groupExpensesByDay';
import { TransactionRow } from './TransactionRow';

interface Props {
  expenses: Expense[];
  onExpensePress: (expense: Expense) => void;
}

/** Renders a list of transactions grouped by day, with each transaction displayed as a row.
 * @param expenses - An array of Expense objects to be displayed in the list.
 * @param onExpensePress - Callback function invoked when a transaction row is pressed.
 */
export function TransactionList({
  expenses,
  onExpensePress,
}: Props) {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const sections = groupExpensesByDay(expenses).map((group) => ({
        key: group.key,
        title: formatTransactionDay(group.date),
        data: group.expenses,
    }));

    return (
        <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        renderSectionHeader={({ section }) => (
            <Text style={styles.header}>
            {section.title}
            </Text>
        )}
        renderItem={({ item, index, section }) => (
            <View>
            <TransactionRow
                expense={item}
                onPress={onExpensePress}
            />

            {index < section.data.length - 1 && (
                <View style={styles.separator} />
            )}
            </View>
        )}
        renderSectionFooter={() => (
            <View style={styles.footer} />
        )}
    />
  );
}

/**
 * Creates a StyleSheet object for the TransactionList component based on the provided theme colors.
 * @param colors - An object containing the theme colors to be used in the styles.
 * @returns A StyleSheet object with styles for the TransactionList component.
 */
function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    content: {
      paddingBottom: 24,
    },
    header: {
      fontFamily: Fonts.semiBold,
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 8,
      textTransform: 'capitalize',
    },
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
      marginLeft: 36,
    },
    footer: {
      height: 22,
    },
  });
}