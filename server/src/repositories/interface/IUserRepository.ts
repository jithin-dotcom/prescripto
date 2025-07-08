
import { IUser } from "../../types/user.type";
import  mongoose, { Document, SortOrder } from "mongoose";
import { IBaseRepository } from "./IBaseRepository";


export interface IUserRepository extends IBaseRepository< IUser & Document >{
    findByEmail(email : string) : Promise<(IUser & Document) | null>;
    createUser(userData : IUser) : Promise<IUser & Document>;
    updatePasswordByEmail(email: string, hashedPassword: string): Promise<void>;
    updatePhoto(userId: string, photoUrl: string): Promise<(IUser & Document) | null>;
    findTopDoctors(limit: number): Promise<(IUser & Document)[] | null>;
    findAll(
  filter: Partial<IUser>,
  skip?: number,
  limit?: number,
  sort?: Record<string, SortOrder>
): Promise<(IUser & Document)[]>;

count(filter: Partial<IUser>): Promise<number>;

}



