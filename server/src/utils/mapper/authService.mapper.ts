
import { Document } from "mongoose";
import { IUser, ISafeUser } from "../../types/user.type";


export function mapUser(user: IUser & Document): ISafeUser {
  const obj = user.toObject();

  return {
    _id: obj._id.toString(),
    name: obj.name,
    email: obj.email,
    role: obj.role,
    photo: obj.photo,
    authProvider: obj.authProvider,
    isBlocked: obj.isBlocked,
    isVerified: obj.isVerified,
    createdAt: obj.createdAt,
  };
}