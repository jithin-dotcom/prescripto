

import { IAdminService, IUserWithProfileResponse } from "../interface/IAdminService";
import { IAdminRepository } from "../../repositories/interface/IAdminRepository";
import { IUser } from "../../types/user.type";
import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";
import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import  mongoose  from "mongoose";
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import { CreateUserOrDoctorInput } from "../interface/IAdminService";
import bcrypt from "bcrypt";
import redisClient from "../../config/redisClient";
import { mapUserToDTO } from "../../utils/mapper/adminService.mapper";


export class AdminService implements IAdminService {
  constructor(
    private _adminRepo: IAdminRepository,
    private _patientProfileRepo: IPatientProfileRepository,
    private _doctorProfileRepo: IDoctorProfileRepository
  ) {}

 

async getUserById(userId: string): Promise<IUserWithProfileResponse> {
  try {
      const user = await this._adminRepo.findById(userId);
      let profile = null;
      if(!user) throw new Error("user not found");
      if(user.role === "user"){
         profile = await this._patientProfileRepo.findAll({patientId: userId});
      }else if(user.role === "doctor"){
         profile = await this._doctorProfileRepo.findAll({doctorId: userId});
      }
      
       return mapUserToDTO(user, profile);
  } catch (error) {
     throw new Error("Failed in fetching user");
  }
}

async getAllUsers(): Promise<{userCount:number,doctorCount:number}>{
   try {
     const data = await this._adminRepo.findAll();
     let doctorCount = 0;
     let userCount = 0;
     data.forEach((obj) => {
        if(obj.role === "user") userCount++;
        else if(obj.role === "doctor") doctorCount++;
     })
      return{
        userCount,
        doctorCount
      }
   } catch (error) {
      console.error(`Error fetching data:`, error);
      throw new Error(`Failed to fetch data`);
   }
}


async getAllByRole(
  role: string,
  page = 1,
  limit = 10,
  search = "",
  specialty = ""
) {
  try {
   
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const skip = (safePage - 1) * safeLimit;
       
    if (specialty === "") {
      const [items, totalItems] = await Promise.all([
        this._adminRepo.getAllByRole(role, safeLimit, skip, search),
        this._adminRepo.countByRole(role),
      ]);

      const itemsWithProfiles = await Promise.all(
        items.map(async (user) => {
          const profile =
            role === "doctor"
              ? await this._doctorProfileRepo.findAll({ doctorId: user._id })
              : await this._patientProfileRepo.findAll({ patientId: user._id });

          
          return mapUserToDTO(user , profile);
        })
      );

      return {
        items: itemsWithProfiles,
        currentPage: safePage,
        totalPages: Math.ceil(totalItems / safeLimit),
        totalItems,
      };
    }

    if (role === "doctor" && specialty !== "") {
      const profiles = await this._doctorProfileRepo.findAll({ specialization: specialty });

      const matchedDoctors = await Promise.all(
        profiles.map(async (profile) => {
          const user = await this._adminRepo.findOne({ _id: profile.doctorId });

          if (!user) return null;

          const nameMatches = user.name
            .toLowerCase()
            .includes(search.trim().toLowerCase());

          if (!nameMatches) return null;

         
          return mapUserToDTO(user, [profile]);
        })
      );

      const filtered = matchedDoctors.filter(Boolean) as IUserWithProfileResponse[];;
      const paginated = filtered.slice(skip, skip + safeLimit);

      return {
        items: paginated,
        currentPage: safePage,
        totalPages: Math.ceil(filtered.length / safeLimit),
        totalItems: filtered.length,
      };
    }

    if (role === "user") {
      const [items, totalItems] = await Promise.all([
        this._adminRepo.getAllByRole(role, safeLimit, skip, search),
        this._adminRepo.countByRole(role),
      ]);

      const itemsWithProfiles = await Promise.all(
        items.map(async (user) => {
          const profile = await this._patientProfileRepo.findAll({ patientId: user._id });

          
          return mapUserToDTO(user, profile);
        })
      );

      return {
        items: itemsWithProfiles,
        currentPage: safePage,
        totalPages: Math.ceil(totalItems / safeLimit),
        totalItems,
      };
    }

    return { items: [], currentPage: 1, totalPages: 0, totalItems: 0 };
  } catch (error) {
    console.error(`Error fetching ${role}s:`, error);
    throw new Error(`Failed to fetch ${role}s`);
  }
}



async createUserOrDoctor({ userData, profileData }: CreateUserOrDoctorInput): Promise<{ message: string, userId: string }> {
  try {
    if (!userData.role || !["user", "doctor"].includes(userData.role)) {
      throw new Error("Invalid role. Only 'user' or 'doctor' are allowed.");
    }

    if (userData.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;
    }

    const user = await this._adminRepo.create(userData);
    const userId = user._id as unknown as string;

    if (profileData.photo) {
      await this._adminRepo.updateById(userId, { photo: profileData.photo });
      delete profileData.photo;  
    }

    if (userData.role === "user") {
      await this._patientProfileRepo.create({
        patientId: new mongoose.Types.ObjectId(userId),
        ...profileData,
      });
    } else if (userData.role === "doctor") {
      
      await this._doctorProfileRepo.create({
        doctorId: new mongoose.Types.ObjectId(userId),
        ...profileData,
      });
    }

    return {
      message: `${userData.role} created successfully`,
      userId,
    };
  } catch (error: any) {
    
    if (error.code === 11000 && error.keyPattern?.email) {
      throw new Error(`User with email ${userData.email} already exists`);
    }

    console.error("Error creating user/doctor:", error);
    throw new Error("Failed to create user/doctor");
  }
}



