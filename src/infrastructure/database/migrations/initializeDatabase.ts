import { SQLiteDatabase } from "expo-sqlite";
import { migrateDatabase } from "./migrateDatabase";

/** Initializes the database by enabling foreign key constraints and applying any pending migrations.
 * @param db Connection to the SQLite database.
 */
export async function initializeDatabase(
    db: SQLiteDatabase
): Promise<void> {
    await db.execAsync(`PRAGMA foreign_keys = ON;`);
    await migrateDatabase(db);
}