

// import { IUserDb, IDoctorProfileDb, ITopDoctorClean } from "../../types/user.type";

// export function mapTopDoctor(
//   user: IUserDb,
//   profiles: IDoctorProfileDb[]
// ): ITopDoctorClean {
//   return {
//     _id: user._id,
//     name: user.name,
//     email: user.email,
//     role: "doctor",
//     isVerified: user.isVerified,
//     authProvider: user.authProvider,
//     isBlocked: user.isBlocked,
//     createdAt: user.createdAt,
//     photo: user.photo,
//     profile: profiles.map((p) => {
//       const { updatedAt, __v, ...rest } = p;
//       return rest;
//     }),
//   };
// }







// // export function mapTopDoctor(
// //   user: IUserDb,
// //   profiles: IDoctorProfileDb[]
// // ): { user: IUserDb; profile: IDoctorProfileDb | null } {
// //   let profile: IDoctorProfileDb | null = null;

// //   if (profiles && profiles.length > 0) {
// //     // Take the first profile, remove unwanted fields
// //     const { updatedAt, __v, ...rest } = profiles[0];
// //     profile = rest as IDoctorProfileDb;
// //   }

// //   return {
// //     ...user,
// //     profile,
// //   };
// // }







// utils/mapper/userService.mapper.ts
import { IUser, IDoctorProfile, ITopDoctorClean } from "../../types/user.type";
import mongoose from "mongoose";

// Map a single user and their doctor profile to a clean format
export const mapTopDoctor = (
  user: IUser & mongoose.Document,
  profile: IDoctorProfile[] | null
): ITopDoctorClean => {
  // Convert Mongoose document to plain object and remove unwanted fields
  const userData = user.toObject({
    transform: (doc, ret) => {
      delete ret.updatedAt;
      delete ret.__v;
      return ret;
    },
  });

  // Map the doctor profile (if it exists) and remove unwanted fields
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

// Map an array of users and their profiles
export const mapTopDoctors = (
  users: (IUser & mongoose.Document)[],
  profiles: (IDoctorProfile[] | null)[]
): ITopDoctorClean[] => {
  return users.map((user, index) => mapTopDoctor(user, profiles[index]));
};
