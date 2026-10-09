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
        await this.db.runAsync(
            `INSERT INTO persons (id, name, created_at) 
            VALUES (?, ?, ?)`,
            person.id,
            person.name,
            person.createdAt.toISOString()
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