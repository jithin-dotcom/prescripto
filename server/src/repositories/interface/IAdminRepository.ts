import { Document } from "mongoose";
import { IUser } from "../../types/user.type"
import { IBaseRepository } from "./IBaseRepository";

export interface IAdminRepository extends IBaseRepository<IUser & Document> {
    // getAllUsers(limit:number,page:number): Promise<(IUser & Document)[]>;
    // countUsers(): Promise<number>;
    getAllByRole(role: string, limit: number, skip: number, search: string): Promise<(IUser & Document)[]>;
    countByRole(role: string): Promise<number>;
    

}