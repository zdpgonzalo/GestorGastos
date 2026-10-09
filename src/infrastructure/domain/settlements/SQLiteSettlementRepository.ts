import { ISettlementRepository } from "@/domain/settlements/ISettlementRepository";
import { Settlement } from "@/domain/settlements/Settlement";
import { SettlementMapper, SettlementRow } from "@/infrastructure/database/mappers/SettlementMapper";
import { SQLiteDatabase } from "expo-sqlite";

export class SQLiteSettlementRepository implements ISettlementRepository{
    
    public constructor(
        private readonly db: SQLiteDatabase
    ){}

    /**
     * @inheritdoc
     */
    public async getById(id: string): Promise<Settlement | null> {
        const row = await this.db.getFirstAsync<SettlementRow>(
            `SELECT
            id, fromPersonId, toPersonId, amount, date, method, created_at
            FROM settlements
            WHERE id = ?`,
            id
        );

        if(row === null){
            return null;
        }

        return SettlementMapper.toDomain(row);
    }

    /**
     * @inheritdoc
     */
    public async add(settlement: Settlement): Promise<void> {
        await this.db.runAsync(
            `INSERT INTO settlements(id, fromPersonId, toPersonId, amount, date, method, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            settlement.id,
            settlement.fromPersonId,
            settlement.toPersonId,
            settlement.amount,
            settlement.date.toISOString(),
            settlement.method as number | null,
            settlement.createdAt.toISOString()
        )
    }

    /**
     * @inheritdoc
     */
    public async delete(settlement: Settlement): Promise<void> {
        await this.db.runAsync(
            `DELETE FROM settlements WHERE id = ?`,
            settlement.id
        );
    }
}