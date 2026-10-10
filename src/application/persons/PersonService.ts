import { IPersonRepository } from "@/domain/persons/IPersonRespository";
import { Person } from "@/domain/persons/Person";
import { Result } from "@/shared/common/Result";
import { IPersonService } from "./IPersonService";

export class PersonService implements IPersonService{

    public constructor(
        private readonly personRepository: IPersonRepository
    ){}

    /**
     * @inheritdoc
     */
    public async create(name: string): Promise<Result<Person>> {
        const personResult = Person.create(name);

        if(!personResult.isSuccess){
            return personResult;
        }

        await this.personRepository.add(personResult.value);

        return Result.success(personResult.value);
    }

    /**
     * @inheritdoc
     */
    public getById(id: string): Promise<Person | null> {
        return this.personRepository.getById(id);
    }

    /**
     * @inheritdoc
     */
    public async delete(id: string): Promise<void> {
        const person = await this.personRepository.getById(id);

        if(person === null){
            return;
        }

        await this.personRepository.delete(person);
    }

}