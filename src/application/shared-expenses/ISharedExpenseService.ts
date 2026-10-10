import { ExpenseCategory } from "@/domain/expenses/ExpenseCategory";
import { SharedExpense } from "@/domain/shared-expenses/SharedExpense";
import { Result } from "@/shared/common/Result";
import { IService } from "@/shared/domain/IService";

export interface ISharedExpenseService extends IService<SharedExpense> {
    
    /** Creates a new shared expense to be stored in the repository.
     * @param paidByPersonId The ID of the person who paid for the shared expense.
     * @param participantPersonIds An array of IDs of the persons who participated in the expense.
     * @param description The description of the expense.
     * @param amount The amount of the expense.
     * @param date The date of the expense.
     * @param category The category of the expense.
     * @returns Promise<Result<SharedExpense>> containing the newly created SharedExpense instance.
     */
    create(
        paidByPersonId: string,
        participantsPersonIds: string[],
        description: string,
        amount: number,
        date: Date,
        category: ExpenseCategory
    ): Promise<Result<SharedExpense>>;
}