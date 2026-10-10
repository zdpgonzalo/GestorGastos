import { Expense } from "@/domain/expenses/Expense";
import { ExpenseCategory } from "@/domain/expenses/ExpenseCategory";
import { IExpenseRepository } from "@/domain/expenses/IExpenseRepository";
import { Result } from "@/shared/common/Result";
import { IExpenseService } from "./IExpenseService";

export class ExpenseService implements IExpenseService{

    public constructor(
        private readonly expenseRepository: IExpenseRepository
    ){}

    /**
     * @inheritdoc
     */
    public async create(
        description: string, 
        amount: number, 
        category: ExpenseCategory, 
        date: Date
    ): Promise<Result<Expense>> {
        const expenseResult = Expense.create(description, amount, category, date);

        if(!expenseResult.isSuccess){
            return expenseResult;
        }

        await this.expenseRepository.add(expenseResult.value);

        return Result.success(expenseResult.value);
    }

    /**
     * @inheritdoc
     */
    getById(id: string): Promise<Expense | null> {
        return this.expenseRepository.getById(id);
    }

    /**
     * @inheritdoc
     */
    public async delete(id: string): Promise<void> {
        const expense = await this.expenseRepository.getById(id);

        if(expense === null){
            return;
        }

        await this.expenseRepository.delete(expense);
    }

}