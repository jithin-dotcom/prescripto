

import { IBaseRepository } from "./IBaseRepository";
import { IConcern } from "../../models/concern/IConcern";
import mongoose, { FilterQuery} from "mongoose";

export interface IConcernRepository extends IBaseRepository<IConcern> {
    // getConcerns(skip: number, limit: number): Promise<IConcern[]>;
    // countConcerns(): Promise<number> ;
    updateStatusIfPending(id: string | mongoose.Types.ObjectId, status: "resolved" | "rejected"): Promise<IConcern | null>;
    getConcerns(skip: number, limit: number, query: FilterQuery<IConcern>): Promise<IConcern[]>;
    countConcerns(query: FilterQuery<IConcern>): Promise<number>;
}