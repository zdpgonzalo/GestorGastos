import { Result } from "@/shared/common/Result";
import { Entity } from "@/shared/domain/Entity";
import { SettlementMethod } from "./SettlementMethod";

/** Represents a settlement in the system. */
export class Settlement implements Entity{
    private _fromPersonId: string;
    private _toPersonId: string;
    private _amount: number;
    private _date: Date;
    private _method: SettlementMethod | null;
    private readonly _createdAt: Date;

    private constructor(
        public readonly id: string,
        fromPersonId: string, 
        toPersonId: string, 
        amount: number, 
        date: Date, 
        method: SettlementMethod | null,
        createdAt: Date = new Date()
    ){
        this._fromPersonId = fromPersonId;
        this._toPersonId = toPersonId;
        this._amount = amount;
        this._date = new Date(date.getTime());
        this._method = method;
        this._createdAt = new Date(createdAt.getTime());
    }

    /** Creates a new Settlement instance.
     * @param from The 'from' field of the settlement.
     * @param to The 'to' field of the settlement.
     * @param amount The 'amount' field of the settlement.
     * @param date The 'date' field of the settlement.
     * @param method The 'method' field of the settlement.
     * @returns A Result object containing the new Settlement instance or an error message.
     */
    static create(
        fromPersonId: string, 
        toPersonId: string, 
        amount: number, 
        date: Date, 
        method: SettlementMethod | null
    ): Result<Settlement>{

        const fromResult = this.validateFrom(fromPersonId);
        if(!fromResult.isSuccess){
            return fromResult;
        }

        const toResult = this.validateTo(toPersonId);
        if(!toResult.isSuccess){
            return toResult;
        }

        const fromToValidationResult = Settlement.validatePersons(fromPersonId, toPersonId);
        if(!fromToValidationResult.isSuccess){
            return fromToValidationResult;
        }

        const amountResult = this.validateAmount(amount);
        if(!amountResult.isSuccess){
            return amountResult;
        }

        const newSettlement = new Settlement(
            crypto.randomUUID(),
            fromResult.value,
            toResult.value,
            amountResult.value,
            date,
            method
        );

        return Result.success(newSettlement);
    }

    //#region Getters

    public get fromPersonId(): string{
        return this._fromPersonId;
    }

    public get toPersonId(): string{
        return this._toPersonId;
    }

    public get amount(): number{
        return this._amount;
    }

    public get date(): Date{
        return new Date(this._date.getTime());
    }

    public get method(): SettlementMethod | null{
        return this._method;
    }
        
    public get createdAt(): Date{
        return new Date(this._createdAt.getTime());
    }

    //#endregion

    //#region Setters

    /** Updates the 'from' field of the settlement.
     * @param newFromPersonId The new value for the 'from' field.
     * @returns A Result object indicating success or failure.
     */
    public updateFromPersonId(newFromPersonId: string): Result<string>{
        const fromToValidationResult = Settlement.validatePersons(newFromPersonId, this._toPersonId);
        
        if(!fromToValidationResult.isSuccess){
            return fromToValidationResult;
        }

        const fromResult = Settlement.validateFrom(newFromPersonId);

        if(fromResult.isSuccess){
            this._fromPersonId = fromResult.value;
        }

        return fromResult;
    }

    /** Updates the 'to' field of the settlement.
     * @param newToPersonId The new value for the 'to' field.
     * @returns A Result object indicating success or failure.
     */
    public updateToPersonId(newToPersonId: string): Result<string>{

        const fromToValidationResult = Settlement.validatePersons(this._fromPersonId, newToPersonId);

        if(!fromToValidationResult.isSuccess){
            return fromToValidationResult;
        }

        const toResult = Settlement.validateTo(newToPersonId);

        if(toResult.isSuccess){
            this._toPersonId = toResult.value;
        }

        return toResult;
    }

    /** Updates the 'amount' field of the settlement.
     * @param newAmount The new value for the 'amount' field.
     * @returns A Result object indicating success or failure.
     */
    public updateAmount(newAmount: number): Result<number>{
        const amountResult = Settlement.validateAmount(newAmount);

        if(amountResult.isSuccess){
            this._amount = amountResult.value;
        }

        return amountResult;
    }

    //#endregion

    //#region Validation

    /** Checks if the amount is greater than zero.
     * @param amount The amount to be validated.
     * @returns A Result object indicating success or failure.
     */
    public static validateAmount(amount: number): Result<number>{
        if(amount <= 0){
            return Result.failure("Amount must be greater than zero.");
        }
        return Result.success(amount);
    }

    /** Checks if the 'from' field is not empty.
     * @param fromPersonId The 'from' field to be validated.
     * @returns A Result object indicating success or failure.
     */
    public static validateFrom(fromPersonId: string): Result<string>{
        if(!fromPersonId || fromPersonId.trim().length === 0){
            return Result.failure("From cannot be empty.");
        }

        return Result.success(fromPersonId.trim());
    }

    /** Checks if the 'to' field is not empty.
     * @param toPersonId The 'to' field to be validated.
     * @returns A Result object indicating success or failure.
     */
    public static validateTo(toPersonId: string): Result<string>{
        if(!toPersonId || toPersonId.trim().length === 0){
            return Result.failure("To cannot be empty.");
        }

        return Result.success(toPersonId.trim());
    }

    /** Checks if the 'from' and 'to' fields are not the same.
     * @param fromPersonId The 'from' field to be validated.
     * @param toPersonId The 'to' field to be validated.
     * @returns A Result object indicating success or failure.
     */
    public static validatePersons(fromPersonId: string, toPersonId: string): Result<void>{
        if(fromPersonId === toPersonId){
            return Result.failure("From and To cannot be the same person.");
        }
        return Result.success(undefined);
    }

    //#endregion
}