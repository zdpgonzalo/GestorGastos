import { ISharedExpenseRepository } from "@/domain/shared-expenses/ISharedExpenseRepository";
import { SharedExpense } from "@/domain/shared-expenses/SharedExpense";
import { SharedExpenseMapper, SharedExpenseRow } from "@/infrastructure/database/mappers/SharedExpenseMapper";
import { SQLiteDatabase } from "expo-sqlite";

type ParticipantRow = {
    person_id: string;
};

export class SQLiteSharedExpenseRepository implements ISharedExpenseRepository {
    
    public constructor(
        private readonly db: SQLiteDatabase
    ){}

    /**
     * @inheritdoc
     */
    public async getById(id: string): Promise<SharedExpense | null> {
        const row = await this.db.getFirstAsync<SharedExpenseRow>(
            `SELECT id, paid_by_person_id, description, amount, category, date, created_at 
            FROM shared_expenses 
            WHERE id = ?`,
            id
        );

        if(row === null){
            return null;
        }

        const participants = await this.db.getAllAsync<ParticipantRow>(
            `SELECT person_id
            FROM shared_expense_participants
            WHERE shared_expense_id = ?`,
            row.id
        );

        const participantPersonIds = participants.map(
            (participant: ParticipantRow) => participant.person_id
        );

        return SharedExpenseMapper.toDomain(row, participantPersonIds);
    }

    /**
     * @inheritdoc
     */
    public async add(expense: SharedExpense): Promise<void> {
        const row = SharedExpenseMapper.toPersistence(expense);

        await this.db.withTransactionAsync(async () => {
            await this.db.runAsync(
                `INSERT INTO shared_expenses(id, paid_by_person_id, description, amount, category, date, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                row.id,
                row.paid_by_person_id,
                row.description,
                row.amount,
                row.category,
                row.date,
                row.created_at
            );

            for (const participantId of expense.participantPersonIds){
                await this.db.runAsync(
                    `INSERT INTO shared_expense_participants(shared_expense_id, person_id)
                    VALUES (?, ?)`,
                    expense.id,
                    participantId
                )
            }
        });
    }
    
    /**
     * @inheritdoc
     */
    public async delete(expense: SharedExpense): Promise<void> {
        await this.db.runAsync(
            `DELETE FROM shared_expense_participants
            WHERE shared_expense_id = ?`,
            expense.id
        );
    }

}