import { SQLiteDatabase } from "expo-sqlite";
import { applyInitialSchema } from "./versions/v1_initial_schema";

interface Migration{
    version: number;
    up: (db: SQLiteDatabase) => Promise<void>;
}

const migrations: Migration[] = [
    {version: 1, up: applyInitialSchema}
]

/** Applies all pending migrations to the database.
 * @param db Connection to the SQLite database.
 */
export async function migrateDatabase(
    db: SQLiteDatabase
): Promise<void>{

    const result = await db.getFirstAsync<{ user_version: number }>(
        "PRAGMA user_version"
    );

    const currentVersion = result?.user_version ?? 0;
    const latestVersion = migrations[migrations.length - 1].version;

    if(currentVersion > latestVersion){
        throw new Error(`Database version ${currentVersion} is newer than the latest migration version ${latestVersion}.`);
    }

    for(const migration of migrations){
        if(migration.version <= currentVersion){
            continue;
        }

        await db.withExclusiveTransactionAsync(async (transaction : SQLiteDatabase) => {
            await migration.up(transaction);
            await transaction.execAsync(
                `PRAGMA user_version = ${migration.version}`
            );
        });
    }
}