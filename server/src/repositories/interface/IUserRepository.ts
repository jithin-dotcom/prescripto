
import { IUser } from "../../types/user.type";
import  mongoose, { Document } from "mongoose";
import { IBaseRepository } from "./IBaseRepository";


export interface IUserRepository extends IBaseRepository< IUser & Document >{
    findByEmail(email : string) : Promise<(IUser & Document) | null>;
    createUser(userData : IUser) : Promise<IUser & Document>;
    updatePasswordByEmail(email: string, hashedPassword: string): Promise<void>;
    updatePhoto(userId: string, photoUrl: string): Promise<(IUser & Document) | null>;
    findTopDoctors(limit: number): Promise<(IUser & Document)[] | null>;
}



