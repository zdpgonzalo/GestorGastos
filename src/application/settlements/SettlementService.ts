import { ISettlementRepository } from "@/domain/settlements/ISettlementRepository";
import { Settlement } from "@/domain/settlements/Settlement";
import { SettlementMethod } from "@/domain/settlements/SettlementMethod";
import { Result } from "@/shared/common/Result";
import { ISettlementService } from "./ISettlementService";

export class SettlementService implements ISettlementService {
    
    public constructor(
        private readonly settlementRepository: ISettlementRepository
    ){}

    /**
     * @inheritdoc
     */
    public async create(
        fromPersonId: string, 
        toPersonId: string, 
        amount: number, 
        date: Date, 
        method: SettlementMethod | null
    ): Promise<Result<Settlement>> {
        const settlementResult = Settlement.create(fromPersonId, toPersonId, amount, date, method);

        if(!settlementResult.isSuccess){
            return settlementResult;
        }

        await this.settlementRepository.add(settlementResult.value);

        return Result.success(settlementResult.value);
    }

    /**
     * @inheritdoc
     */
    getById(id: string): Promise<Settlement | null> {
        return this.settlementRepository.getById(id);
    }

    /**
     * @inheritdoc
     */
    public async delete(id: string): Promise<void> {
        const settlement = await this.settlementRepository.getById(id);

        if(settlement === null){
            return;
        }

        await this.settlementRepository.delete(settlement);
    }

}