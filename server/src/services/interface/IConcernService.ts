

import { IConcern } from "../../models/concern/IConcern";

export interface IConcernService {
    createConcern(data: Partial<IConcern>): Promise<{success: true}>;
    // getAllConcerns(page: number, limit: number ): Promise<{ data: IConcern[]; total: number; page: number; pages: number }>;
    changeConcernStatus(id: string, status: "resolved" | "rejected"): Promise<{message: string}>;
     getAllConcerns(page: number, limit: number, search: string, status: string): Promise<{ data: IConcern[]; total: number; page: number; pages: number }>;
      getConcernByUser(id: string, role: string, page: number, limit: number,  search: string, status: string): Promise<{
  data: IConcern[];
  total: number;
  page: number;
  pages: number;
}>
}