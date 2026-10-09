import { Person } from "@/domain/persons/Person";

export type PersonRow = {
    id: string;
    name: string;
    createdAt: string;
}

export class PersonMapper{
    
    /** Reconstitutes a Person instance from the provided data.
     * @param row The data row containing the person's information.
     * @returns A new Person instance.
     */
    public static toDomain(row: PersonRow): Person{
        return Person.reconstitute(
            row.id, 
            row.name, 
            new Date(row.createdAt));
    }

    /** Converts a Person instance to its persistence representation.
     * @param person The Person instance to be converted.
     * @returns A PersonRow object representing the person in the database.
     */
    public static toPersistence(person: Person): PersonRow{
        return {
            id: person.id,
            name: person.name,
            createdAt: person.createdAt.toISOString()
        };
    }
}