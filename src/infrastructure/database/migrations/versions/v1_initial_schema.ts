import { SQLiteDatabase } from "expo-sqlite";
import { createExpensesTable } from "../../schemas/expense.schema";
import { createPersonsTable } from "../../schemas/person.schema";
import { createSettlementsTable } from "../../schemas/settlement.schema";
import { createSharedExpensesTable } from "../../schemas/shared-expense.schema";

/** Applies the initial database schema to the given SQLite database connection.
 * @param db Connection to the SQLite database.
 */
export async function applyInitialSchema(
    db: SQLiteDatabase
): Promise<void>{
    try{
        await createPersonsTable(db);
        await createExpensesTable(db);
        await createSettlementsTable(db);
        await createSharedExpensesTable(db);
    }
    catch(error){
        console.error("[DB] Error during initialization:", error);
        throw error;
    }
}