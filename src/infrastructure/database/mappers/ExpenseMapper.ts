import { Expense } from "@/domain/expenses/Expense";
import { ExpenseCategory } from "@/domain/expenses/ExpenseCategory";

export type ExpenseRow = {
    id : string,
    description : string,
    amount_minor_units : number,
    category : number,
    date : string,
    created_at : string
}

export class ExpenseMapper{

    /** Reconstitutes an Expense from a data row.
     * @param row The data row containing the expense's information.
     * @returns An instance of Expense.
     */
    public static toDomain(row: ExpenseRow): Expense{
        return Expense.reconstitute(
            row.id,
            row.description,
            row.amount_minor_units / 100, // Convert from minor units to major units
            row.category as ExpenseCategory,
            new Date(row.date),
            new Date(row.created_at)
        );
    }

    /** Converts an Expense to a data row.
     * @param expense The Expense to be converted.
     * @returns A data row representing the Expense.
     */
    public static toPersistence(expense: Expense): ExpenseRow{
        return{
            id: expense.id,
            description: expense.description,
            amount_minor_units: Math.round(expense.amount * 100), // Convert from major units to minor units    
            category: expense.category,
            date: expense.date.toISOString(),
            created_at: expense.createdAt.toISOString()
        }
    }
}