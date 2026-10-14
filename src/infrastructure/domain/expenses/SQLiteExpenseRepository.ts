import { Expense } from "@/domain/expenses/Expense";
import { IExpenseRepository } from "@/domain/expenses/IExpenseRepository";
import { ExpenseMapper, ExpenseRow } from "@/infrastructure/database/mappers/ExpenseMapper";
import { SQLiteDatabase } from "expo-sqlite";

export class SQLiteExpenseRepository implements IExpenseRepository{

    public constructor(
        private readonly db: SQLiteDatabase
    ){}

    /**
     * @inheritdoc
     */
    public async getById(id: string): Promise<Expense | null> {
        const row = await this.db.getFirstAsync<ExpenseRow>(
            `SELECT id, description, amount, category, date, created_at
            FROM expenses
            WHERE id = ?`,
            id
        );

        if(row === null){
            return null;
        }

        return ExpenseMapper.toDomain(row);
    }

    /**
     * @inheritdoc
     */
    public async add(expense: Expense): Promise<void> {
        const row = ExpenseMapper.toPersistence(expense);

        await this.db.runAsync(
            `INSERT INTO 
            expense(id, description, amount, category, date, created_at) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            row.id,
            row.description,
            row.amount_minor_units,
            row.category,
            row.date,
            row.created_at
        )
    }

    /**
     * @inheritdoc
     */
    public async delete(expense: Expense): Promise<void> {
        await this.db.runAsync(
            `DELETE FROM expense WHERE id = ?`,
            expense.id
        );
    }
}