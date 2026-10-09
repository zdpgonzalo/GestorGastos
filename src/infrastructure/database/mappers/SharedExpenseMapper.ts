import { ExpenseCategory } from "@/domain/expenses/ExpenseCategory";
import { SharedExpense } from "@/domain/shared-expenses/SharedExpense";

export type SharedExpenseRow = {
    id: string;
    paid_by_person_id: string;
    description: string;
    amount: number;
    date: string;
    category: number;
    created_at: string
}

export class SharedExpenseMapper{

    /** Reconstitutes a SharedExpense from its constituent parts.
     * @param row The database row representing the shared expense.
     * @param participantPersonIds An array of IDs of the persons who participated in the expense.
     * @returns A new SharedExpense instance.
     */
    public static toDomain(
        row: SharedExpenseRow, 
        participantPersonIds: string[]): SharedExpense{
        return SharedExpense.reconstitute(
            row.id,
            row.paid_by_person_id,
            participantPersonIds,
            row.description,
            row.amount,
            row.category as ExpenseCategory,
            new Date(row.date),
            new Date(row.created_at)
        );
    }

    /** Converts a SharedExpense instance to its persistence representation.
     * @param sharedExpense The SharedExpense instance to convert.
     * @returns A SharedExpenseRow object representing the shared expense in the database.
     */
    public static toPersistence(sharedExpense: SharedExpense): SharedExpenseRow{
        return {
            id: sharedExpense.id,
            paid_by_person_id: sharedExpense.paidByPersonId,
            description: sharedExpense.description,
            amount: sharedExpense.amount,
            date: sharedExpense.date.toISOString(),
            category: sharedExpense.category as number,
            created_at: sharedExpense.createdAt.toISOString()
        };
    }

}