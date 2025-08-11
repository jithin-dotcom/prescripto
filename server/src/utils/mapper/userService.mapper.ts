

import { IUser, IDoctorProfile, ITopDoctorClean } from "../../types/user.type";
import mongoose from "mongoose";


export const mapTopDoctor = (
  user: IUser & mongoose.Document,
  profile: IDoctorProfile[] | null
): ITopDoctorClean => {
 
  const userData = user.toObject({
    transform: (doc, ret) => {
      delete ret.updatedAt;
      delete ret.__v;
      return ret;
    },
  });


  const profileData = profile && profile.length > 0 ? profile[0] : null;
  const cleanProfile = profileData
    ? {
        ...profileData,
        updatedAt: undefined,
        __v: undefined,
      }
    : null;

  return {
    user: userData,
    profile: cleanProfile,
  };
};


export const mapTopDoctors = (
  users: (IUser & mongoose.Document)[],
  profiles: (IDoctorProfile[] | null)[]
): ITopDoctorClean[] => {
  return users.map((user, index) => mapTopDoctor(user, profiles[index]));
};
