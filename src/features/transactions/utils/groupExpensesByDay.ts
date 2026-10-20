import { Expense } from "@/domain/expenses/Expense";

/**
 * Groups a list of expenses by their respective dates, returning an array of ExpenseDayGroup objects. 
 * @param key - A unique string identifier for the group, formatted as 'YYYY-MM-DD'.
 * @param date - The date associated with the group of expenses.
 * @param expenses - An array of Expense objects that fall on the specified date.
 */
export interface ExpenseDayGroup{
    key: string;
    date: Date;
    expenses: Expense[];
}

/**
 * Groups a list of expenses by their respective dates, returning an array of ExpenseDayGroup objects.
 * @param expenses - An array of Expense objects to be grouped by date.
 */
export function groupExpensesByDay(
    expenses: Expense[]
): ExpenseDayGroup[] {
    const groups = new Map<string, ExpenseDayGroup>();

    for (const expense of expenses){
        const date = expense.date;

        if(Number.isNaN(date.getTime())){
            continue;
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const key = `${year}-${month}-${day}`;

        let group = groups.get(key);

        if(!group){
            group = {
                key,
                date,
                expenses: [],
            };

            groups.set(key, group);
        }

        group.expenses.push(expense);
    }

    return Array.from(groups.values());
}