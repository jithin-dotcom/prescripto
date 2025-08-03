

import { IBaseRepository } from "./IBaseRepository";
import { IConcern } from "../../models/concern/IConcern";

export interface IConcernRepository extends IBaseRepository<IConcern> {
    findAllConcern(page: number, limit: number): Promise<{ data: IConcern[]; total: number }>;
}