import { Result } from "@/shared/common/Result";
import { Entity } from "@/shared/domain/Entity";

/** Represents a group in the shared expenses system. */
export class Group implements Entity{
    private _name : string;
    private readonly _createdAt: Date;

    private constructor(
        public readonly id: string,
        name: string,
        createdAt: Date
    ){
        this._name = name;
        this._createdAt = new Date(createdAt.getTime());
    }

    /** Creates a new Group instance.
     * @param name The name of the group.
     * @returns A Result object indicating success or failure.
     */
    static create(name: string): Result<Group>{
        const nameResult = this.validateName(name);

        if(!nameResult.isSuccess){
            return nameResult;
        }

        const group = new Group(
            crypto.randomUUID(),
            nameResult.value,
            new Date()
        );

        return Result.success(group);
    }

    //#region Getters

    public get name(): string{
        return this._name;
    }

    public get createdAt(): Date{
        return new Date(this._createdAt.getTime());
    }

    //#endregion

    //#region Setters

    /** Updates the name of the group.
     * @param newName The new name for the group.
     * @returns A Result object indicating success or failure.
     */
    public updateName(newName: string) : Result<string>{
        const nameResult = Group.validateName(newName);

        if(nameResult.isSuccess){
            this._name = nameResult.value;
        }

        return nameResult;
    }

    //#endregion

    //#region Validation

    /** Checks if the and return a Result with the normalized name or an error message.
     * @param newName The name to be validated.
     * @returns A Result object indicating success or failure.
     */
    private static validateName(newName: string) : Result<string>{
        const normalizedName = newName.trim();

        if(normalizedName.length === 0){
            return Result.failure("Name cannot be empty.");
        }

        return Result.success(normalizedName);
    }

    //#endregion
}