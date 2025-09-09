
import { IUserService } from "../interface/IUserService";
import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";
import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import { IUserRepository } from "../../repositories/interface/IUserRepository";

import { UserDTO, PatientProfileDTO, DoctorProfileDTO } from "../../utils/reverseMapper/userService/IUserService";
import { mapPatientProfileDTOToPersistence, mapDoctorProfileDTOToPersistence } from "../../utils/reverseMapper/userService/userService"; 
import { mapGetProfileUserDTO, mapGetProfileDoctorProfileDTO, mapGetProfilePatientProfileDTO } from "../../utils/reverseMapper/userService/userServiceGetUser";
import { GetProfileUserDTO, GetProfileDoctorProfileDTO, GetProfilePatientProfileDTO } from "../../utils/reverseMapper/userService/IUserServiceGetUser";
import { GetAllDoctorsDoctorProfileDTO} from "../../utils/reverseMapper/userService/IUserService.getAllDoctors";
import { mapGetAllDoctorsDoctorProfileDTO, mapGetAllDoctorsUserDTO } from "../../utils/reverseMapper/userService/userService.getAllDoctors";
import { IUser } from "../../types/user.type";



import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { UserModel } from "../../models/user.models";


interface IQuery  {
  role: "user" | "doctor";
  isBlocked: boolean;
  isVerified: boolean;
  name?:  string | { $regex: string; $options?: string };
}


export class UserService implements IUserService {

