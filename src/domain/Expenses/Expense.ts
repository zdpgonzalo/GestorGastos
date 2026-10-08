import { Result } from "@/shared/common/Result";
import { Entity } from "@/shared/domain/Entity";
import { ExpenseCategory } from "./ExpenseCategory";

/** Represents an expense in the shared expenses system. */
export class Expense implements Entity{
    private _description: string;
    private _amount: number;
    private _category: ExpenseCategory;
    private _date: Date;
    private readonly _createdAt: Date;
    
    private constructor(
        public readonly id: string,
        description: string,
        amount: number,
        category: ExpenseCategory,
        date: Date,
        createdAt: Date
    ){
        this._description = description;
        this._amount = amount;
        this._category = category;
        this._date = new Date(date.getTime());
        this._createdAt = new Date(createdAt.getTime());
    }

    /** Creates a new instance of Expense with the provided details. 
     * @param description The description of the expense.
     * @param amount The amount of the expense.
     * @param category The category of the expense.
     * @param date The date of the expense.
     * @returns Result<Expense> containing the newly created Expense instance or an error message if the input is invalid.
    */
    static create(
        description: string, 
        amount: number, 
        category: ExpenseCategory, 
        date: Date
    ): Result<Expense>
    {
        const descriptionResult = this.validateDescription(description);

        if(!descriptionResult.isSuccess){
            return descriptionResult;
        }

        const amountResult = this.validateAmount(amount);

        if(!amountResult.isSuccess){
            return amountResult;
        }

        const newExpense = new Expense(
            crypto.randomUUID(),
            descriptionResult.value,
            amountResult.value,
            category,
            date,
            new Date()
        );

        return Result.success(newExpense);
    }

    //#region Getters

    public get description(): string {
        return this._description;
    }

    public get amount(): number {
        return this._amount;
    }

    public get category(): ExpenseCategory {
        return this._category;
    }

    public get date(): Date {
        return new Date(this._date.getTime());
    }

    public get createdAt(): Date {
        return new Date(this._createdAt.getTime());
    }

    //#endregion

    //#region Setters

    /** Updates the description of the expense.
     * @param newDescription New description to be set for the expense.
     * @returns A Result object indicating success or failure.
     */
    public updateDescription(newDescription: string): Result<string> {
        const descriptionResult = Expense.validateDescription(newDescription);

        if(descriptionResult.isSuccess){
            this._description = descriptionResult.value;
        }
        
        return descriptionResult;
    }

    /** Updates the amount of the expense.
     * @param newAmount New amount to be set for the expense.
     * @returns A Result object indicating success or failure.
     */
    public updateAmount(newAmount: number): Result<number>{
        const amountResult = Expense.validateAmount(newAmount);

        if(amountResult.isSuccess){
            this._amount = amountResult.value;
        }

        return amountResult;
    }

    /** Updates the category of the expense.
     * @param newCategory New category to be set for the expense.
     * @returns A Result object indicating success or failure.
     */
    public updateCategory(newCategory: ExpenseCategory): Result<void>{
        this._category = newCategory;
        return Result.success(undefined);
    }

    /** Updates the date of the expense.
     * @param newDate New date to be set for the expense.
     * @returns A Result object indicating success or failure.
     */
    public updateDate(newDate: Date): Result<void>{
        this._date = new Date(newDate.getTime());
        return Result.success(undefined);
    }

    //#endregion

    //#region Validation

    /** Checks if the provided description is valid (non-empty).
     * @param description Description to be validated.
     * @returns A Result object indicating success with the normalized description or failure with an error message.
     */
    private static validateDescription(description: string): Result<string> {
        const normalizedDescription = description.trim();

        if(normalizedDescription.length === 0){
            return Result.failure("Description cannot be empty.");
        }

        return Result.success(normalizedDescription);
    }

    /** Checks if the provided amount is valid (greater than zero).
     * @param amount Amount to be validated.
     * @returns A Result object indicating success with the validated amount or failure with an error message.
     */
    private static validateAmount(amount: number): Result<number> {
        if(amount <= 0){
            return Result.failure("Amount must be greater than zero.");
        }

        return Result.success(amount);
    }

    //#endregion
}