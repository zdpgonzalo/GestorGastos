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
     * @param paidByPersonId The ID of the person who paid for the expense.
     * @param participantPersonIds An array of IDs of the persons who participated in the expense.
     * @param description The description of the expense.
     * @param amount The amount of the expense.
     * @param date The date of the expense.
     * @param category The category of the expense.
     * @returns A Result object containing the new shared expense or an error message if the creation fails.
     */
    static create(
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

        const normalizedParticipantIdsResult = this.validateParticipantPersonIds(participantPersonIds);
        if (!normalizedParticipantIdsResult.isSuccess) {
            return normalizedParticipantIdsResult;
        }

        const payerValidationResult = this.validatePayerPersonId(paidByPersonId, normalizedParticipantIdsResult.value);
        if (!payerValidationResult.isSuccess) {
            return payerValidationResult;
        }

        return Result.success(new SharedExpense(
            crypto.randomUUID(),
            payerValidationResult.value,
            normalizedParticipantIdsResult.value,
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

    /** Checks if the payer person ID is valid.
     * @param payerPersonId The ID of the person who paid for the expense.
     * @param participantPersonIds An array of IDs of the persons who participated in the expense.
     * @returns Result<string> containing the validated ID or an error message if the ID is invalid.
     */
    private static validatePayerPersonId(payerPersonId: string, participantPersonIds: string[]): Result<string>{
        const normalizedPayerId = payerPersonId.trim();
        if(normalizedPayerId.length === 0){
            return Result.failure("Payer ID cannot be empty.");
        }

        if(!participantPersonIds.includes(normalizedPayerId)){
            return Result.failure("Payer must be one of the participants.");
        }

        return Result.success(normalizedPayerId);
    }

    /** Validates the participant person IDs.
     * @param participantPersonIds An array of IDs of the persons who participated in the expense.
     * @returns A Result object containing the validated IDs or an error message if any ID is invalid.
     */
    private static validateParticipantPersonIds(participantPersonIds: string[]): Result<string[]>{
        if(participantPersonIds.length === 0){
            return Result.failure("There must be at least one participant.");
        }

        const normalizedIds = participantPersonIds.map(id => id.trim());

        if (normalizedIds.some(id => id.length === 0)) {
            return Result.failure("All participant IDs must be valid.");
        }

        if(new Set(normalizedIds).size !== normalizedIds.length){
            return Result.failure("Participant person IDs cannot contain duplicates.");
        }

        return Result.success(normalizedIds);
    }


    //#endregion

    //#region Participant Management

    /** Adds a participant to the shared expense.
     * @param personId ID of the person to be added as a participant.
     * @returns A Result object indicating success or failure of the addition operation.
     */
    public addParticipant(personId: string): Result<void>{
        const normalizedId = personId.trim();

        if(normalizedId.length === 0){
            return Result.failure("Participant ID cannot be empty.");
        }

        if(this._participantPersonIds.includes(normalizedId)){
            return Result.failure("Participant is already added.");
        }

        this._participantPersonIds.push(normalizedId);
        return Result.success(undefined);
    }

    /** Removes a participant from the shared expense.
     * @param personId ID of the person to be removed as a participant.
     * @returns A Result object indicating success or failure of the removal operation.
     */
    public removeParticipant(personId: string): Result<void>{
        const normalizedId = personId.trim();

        if(normalizedId.length === 0){
            return Result.failure("Participant ID cannot be empty.");
        }

        const index = this.participantPersonIds.indexOf(normalizedId);
        if(index === -1){
            return Result.failure("Participant not found.");
        }

        this._participantPersonIds.splice(index, 1);
        return Result.success(undefined);
    }

    //#endregion
}