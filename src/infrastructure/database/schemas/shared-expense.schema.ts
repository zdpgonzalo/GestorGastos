import { SQLiteDatabase } from "expo-sqlite";

export async function createSharedExpensesTable(
    db: SQLiteDatabase
): Promise<void>{
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS shared_expenses(
            id TEXT PRIMARY KEY NOT NULL,
            paid_by_person_id TEXT NOT NULL,
            description TEXT NOT NULL
                CHECK (length(trim(description)) > 0),
            amount_minor_units INTEGER NOT NULL
                CHECK (amount_minor_units >= 0),
            category INTEGER NOT NULL,
            date TEXT NOT NULL,
            created_at TEXT NOT NULL,

            FOREIGN KEY (paid_by_person_id)
                REFERENCES persons(id)
                ON DELETE RESTRICT
        );

        CREATE TABLE IF NOT EXISTS shared_expense_participants (
            shared_expense_id TEXT NOT NULL,
            person_id TEXT NOT NULL,

            PRIMARY KEY (shared_expense_id, person_id),

            FOREIGN KEY (shared_expense_id)
                REFERENCES shared_expenses(id)
                ON DELETE CASCADE,

            FOREIGN KEY (person_id)
                REFERENCES persons(id)
                ON DELETE RESTRICT
        );

        CREATE INDEX IF NOT EXISTS
            idx_shared_expenses_paid_by_person
        ON shared_expenses(paid_by_person_id);

        CREATE INDEX IF NOT EXISTS
            idx_shared_expense_participants_person
        ON shared_expense_participants(person_id);
    `);
};