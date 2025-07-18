
import { IUserService } from "../interface/IUserService";
import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";
import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { IUser } from "../../types/user.type";
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import { Document } from "mongoose";
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import bcrypt from "bcrypt";
import mongoose from "mongoose";


export class UserService implements IUserService {

    constructor(
        private _userRepo: IUserRepository,
        private _patientRepo: IPatientProfileRepository,
        private _doctorRepo: IDoctorProfileRepository
    ){}


    async getTopDoctors(): Promise<({user: IUser, profile: IPatientProfile | null})[]> {
      try {
       const users = await this._userRepo.findTopDoctors(4); 

       if (!users || users.length === 0) return [];

       const items = await Promise.all(users.map(async (doc) => {
          const profile = await this._doctorRepo.findAll({ doctorId: doc._id });

          return {
           ...doc.toObject(),
           profile, 
         };
       }));

       return items;

     } catch (error) {
       console.error(error);
       throw new Error(`Failed to fetch doctors`);
     }
   }


async getAllDoctors(
  page: number = 1,
  limit: number = 4,
  search: string = "",
  sort: string = "createdAt",
  specialty: string = "",
): Promise<{
  data: ({ profile: IDoctorProfile[] } & IUser)[]; // Flattened user + profile
  total: number;
  totalPages: number;
  page: number;
}> {
  try {
    const skip = (page - 1) * limit;

    if (!specialty) {
      const query: any = {
        role: "doctor",
        isBlocked: false,
        name: { $regex: search, $options: "i" },
      };

      const sortField = sort.startsWith("-") ? sort.slice(1) : sort;
      const sortOrder = sort.startsWith("-") ? 1 : -1;

      const [users, total] = await Promise.all([
        this._userRepo.findAll(query, skip, limit, { [sortField]: sortOrder }),
        this._userRepo.count(query),
      ]);

      const items = await Promise.all(
        users.map(async (doc) => {
          const profile = await this._doctorRepo.findAll({ doctorId: doc._id });

          return {
            ...doc.toObject(), 
            profile,
          };
        })
      );

      return {
        data: items,
        total,
        totalPages: Math.ceil(total / limit),
        page,
      };
    }

   
    const matchedProfiles = await this._doctorRepo.findAll({ specialization: specialty });

    const matchedDoctors: ({ profile: IDoctorProfile[] } & IUser)[] = [];

    for (const profile of matchedProfiles) {
      const user = await this._userRepo.findOne({
        _id: profile.doctorId,
        isBlocked: false,
        role: "doctor",
        name: { $regex: search, $options: "i" },
      });

      if (!user) continue;

      matchedDoctors.push({
        ...user.toObject(),   
        profile: [profile],
      });
    }

    const total = matchedDoctors.length;
    const paginated = matchedDoctors.slice(skip, skip + limit);

    return {
      data: paginated,
      total,
      totalPages: Math.ceil(total / limit),
      page,
    };
  } catch (error) {
    console.error("Error in getAllDoctors:", error);
    throw new Error("Failed to fetch paginated doctors");
  }
}






 async getProfile(userId: string): Promise<{user: IUser, profile: IPatientProfile | IDoctorProfile | null}|null> {
  try {
    const user = await this._userRepo.findById(userId);

    if (!user) return null;

    
    let profile = null;
    if(user.role === "user"){
       profile = await this._patientRepo.findOne({patientId: userId});
    }else if(user.role === "doctor"){
        profile = await this._doctorRepo.findOne({doctorId: userId});
    }
    

    return {
       user,
       profile
    }

  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch profile`);
  }
}


async updateUserOrDoctor(
  userId: string,
  userData: Partial<IUser>,
  profileData?: Partial<IPatientProfile> | Partial<IDoctorProfile>
): Promise<string> {
  try {
    const user = await this._userRepo.findById(userId);
    if (!user) throw new Error("User not found");

    if (userData.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;
    }

    if (profileData && 'photo' in profileData && profileData.photo) {
      await this._userRepo.updateById(userId, { photo: profileData.photo });
      delete (profileData as any).photo;
    }

    await this._userRepo.updateById(userId, userData);

    const objectId = new mongoose.Types.ObjectId(userId);

    if (user.role === "user" && profileData) {
      const existingProfile = await this._patientRepo.findByPatientId(objectId);

      const patientProfileData: Partial<IPatientProfile> = {
        ...(profileData as Partial<IPatientProfile>),
      };

      if (existingProfile) {
        await this._patientRepo.updateByPatientId(objectId, patientProfileData);
      } else {
        await this._patientRepo.create({
          patientId: objectId,
          ...patientProfileData,
        });
      }
    } else if (user.role === "doctor" && profileData) {
      const existingProfile = await this._doctorRepo.findByDoctorId(objectId);

      const doctorProfileData: Partial<IDoctorProfile> = {
        ...(profileData as Partial<IDoctorProfile>),
      };

      if (existingProfile) {
        await this._doctorRepo.updateByDoctorId(objectId, doctorProfileData);
      } else {
        await this._doctorRepo.create({
          doctorId: objectId,
          ...doctorProfileData,
        });
      }
    }

    return `User with ID ${userId} updated successfully`;
  } catch (error:any) {
    console.error("Error in updateUserOrDoctor:", error);
    throw new Error(error.message || "Something went wrong while updating the user or doctor.");
  }
}


}