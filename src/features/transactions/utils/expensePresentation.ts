import { ExpenseCategory } from "@/domain/expenses/ExpenseCategory";
import Ionicons from "@expo/vector-icons/Ionicons";

export type ExpenseIconName =
    React.ComponentProps<typeof Ionicons>['name'];

/** Represents the presentation details for an expense category, including its label and associated icon.
 * @property label - The display label for the expense category.
 * @property icon - The name of the icon associated with the expense category.
 */
export interface ExpensePresentation{
    label: string;
    icon: ExpenseIconName;
};

/** A mapping of each ExpenseCategory to its corresponding presentation details, including label and icon.
 * @property ExpenseCategory - The category of the expense.
 * @property ExpensePresentation - The presentation details for the expense category.
 */
export const EXPENSE_PRESENTATION: Record<
    ExpenseCategory,
    ExpensePresentation
> = {
    [ExpenseCategory.Food]: {
    label: 'Alimentación',
    icon: 'fast-food-outline',
  },
  [ExpenseCategory.Transportation]: {
    label: 'Transporte',
    icon: 'car-outline',
  },
  [ExpenseCategory.Entertainment]: {
    label: 'Ocio',
    icon: 'game-controller-outline',
  },
  [ExpenseCategory.Utilities]: {
    label: 'Suministros',
    icon: 'flash-outline',
  },
  [ExpenseCategory.Healthcare]: {
    label: 'Salud',
    icon: 'medkit-outline',
  },
  [ExpenseCategory.Education]: {
    label: 'Educación',
    icon: 'school-outline',
  },
  [ExpenseCategory.PersonalCare]: {
    label: 'Cuidado personal',
    icon: 'body-outline',
  },
  [ExpenseCategory.Miscellaneous]: {
    label: 'Varios',
    icon: 'grid-outline',
  },
  [ExpenseCategory.Other]: {
    label: 'Otros',
    icon: 'ellipsis-horizontal-circle-outline',
  },
};