  constructor(
    private _userRepo: IUserRepository,
    private _patientRepo: IPatientProfileRepository,
    private _doctorRepo: IDoctorProfileRepository,
        
  ){}




async getAllDoctors(
  page: number = 1,
  limit: number = 4,
  search: string = "",
  sort: string = "createdAt",
  specialty: string = ""
): Promise<{
  data: any[];
  total: number;
  totalPages: number;
  page: number;
}> {
  try {
    const skip = (page - 1) * limit;

    const baseQuery: any = {
      role: "doctor",
      isBlocked: false,
      isVerified: true,
      name: { $regex: search, $options: "i" },
    };

    let users: any[] = [];

    if (specialty) {
      const profiles = await this._doctorRepo.findAll({ specialization: specialty });
      const userIds = profiles.map((p) => p.doctorId);

      users = await this._userRepo.findAll({
        _id: { $in: userIds },
        ...baseQuery,
      });
    } else {
      users = await this._userRepo.findAll(baseQuery);
    }

    const doctorsWithProfiles = await Promise.all(
      users.map(async (userDoc) => {
        const profiles = await this._doctorRepo.findAll({ doctorId: userDoc._id });
        const mappedProfiles = profiles
          .map(mapGetAllDoctorsDoctorProfileDTO)
          .filter(Boolean) as GetAllDoctorsDoctorProfileDTO[];

       
        return {
          ...mapGetAllDoctorsUserDTO(userDoc), 
          profile: mappedProfiles,
          isVerified: userDoc.isVerified,
        };
      })
    );

    const sortField = sort.startsWith("-") ? sort.slice(1) : sort;
    const sortOrder = sort.startsWith("-") ? "asc" : "desc";

    const sortedDoctors = doctorsWithProfiles.sort((a, b) => {
      let valA = 0;
      let valB = 0;

      if (sortField === "experience") {
        valA = a.profile?.[0]?.yearOfExperience ?? 0;
        valB = b.profile?.[0]?.yearOfExperience ?? 0;
      } else if (sortField === "rating") {
        valA = a.profile?.[0]?.averageRating ?? 0;
        valB = b.profile?.[0]?.averageRating ?? 0;
      } else {
        valA = (a as any)[sortField] ?? 0;
        valB = (b as any)[sortField] ?? 0;
      }

      return sortOrder === "asc" ? valA - valB : valB - valA;
    });

    const total = sortedDoctors.length;
    const paginated = sortedDoctors.slice(skip, skip + limit);


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





async getProfile(
  userId: string
): Promise<{ user: GetProfileUserDTO; profile: GetProfilePatientProfileDTO | GetProfileDoctorProfileDTO | null } | null> {
  try {
    const userDoc = await this._userRepo.findById(userId);
    if (!userDoc) return null;

    let profile = null;
    if (userDoc.role === "user") {
      const patientProfileDoc = await this._patientRepo.findOne({ patientId: userId });
      profile = mapGetProfilePatientProfileDTO(patientProfileDoc);
    } else if (userDoc.role === "doctor") {
      const doctorProfileDoc = await this._doctorRepo.findOne({ doctorId: userId });
      profile = mapGetProfileDoctorProfileDTO(doctorProfileDoc);
    }

    return {
      user: mapGetProfileUserDTO(userDoc),
      profile,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch profile");
  }
}




async updateUserOrDoctor(
  userId: string,
  userData: Partial<UserDTO>,
  profileData?: Partial<PatientProfileDTO> | Partial<DoctorProfileDTO>
): Promise<string> {
  try {
    const userDoc = await this._userRepo.findById(userId);
    if (!userDoc) throw new Error("User not found");

   
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

    
    if (profileData && "photo" in profileData && profileData.photo) {
      await this._userRepo.updateById(userId, { photo: profileData.photo });
      delete (profileData as any).photo;
    }

    
    await this._userRepo.updateById(userId, userData);

    if (userDoc.role === "user" && profileData) {
      const existingProfile = await this._patientRepo.findByPatientId(new mongoose.Types.ObjectId(userId));
      const persistenceData = mapPatientProfileDTOToPersistence(profileData as Partial<PatientProfileDTO>, userId);

      if (existingProfile) {
        await this._patientRepo.updateByPatientId(existingProfile.patientId, persistenceData);
      } else {
        await this._patientRepo.create(persistenceData);
      }
    }

    if (userDoc.role === "doctor" && profileData) {
      const existingProfile = await this._doctorRepo.findByDoctorId(new mongoose.Types.ObjectId(userId));
      const persistenceData = mapDoctorProfileDTOToPersistence(profileData as Partial<DoctorProfileDTO>, userId);

      if (existingProfile) {
        await this._doctorRepo.updateByDoctorId(existingProfile.doctorId, persistenceData);
      } else {
        await this._doctorRepo.create(persistenceData);
      }
    }

    return `User with ID ${userId} updated successfully`;
  } catch (error) {
    console.error("Error in updateUserOrDoctor:", error);
    throw new Error(error instanceof Error && error.message ? error.message : "Something went wrong while updating");
  }
}





async changePassword(userId: string, oldPassword: string, newPassword: string):Promise<void>{
   try {
      
      console.log("entered into change password");
      const user = await this._userRepo.findById(userId);
      if(!user){
         throw new Error("User not found");
      }
      if(!user.password){
        throw new Error("Password missing in dataBase");
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if(!isMatch){
        throw new Error("oldPassword don't match the password in dataBase");
      }

      const hashedPassword = await bcrypt.hash(newPassword,10);

      await this._userRepo.updateById(userId,{password:hashedPassword});

   }catch (error) {
      if(error instanceof Error){
        throw error
      }else{
         throw new Error("Something went wrong");
      }
   }
   
  
}



async changeEmail(userId: string, password: string, newEmail: string):Promise<void>{
    try {
        
        const user = await UserModel.findById(userId);
        if(!user){
           throw new Error("User not found");
        }
        if(!user.password){
           throw new Error("Password missing in Database");
        }
       
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
           throw new Error("Password doesn't match");
        }

        const existing = await this._userRepo.findOne({email:newEmail});
       
        if(existing && (existing?._id as mongoose.Types.ObjectId).toString() !== userId){
           throw new Error("Email not available");
        }
       
        await this._userRepo.updateById(userId,{email:newEmail});

    }catch (error) {
       if(error instanceof Error){
          throw new Error(error.message);
       }else{
          throw new Error("Something went wrong");
       }
    }
}



async getUserById(userId:string): Promise<IUser | null> {
  try {
     const id = new mongoose.Types.ObjectId(userId); 
     const user = await this._userRepo.findById(id);
     return user;
  }catch (error) {
    throw new Error("Failed to get User");
  }
}



}