import {
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { type ThemeColors } from '@/constants/theme';
import { useTheme } from '@/shared/theme/ThemeProvider';

export type TransactionFilter = 'all' | 'expenses' | 'income';

interface Props{
    value: TransactionFilter;
    onChange: (value: TransactionFilter) => void;
}

const OPTIONS: {label: string; value: TransactionFilter}[] = [
    {label: 'Todos', value: 'all'},
    {label: 'Gastos', value: 'expenses'},
    {label: 'Ingresos', value: 'income'},
];

/**
 * Renders a set of tabs for filtering transactions by type (all, expenses, income).
 * @param value - The currently selected transaction filter.
 * @param onChange - Callback function invoked when a tab is pressed, changing the filter.
 */
export function TransactionTypeTabs({
    value,
    onChange,
}: Props) {
    const { colors } = useTheme();

    const styles = createStyles(colors);

    return (
        <View 
            style= {styles.container}
            accessibilityRole="tablist"
        >
            {OPTIONS.map((option) => {
                const selected = value === option.value;

                return(
                    <Pressable
                        key={option.value}
                        accessibilityRole="tab"
                        accessibilityState={{selected}}
                        onPress={() => onChange(option.value)}
                        style={({pressed}) => [
                            styles.tab,
                            selected && styles.selectedTab,
                            pressed && styles.pressed,
                        ]}
                    >
                        <Text style={[
                            styles.label,
                            {
                                color: selected 
                                    ? colors.text 
                                    : colors.textSecondary,
                            },
                            selected && styles.selectedLabel,
                        ]}>
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    )
}

/**
 * Creates a StyleSheet object for the TransactionTypeTabs component based on the provided theme colors.
 * @param colors - An object containing the theme colors to be used in the styles.
 * @returns A StyleSheet object with styles for the TransactionTypeTabs component.
 */
function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 10,
    },
    tab: {
      flex: 1,
      minHeight: 32,
      borderRadius: 999,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    selectedTab: {
      backgroundColor: colors.backgroundSelected,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
    },
    selectedLabel: {
      fontWeight: '600',
    },
    pressed: {
      opacity: 0.7,
    },
  });
}