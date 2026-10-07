import { IRepository } from "@/shared/domain/IRepository";
import { Person } from "./Person";

export interface IPersonRepository extends IRepository<Person> {}