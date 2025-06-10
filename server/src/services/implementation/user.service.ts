
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
        private userRepo: IUserRepository,
        private patientRepo: IPatientProfileRepository,
        private doctorRepo: IDoctorProfileRepository
    ){}


    async getTopDoctors(): Promise<({user: IUser, profile: IPatientProfile | null})[]> {
      try {
       const users = await this.userRepo.findTopDoctors(4); 

       if (!users || users.length === 0) return [];

       const items = await Promise.all(users.map(async (doc) => {
          const profile = await this.doctorRepo.findAll({ doctorId: doc._id });

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

 async getAllDoctors(): Promise<({user: IUser, profile: IPatientProfile | null})[]> {
  try {
    const users = await this.userRepo.findAll({role: "doctor", isBlocked: false}); 

    if (!users || users.length === 0) return [];

    const items = await Promise.all(users.map(async (doc) => {
      const profile = await this.doctorRepo.findAll({ doctorId: doc._id });

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

 async getProfile(userId: string): Promise<{user: IUser, profile: IPatientProfile | IDoctorProfile | null}|null> {
  try {
    const user = await this.userRepo.findById(userId);

    if (!user) return null;

    
    let profile = null;
    if(user.role === "user"){
       profile = await this.patientRepo.findOne({patientId: userId});
    }else if(user.role === "doctor"){
        profile = await this.doctorRepo.findOne({doctorId: userId});
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
  const user = await this.userRepo.findById(userId);
  if (!user) throw new Error("User not found");

  if (userData.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;
  }

  if (profileData && 'photo' in profileData && profileData.photo) {
    await this.userRepo.updateById(userId, { photo: profileData.photo });
    delete (profileData as any).photo;
  }

  await this.userRepo.updateById(userId, userData);

  const objectId = new mongoose.Types.ObjectId(userId);

  if (user.role === "user" && profileData) {
    const existingProfile = await this.patientRepo.findByPatientId(objectId);

    const patientProfileData: Partial<IPatientProfile> = { ...(profileData as Partial<IPatientProfile>) };

    if (existingProfile) {
      await this.patientRepo.updateByPatientId(objectId, patientProfileData);
    } else {
      await this.patientRepo.create({
        patientId: objectId,
        ...patientProfileData,
      });
    }

  } else if (user.role === "doctor" && profileData) {
    const existingProfile = await this.doctorRepo.findByDoctorId(objectId);

    const doctorProfileData: Partial<IDoctorProfile> = { ...(profileData as Partial<IDoctorProfile>) };

    if (existingProfile) {
      await this.doctorRepo.updateByDoctorId(objectId, doctorProfileData);
    } else {
      await this.doctorRepo.create({
        doctorId: objectId,
        ...doctorProfileData,
      });
    }
  }

  return `${user} updated successfully`;
 }

}