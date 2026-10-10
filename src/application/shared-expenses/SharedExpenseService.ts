import { ExpenseCategory } from "@/domain/expenses/ExpenseCategory";
import { ISharedExpenseRepository } from "@/domain/shared-expenses/ISharedExpenseRepository";
import { SharedExpense } from "@/domain/shared-expenses/SharedExpense";
import { Result } from "@/shared/common/Result";
import { ISharedExpenseService } from "./ISharedExpenseService";

export class SharedExpenseService implements ISharedExpenseService{
    
    public constructor(
        private readonly sharedExpenseRepository: ISharedExpenseRepository
    ){}
    
    /**
     * @inheritdoc
     */
    public async create(
        paidByPersonId: string, 
        participantsPersonIds: string[], 
        description: string, 
        amount: number, 
        date: Date,
        category: ExpenseCategory
    ): Promise<Result<SharedExpense>>{
        
        const sharedExpenseResult = SharedExpense.create(
            paidByPersonId, 
            participantsPersonIds, 
            description, 
            amount, 
            date, 
            category
        );

        if(!sharedExpenseResult.isSuccess){
            return sharedExpenseResult;
        }

        await this.sharedExpenseRepository.add(sharedExpenseResult.value);
        
        return Result.success(sharedExpenseResult.value);
    }

    /**
     * @inheritdoc
     */
    getById(id: string): Promise<SharedExpense | null> {
        return this.sharedExpenseRepository.getById(id);
    }

    /**
     * @inheritdoc
     */
    public async delete(id: string): Promise<void> {
        const sharedExpense = await this.sharedExpenseRepository.getById(id);

        if(sharedExpense === null){
            return;
        }

        await this.sharedExpenseRepository.delete(sharedExpense);
    }

}