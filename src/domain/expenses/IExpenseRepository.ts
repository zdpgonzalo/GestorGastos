import { IRepository } from "@/shared/domain/IRepository";
import { Expense } from "./Expense";

export interface IExpenseRepository extends IRepository<Expense> {}