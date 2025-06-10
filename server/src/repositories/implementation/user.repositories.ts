

import { UserModel } from "../../models/user.models";
import { IUser } from "../../types/user.type";
import { IUserRepository } from "../interface/IUserRepository";
import { BaseRepository } from "./base.repositories";
import { Document } from "mongoose";

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
    return await this.model.find({ role: "doctor", isBlocked: false }).limit(limit);
  }

  
}
