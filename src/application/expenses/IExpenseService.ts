import { Expense } from "@/domain/expenses/Expense";
import { ExpenseCategory } from "@/domain/expenses/ExpenseCategory";
import { Result } from "@/shared/common/Result";
import { IService } from "@/shared/domain/IService";

export interface IExpenseService extends IService<Expense> {

    /** Creates a new expense to be stored in the repository.
     * @param description Description of the expense to be created.
     * @param amount Amount of the expense to be created.
     * @param date Date of the expense to be created.
     * @returns Promise<Result<Expense>> containing the newly created Expense instance.
    */
    create(
        description: string, 
        amount: number, 
        category: ExpenseCategory,
        date: Date
    ): Promise<Result<Expense>>;
}