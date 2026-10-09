import { Settlement } from "@/domain/settlements/Settlement";
import { SettlementMethod } from "@/domain/settlements/SettlementMethod";

export type SettlementRow = {
    id: string;
    fromPersonId: string;
    toPersonId: string;
    amount: number;
    date: string;
    method: number | null;
    created_at: string
}

export class SettlementMapper{

    /** Reconstitutes a Settlement from its constituent parts.
     * @param row The database row representing the settlement.
     * @returns A new Settlement instance.
     */
    public static toDomain(row: SettlementRow): Settlement{
        return Settlement.reconstitute(
            row.id,
            row.fromPersonId,
            row.toPersonId,
            row.amount,
            new Date(row.date),
            row.method as SettlementMethod | null,
            new Date(row.created_at)
        );
    } 

    /** Converts a Settlement instance to its persistence representation.
     * @param settlement The Settlement instance to convert.
     * @returns A SettlementRow object representing the settlement in the database.
     */
    public static toPersistence(settlement: Settlement) : SettlementRow{
        return {
            id: settlement.id,
            fromPersonId: settlement.fromPersonId,
            toPersonId: settlement.toPersonId,
            amount: settlement.amount,
            date: settlement.date.toISOString(),
            method: settlement.method as number | null,
            created_at: settlement.createdAt.toISOString()
        }
    }

}