import { IRepository } from "@/shared/domain/IRepository";
import { Expense } from "./Expense";

export interface IExpenseRepository extends IRepository<Expense> {
    /**
     * Retrieves all expenses from the repository, optionally filtered by a search string.
     * @param search - An optional string to filter the expenses. If provided, only expenses 
     * matching the search criteria will be returned.
     */
    findAll(search?: string): Promise<Expense[]>;
}