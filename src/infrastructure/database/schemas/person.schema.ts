import { SQLiteDatabase } from "expo-sqlite";

/** Creates the persons table in the database if it does not already exist.
 * @param db Connection to the SQLite database.
 */
export async function createPersonsTable(
    db: SQLiteDatabase
): Promise<void>{
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS persons (
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL
                CHECK (length(trim(name)) > 0),
            createdAt TEXT NOT NULL
        );
    `);
}