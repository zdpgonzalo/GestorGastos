import { IRepository } from "@/shared/domain/IRepository";
import { SharedExpense } from "./SharedExpense";

export interface ISharedExpenseRepository extends IRepository<SharedExpense> {}