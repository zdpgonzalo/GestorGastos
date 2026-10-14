import { IPersonRepository } from "@/domain/persons/IPersonRespository";
import { Person } from "@/domain/persons/Person";
import { PersonMapper, PersonRow } from "@/infrastructure/database/mappers/PersonMapper";
import { SQLiteDatabase } from "expo-sqlite";

export class SQLitePersonRepository implements IPersonRepository {

    public constructor(
        private readonly db: SQLiteDatabase
    ){}

    /**
     * @inheritdoc
     */
    public async getById(id: string): Promise<Person | null> {
        const row = await this.db.getFirstAsync<PersonRow>(
            `SELECT id, name, created_at
            FROM persons
            WHERE id = ?`,
            id
        );

        if(row === null){
            return null;
        }

        return PersonMapper.toDomain(row);
    }

    /**
     * @inheritdoc
     */
    public async add(person: Person): Promise<void> {
        const row = PersonMapper.toPersistence(person);

        await this.db.runAsync(
            `INSERT INTO persons (id, name, created_at) 
            VALUES (?, ?, ?)`,
            row.id,
            row.name,
            row.created_at
        );
    }

    /**
     * @inheritdoc
     */
    public async delete(person: Person): Promise<void> {
        await this.db.runAsync(
            `DELETE FROM persons 
            WHERE id = ?`,
            person.id
        );
    }
}