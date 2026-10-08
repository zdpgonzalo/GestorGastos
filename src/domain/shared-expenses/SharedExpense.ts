import { Result } from "@/shared/common/Result";
import { Entity } from "@/shared/domain/Entity";
import { ExpenseCategory } from "../expenses/ExpenseCategory";

export class SharedExpense implements Entity{
    private _description: string;
    private _amount : number;
    private _date: Date;
    private _category: ExpenseCategory;
    private readonly _createdAt: Date;

    private _participantPersonIds: string[] = [];

    private constructor(
        public readonly id: string,
        public readonly groupId: string,
        public readonly paidByPersonId: string,
        participantPersonIds: string[],
        description: string,
        amount: number,
        date: Date,
        category: ExpenseCategory,
        createdAt: Date = new Date()
    ) {
        this._description = description;
        this._amount = amount;
        this._date = new Date(date.getTime());
        this._category = category;
        this._participantPersonIds = [...participantPersonIds];
        this._createdAt = new Date(createdAt.getTime());
    }

    /** Creates a new shared expense.
     * @param groupId The ID of the group to which the expense belongs.
     * @param paidByPersonId The ID of the person who paid for the expense.
     * @param participantPersonIds An array of IDs of the persons who participated in the expense.
     * @param description The description of the expense.
     * @param amount The amount of the expense.
     * @param date The date of the expense.
     * @param category The category of the expense.
     * @returns A Result object containing the new shared expense or an error message if the creation fails.
     */
    static create(
        groupId: string,
        paidByPersonId: string,
        participantPersonIds: string[],
        description: string,
        amount: number,
        date: Date,
        category: ExpenseCategory
    ): Result<SharedExpense> {
        const validatedDescription = this.validateDescription(description);
        if (!validatedDescription.isSuccess) {
            return validatedDescription;
        }

        const validatedAmount = this.validateAmount(amount);
        if (!validatedAmount.isSuccess) {
            return validatedAmount;
        }

        return Result.success(new SharedExpense(
            crypto.randomUUID(),
            groupId,
            paidByPersonId,
            participantPersonIds,
            validatedDescription.value,
            validatedAmount.value,
            date,
            category
        ));
    }

    //#region Getters

    public get description(): string{
        return this._description;
    }

    public get amount(): number{
        return this._amount;
    }

    public get date(): Date{
        return new Date(this._date.getTime());
    }

    public get category(): ExpenseCategory{
        return this._category;
    }

    public get createdAt(): Date{
        return new Date(this._createdAt.getTime());
    }

    public get participantPersonIds(): string[]{
        return [...this._participantPersonIds];
    }

    //#endregion

    //#region Setters

    /**
     * Updates the description of the shared expense.
     * @param newDescription The new description to be set.
     * @returns A Result object indicating success or failure of the update operation.
     */
    public updateDescription(newDescription: string): Result<string>{
        const validatedDescription = SharedExpense.validateDescription(newDescription);
        
        if(validatedDescription.isSuccess){
            this._description = validatedDescription.value;
        }

        return validatedDescription;
    }

    /** Updates the amount of the shared expense.
     * @param newAmount The new amount to be set.
     * @returns A Result object indicating success or failure of the update operation.
     */
    public updateAmount(newAmount: number): Result<number>{
        const validatedAmount = SharedExpense.validateAmount(newAmount);

        if(validatedAmount.isSuccess){
            this._amount = validatedAmount.value;
        }

        return validatedAmount;
    }

    //#endregion

    //#region Validation

    /** Check if the description is valid
     * @param description Description to be validated
     * @returns Result<string> containing the validated description or an error message if the description is invalid.
     */
    private static validateDescription(description: string): Result<string>{
        const normalizedDescription = description.trim();

        if(normalizedDescription.length === 0){
            return Result.failure("Description cannot be empty.");
        }

        return Result.success(normalizedDescription);
    }

    /** Checks if the amount is valid
     * @param amount Amount to be validated
     * @returns Result<number> containing the validated amount or an error message if the amount is invalid.
     */
    private static validateAmount(amount: number): Result<number>{
        if(amount <= 0){
            return Result.failure("Amount must be greater than zero.");
        }

        return Result.success(amount);
    }

    //#endregion
}