import { Ionicons } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    TextInput,
    View,
    useColorScheme,
} from "react-native";

import { Colors, type ThemeColors } from "@/constants/theme";

interface Props{
    value: string;
    onChangeText: (value: string) => void;
}

/** 
 * Renders a search bar for filtering transactions. 
 * It includes an input field for entering the search query and 
 * a clear button to reset the search.
 * @param value - The current value of the search input.
 * @param onChangeText - Callback function invoked when the text in the input changes.
 */
export function TransactionSearchBar({
    value,
    onChangeText,
}: Props) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme === "dark" ? "dark" : "light"];

    const styles = createStyles(colors);

    return(
        <View style={styles.container}>
            <Ionicons
                name= "search-outline"
                size={20}
                color={colors.textSecondary}
            />

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Buscar transacción"
                placeholderTextColor={colors.textSecondary}
                selectionColor={colors.accent}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                accessibilityLabel="Buscar transacción"
                style={styles.input}
            />

            {value.length > 0 && (
                <Pressable
                    onPress={() => onChangeText('')}
                    accessibilityRole="button"
                    accessibilityLabel="Borrar búsqueda"
                    hitSlop={8}
                    style={({pressed}) => [
                        styles.clearButton,
                        pressed && styles.pressed,
                    ]}
                >
                    <Ionicons
                        name="close-circle"
                        size={20}
                        color={colors.textSecondary}
                    />
                </Pressable>
            )}
        </View>
    )
}

/** Creates a StyleSheet object for the TransactionSearchBar component based on the provided theme colors.
 * @param colors - An object containing the theme colors to be used in the styles.
 * @returns A StyleSheet object with styles for the TransactionSearchBar component.
 */
function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      minHeight: 48,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingHorizontal: 14,
      backgroundColor: colors.backgroundElement,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
    },
    input: {
      flex: 1,
      minWidth: 0,
      paddingVertical: 10,
      fontSize: 15,
      color: colors.text,
    },
    clearButton: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressed: {
      opacity: 0.6,
    },
  });
}