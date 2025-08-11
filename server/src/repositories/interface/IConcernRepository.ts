

import { IBaseRepository } from "./IBaseRepository";
import { IConcern, IConcernDocPopulated } from "../../models/concern/IConcern";
import mongoose, { FilterQuery} from "mongoose";

export interface IConcernRepository extends IBaseRepository<IConcern> {
    updateStatusIfPending(id: string | mongoose.Types.ObjectId, status: "resolved" | "rejected"): Promise<IConcern | null>;
    getConcerns(skip: number, limit: number, query: FilterQuery<IConcern>): Promise<IConcernDocPopulated[]>;
    countConcerns(query: FilterQuery<IConcern>): Promise<number>;
}






