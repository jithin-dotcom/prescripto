

import { UserModel } from "../../models/user.models";
import { IUser } from "../../types/user.type";
import { IUserRepository } from "../interface/IUserRepository";
import { BaseRepository } from "./base.repositories";
import { Document, SortOrder } from "mongoose";


export class UserRepository
  extends BaseRepository<IUser & Document>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<(IUser & Document) | null> {
    return await this.model.findOne({ email });
  }

  async createUser(userData: IUser): Promise<IUser & Document> {
    return await this.create(userData);
  }

  async updatePasswordByEmail(email: string, hashedPassword: string): Promise<void> {
    await this.model.updateOne({ email }, { $set: { password: hashedPassword } });
  }
   
  async updatePhoto(userId: string, photoUrl: string): Promise<(IUser & Document) | null> {
    return UserModel.findByIdAndUpdate(userId, { photo: photoUrl }, { new: true });
  }

  async findTopDoctors(limit: number = 4): Promise<(IUser & Document)[] | null> {
    return await this.model.find({ role: "doctor", isBlocked: false, isVerified: true }).sort({createdAt:-1}).limit(limit);
  }

  async findAll(
  filter: Partial<IUser>,
  skip = 0,
  limit = 8,
  sort: Record<string, SortOrder> = { createdAt: -1}
  ): Promise<(IUser & Document)[]> {
   
    return await this.model.find(filter).skip(skip).limit(limit).sort(sort);
  }

  async count(filter: Partial<IUser>): Promise<number> {
    return await this.model.countDocuments(filter);
  }

   
 
}
