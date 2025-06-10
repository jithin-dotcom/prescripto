import { IUser } from "../../types/user.type";
import { IAdminRepository } from "../interface/IAdminRepository";
import { BaseRepository } from "./base.repositories";
import { Document } from "mongoose";
import { UserModel } from "../../models/user.models";



export class AdminRepository extends BaseRepository<IUser & Document> implements IAdminRepository {
    constructor (){
        super(UserModel);
    }


    async getAllByRole(role: string, limit: number, skip: number): Promise<(IUser & Document)[]> {
      return await this.model.find({ role }).skip(skip).limit(limit).select("-password -refreshToken");
    }

    async countByRole(role: string): Promise<number> {
      return await this.model.countDocuments({ role });
    }

}