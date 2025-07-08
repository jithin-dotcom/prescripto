import { IUser } from "../../types/user.type";
import { IAdminRepository } from "../interface/IAdminRepository";
import { BaseRepository } from "./base.repositories";
import { Document } from "mongoose";
import { UserModel } from "../../models/user.models";



export class AdminRepository extends BaseRepository<IUser & Document> implements IAdminRepository {
    constructor (){
        super(UserModel);
    }

    async getAllByRole(role: string, limit: number, skip: number, search: string): Promise<(IUser & Document)[]> {
      return await this.model.find({ role, name: { $regex: search, $options: "i" } }).skip(skip).limit(limit).sort({createdAt:-1}).select("-password -refreshToken");
    }

    async countByRole(role: string): Promise<number> {
      return await this.model.countDocuments({ role });
    }

}