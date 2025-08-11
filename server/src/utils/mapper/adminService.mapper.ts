

import { IUser } from "../../types/user.type";
import { IUserWithProfileResponse } from "../../services/interface/IAdminService";
import mongoose, { Document } from "mongoose";
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";


export function mapUserToDTO(
  user: IUser & Document,
  profile: IPatientProfile[] | IDoctorProfile[] | null
): IUserWithProfileResponse {
  return {
    id: (user._id as mongoose.Types.ObjectId).toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    isBlocked: user.isBlocked,
    authProvider: user.authProvider,
    photo: user.photo,
    profile: profile
      ? profile.map((p) => {
          const { _id, createdAt, updatedAt, __v, ...rest } = p.toObject();
          return {
            id: _id.toString(),
            ...rest,
          };
        })
      : [],
  };
}
