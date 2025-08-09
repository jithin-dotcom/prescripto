

import { IUserDb, IDoctorProfileDb, ITopDoctorClean } from "../../types/user.type";

export function mapTopDoctor(
  user: IUserDb,
  profiles: IDoctorProfileDb[]
): ITopDoctorClean {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: "doctor",
    isVerified: user.isVerified,
    authProvider: user.authProvider,
    isBlocked: user.isBlocked,
    createdAt: user.createdAt,
    photo: user.photo,
    profile: profiles.map((p) => {
      const { updatedAt, __v, ...rest } = p;
      return rest;
    }),
  };
}
