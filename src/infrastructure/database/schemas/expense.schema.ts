import { SQLiteDatabase } from "expo-sqlite";

/** Creates the expenses table in the database if it does not already exist.
 * @param db Connection to the SQLite database.
 */
export async function createExpensesTable(
    db: SQLiteDatabase
): Promise<void>{
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS expenses(
            id TEXT PRIMARY KEY NOT NULL,
            description TEXT NOT NULL
                CHECK (length(trim(description)) > 0),
            amount_minor_units INTEGER NOT NULL
                CHECK (amount_minor_units >= 0),
            category INTEGER NOT NULL,
            date TEXT NOT NULL,
            created_at TEXT NOT NULL
        );
    `);
}