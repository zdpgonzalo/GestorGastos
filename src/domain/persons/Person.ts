import { Result } from "@/shared/common/Result";
import { Entity } from "@/shared/domain/Entity";

/** Represents a person who participates in the shared expenses. */
export class Person implements Entity {
    private _name: string;
    private readonly _createdAt: Date;

    private constructor(
        public readonly id: string,
        name: string,
        createdAt: Date,
    ){
        this._name = name;
        this._createdAt = new Date(createdAt.getTime());
    }

    /** Creates a new instance of Person with the provided name.
     * @param name The name of the person to be created. 
     * @returns Result<Person> containing the newly created Person instance or an error message if the name is invalid.
     */
    static create(name: string): Result<Person>{
        const nameResult = this.validateName(name);

        if(!nameResult.isSuccess){
            return nameResult;
        }

        const newPerson = new Person(
            crypto.randomUUID(),
            nameResult.value,
            new Date()
        );

        return Result.success(newPerson);
    }

    /** Reconstitutes a Person instance from the provided data.
     * @param id The ID of the person.
     * @param name The name of the person.
     * @param createdAt The date the person was created.
     * @returns A new Person instance.
     */
    public static reconstitute(
        id: string,
        name: string,
        createdAt: Date
    ): Person{
        return new Person(
            id,
            name,
            createdAt
        );
    }

    //#region Getters

    public get name(): string {
        return this._name;
    }

    public get createdAt(): Date {
        return new Date(this._createdAt.getTime());
    }

    //#endregion

    //#region Setters

    /** Updates the name of the person.
     * @param newName New name to be set for the person.
     * @returns A Result object indicating success or failure.
     */
    public updateName(newName: string) : Result<string> {
        const nameResult = Person.validateName(newName);

        if(nameResult.isSuccess){
            this._name = nameResult.value;
        }

        return nameResult;
    }

    //#endregion

    //#region Validation

    /** Checks if the provided name is valid (non-empty).
     * @param name Name to be validated.
     * @returns A Result object indicating success with the normalized name or failure with an error message.
     */
    private static validateName(name: string): Result<string>{
        const normalizedName = name.trim();

        if(normalizedName.length === 0){
            return Result.failure("Name cannot be empty.");
        }

        return Result.success(normalizedName);
    }

    //#endregion
}