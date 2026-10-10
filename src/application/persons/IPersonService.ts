import { Person } from "@/domain/persons/Person";
import { Result } from "@/shared/common/Result";
import { IService } from "@/shared/domain/IService";

export interface IPersonService extends IService<Person>{

    /** Creates a new person to be stored in the repository.
     * @param name Name of the person to be created.
     * @returns Promise<Result<Person>> containing the newly created Person instance.
     */
    create(name: string): Promise<Result<Person>>;
}