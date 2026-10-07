import { Result } from "@/shared/common/Result";
import { Entity } from "@/shared/domain/Entity";

/**
 * Represents a person who participates in the shared expenses.
 */
export class Person implements Entity {
    private readonly _createdAt: Date;

    private constructor(
        public readonly id: string,
        public readonly name: string,
        createdAt: Date,
    ){
        this._createdAt = new Date(createdAt.getTime());
    }

    /**
     * Creates a new instance of Person with the provided name.
     * @param name The name of the person to be created. 
     * @returns Result<Person> containing the newly created Person instance or an error message if the name is invalid.
     */
    static create(name: string): Result<Person>{
        const normalizedName = name.trim();

        if(normalizedName.length === 0){
            return Result.failure("Name cannot be empty.");
        }

        const newPerson = new Person(
            crypto.randomUUID(),
            normalizedName,
            new Date()
        );

        return Result.success(newPerson);
    }

    /**
     * Gets the date when the person was created.
     * @returns The creation date.
     */
    public get createdAt(): Date {
        return new Date(this._createdAt.getTime());
    }
}