  async updateUserOrDoctor(
    userId: string,
    userData: Partial<IUser>,
    profileData?: Partial<IPatientProfile> | Partial<IDoctorProfile>
  ): Promise<string> {
    const user = await this._adminRepo.findById(userId);
    if (!user) throw new Error("User not found");

    if (userData.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      userData.password = hashedPassword;
    }

    if (profileData && 'photo' in profileData && profileData.photo) {
      await this._adminRepo.updateById(userId, { photo: profileData.photo });
      delete (profileData as any).photo;
    }

    if (profileData && 'signature' in profileData && profileData.signature) {
      await this._adminRepo.updateById(userId, { signature: profileData.signature });
      delete (profileData as any).signature;
    }

    await this._adminRepo.updateById(userId, userData);

    const objectId = new mongoose.Types.ObjectId(userId);

    if (user.role === "user" && profileData) {
      const existingProfile = await this._patientProfileRepo.findByPatientId(objectId);

      const patientProfileData: Partial<IPatientProfile> = { ...(profileData as Partial<IPatientProfile>) };

      if (existingProfile) {
        await this._patientProfileRepo.updateByPatientId(objectId, patientProfileData);
      } else {
        await this._patientProfileRepo.create({
          patientId: objectId,
          ...patientProfileData,
        });
      }
    } else if (user.role === "doctor" && profileData) {
      const existingProfile = await this._doctorProfileRepo.findByDoctorId(objectId);

      const doctorProfileData: Partial<IDoctorProfile> = { ...(profileData as Partial<IDoctorProfile>) };

      if (existingProfile) {
        await this._doctorProfileRepo.updateByDoctorId(objectId, doctorProfileData);
      } else {
        await this._doctorProfileRepo.create({
          doctorId: objectId,
          ...doctorProfileData,
        });
      }
    }

    return `${user.role} updated successfully`;
  }




async deleteUserOrDoctor(userId: string): Promise<{ message: string }> {
  try {
    const user = await this._adminRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

   
    if (user.role === "user") {
      await this._patientProfileRepo.deleteByFilter({ patientId: user._id });
    } else if (user.role === "doctor") {
      await this._doctorProfileRepo.deleteByFilter({ doctorId: user._id });
    }

   
    await this._adminRepo.deleteById(userId);

    return {
      message: `${user.role} deleted successfully`,
    };
  } catch (error: any) {
    console.error("Error deleting user/doctor:", error);
    throw new Error("Failed to delete user/doctor");
  }
}




  async toggleBlockUser(userId: string): Promise<{ message: string; isBlocked: boolean }> {
    try {
      const user = await this._adminRepo.findById(userId);
     
      if (!user) throw new Error("User not found");
     
      const isBlocked = !user.isBlocked;
      const updatedUser = await this._adminRepo.updateById(userId, { isBlocked });

      
      const cacheKey = `user:${userId}:blocked`;
      await redisClient.setEx(cacheKey, 3600, isBlocked.toString()); 

      if (isBlocked) {
       
        const refreshTokenKeys = await redisClient.keys(`refreshToken:${userId}:*`);
        if (refreshTokenKeys.length > 0) {
          for (const key of refreshTokenKeys) {
            const lookupKey = await redisClient.get(key);
            if (lookupKey) {
              await redisClient.del(`refreshTokenLookup:${lookupKey}`);
            }
            await redisClient.del(key);
          }
        }

       
        await redisClient.setEx(`blacklist:accessToken:${userId}`, 3600, "true"); 
      } else {
       
        await redisClient.del(`blacklist:accessToken:${userId}`);
      }

      return {
        message: `User ${isBlocked ? "blocked" : "unblocked"} successfully`,
        isBlocked,
      };
    } catch (error) {
      throw error;
    }
  }





async toggleVerifyUser(userId: string): Promise<{ message: string; isVerified: boolean | undefined;}> {
    try {
      const user = await this._adminRepo.findById(userId);
      if(!user) throw new Error("user not found");

      const updatedUser = await this._adminRepo.updateById(userId,{isVerified: !user.isVerified});
        return {
         message: `User ${updatedUser?.isVerified ? "verified" : "unVerified"} successfully`,
         isVerified: updatedUser!.isVerified,
        };
    } catch (error) {
        throw (error);
    }
 }

}
