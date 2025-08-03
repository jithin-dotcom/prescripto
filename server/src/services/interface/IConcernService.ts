

import { IConcern } from "../../models/concern/IConcern";

export interface IConcernService {
    createConcern(data: Partial<IConcern>): Promise<{success: true}>;
    getAllConcerns(page: number, limit: number): Promise<{ data: IConcern[]; total: number; page: number; pages: number }>
}