
import { IUserService } from "../interface/IUserService";
import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";
import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { IUser } from "../../types/user.type";
import { IPatientProfile } from "../../models/patient/IPatientProfile";


import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import bcrypt from "bcrypt";
import mongoose,{ Document} from "mongoose";
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
  data: ({ profile: IDoctorProfile[] } & IUser)[];
  total: number;
  totalPages: number;
  page: number;
}> {
  try {
    const skip = (page - 1) * limit;

    const baseQuery: IQuery = {
      role: "doctor",
      isBlocked: false,
      isVerified: true,
      name: { $regex: search, $options: "i" },
    };

    let users: (IUser & Document)[] = [];

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
      users.map(async (user) => {
        const profile = await this._doctorRepo.findAll({ doctorId: user._id });
        return {
          ...user.toObject(),
          profile,
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
        valA = a[sortField] ?? 0;
        valB = b[sortField] ?? 0;
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