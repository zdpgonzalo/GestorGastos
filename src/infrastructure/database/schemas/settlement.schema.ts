import { SQLiteDatabase } from "expo-sqlite";

/** Creates the settlements table in the database if it does not already exist.
 * @param db Connection to the SQLite database.
 */
export async function createSettlementsTable(
    db: SQLiteDatabase
): Promise<void>{
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS settlements(
            id TEXT PRIMARY KEY NOT NULL,
            fromPersonId TEXT NOT NULL,
            toPersonId TEXT NOT NULL,
            amount_minor_units INTEGER NOT NULL
                CHECK (amount_minor_units >= 0),
            date TEXT NOT NULL,
            method INTEGER,
            createdAt TEXT NOT NULL,

            CHECK (from_person_id <> to_person_id),

            FOREIGN KEY (from_person_id)
                REFERENCES persons(id)
                ON DELETE RESTRICT,

            FOREIGN KEY (to_person_id)
                REFERENCES persons(id)
                ON DELETE RESTRICT
        );
    `);
}