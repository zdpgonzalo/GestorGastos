import { Settlement } from "@/domain/settlements/Settlement";
import { SettlementMethod } from "@/domain/settlements/SettlementMethod";
import { Result } from "@/shared/common/Result";
import { IService } from "@/shared/domain/IService";

export interface ISettlementService extends IService<Settlement>{

    /** Creates a new settlement to be stored in the repository.
     * @param fromPersonId ID of the person who is making the settlement.
     * @param toPersonId ID of the person who is receiving the settlement.
     * @param amount Amount of the settlement to be created.
     * @param date Date of the settlement to be created.
     * @param method Method of the settlement to be created. Can be null if no method is specified.
     * @returns Promise<Result<Settlement>> containing the newly created Settlement instance.
     */
    create(
        fromPersonId: string,
        toPersonId: string,
        amount: number,
        date: Date,
        method: SettlementMethod | null
    ): Promise<Result<Settlement>>;
}