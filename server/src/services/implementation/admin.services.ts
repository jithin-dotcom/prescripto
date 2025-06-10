

import { IAdminService } from "../interface/IAdminService";
import { IAdminRepository } from "../../repositories/interface/IAdminRepository";
import { IUser } from "../../types/user.type";
import { PatientProfileModel } from "../../models/patient/patientProfile.models";
import { DoctorProfileModel } from "../../models/doctor/doctorProfile.models";
import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";
import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import  mongoose  from "mongoose";
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import { CreateUserOrDoctorInput } from "../interface/IAdminService";
import bcrypt from "bcrypt";





export class AdminService implements IAdminService {
  constructor(
    private adminRepo: IAdminRepository,
    private patientProfileRepo: IPatientProfileRepository,
    private doctorProfileRepo: IDoctorProfileRepository
  ) {}

 

async getUserById(userId: string): Promise<object> {
  try {
      const user = await this.adminRepo.findById(userId);
      let profile = null;
      if(!user) throw new Error("user not found");
      if(user.role === "user"){
         profile = await this.patientProfileRepo.findAll({patientId: userId});
      }else if(user.role === "doctor"){
         profile = await this.doctorProfileRepo.findAll({doctorId: userId});
      }
      return {
        ...user.toObject(),
        profile
      }
  } catch (error) {
     throw new Error("Failed in fetching user");
  }
}



async getAllByRole(role: string, page = 1, limit = 10) {
    try {
      const safePage = Math.max(1, page);
      const safeLimit = Math.max(1, limit);
      const skip = (safePage - 1) * safeLimit;

      const [items, totalItems] = await Promise.all([
        this.adminRepo.getAllByRole(role, safeLimit, skip),
        this.adminRepo.countByRole(role),
      ]);

      // Populate profile info based on role
      const itemsWithProfiles = await Promise.all(
        items.map(async (user) => {
          let profile = null;

          if (role === "user") {
            // profile = await PatientProfileModel.findOne({ patientId: user._id }).lean();
            profile = await this.patientProfileRepo.findAll({patientId: user._id});
          } else if (role === "doctor") {
            // profile = await DoctorProfileModel.findOne({ doctorId: user._id }).lean();
            profile = await this.doctorProfileRepo.findAll({doctorId: user._id});
            
          }

          return {
            ...user.toObject(),
            profile, // will be null for admin
          };
        })
      );

      const totalPages = Math.ceil(totalItems / safeLimit);

      return {
        items: itemsWithProfiles,
        currentPage: safePage,
        totalPages,
        totalItems,
      };
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

    // Create the user
    const user = await this.adminRepo.create(userData);
    const userId = user._id as unknown as string;

    if (profileData.photo) {
      await this.adminRepo.updateById(userId, { photo: profileData.photo });
      delete profileData.photo;  
    }

    
    if (userData.role === "user") {
      await this.patientProfileRepo.create({
        patientId: new mongoose.Types.ObjectId(userId),
        ...profileData,
      });
    } else if (userData.role === "doctor") {
      console.log("Creating doctor profile with:", {
        doctorId: new mongoose.Types.ObjectId(userId),
        ...profileData,
      });

      await this.doctorProfileRepo.create({
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
  const user = await this.adminRepo.findById(userId);
  if (!user) throw new Error("User not found");

  if (userData.password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;
  }

  if (profileData && 'photo' in profileData && profileData.photo) {
    await this.adminRepo.updateById(userId, { photo: profileData.photo });
    delete (profileData as any).photo;
  }

  await this.adminRepo.updateById(userId, userData);

  const objectId = new mongoose.Types.ObjectId(userId);

  if (user.role === "user" && profileData) {
    const existingProfile = await this.patientProfileRepo.findByPatientId(objectId);

    const patientProfileData: Partial<IPatientProfile> = { ...(profileData as Partial<IPatientProfile>) };

    if (existingProfile) {
      await this.patientProfileRepo.updateByPatientId(objectId, patientProfileData);
    } else {
      await this.patientProfileRepo.create({
        patientId: objectId,
        ...patientProfileData,
      });
    }

  } else if (user.role === "doctor" && profileData) {
    const existingProfile = await this.doctorProfileRepo.findByDoctorId(objectId);

    const doctorProfileData: Partial<IDoctorProfile> = { ...(profileData as Partial<IDoctorProfile>) };

    if (existingProfile) {
      await this.doctorProfileRepo.updateByDoctorId(objectId, doctorProfileData);
    } else {
      await this.doctorProfileRepo.create({
        doctorId: objectId,
        ...doctorProfileData,
      });
    }
  }

  return `${user.role} updated successfully`;
}





async deleteUserOrDoctor(userId: string): Promise<{ message: string }> {
  try {
    const user = await this.adminRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

   
    if (user.role === "user") {
      await this.patientProfileRepo.deleteByFilter({ patientId: user._id });
    } else if (user.role === "doctor") {
      await this.doctorProfileRepo.deleteByFilter({ doctorId: user._id });
    }

   
    await this.adminRepo.deleteById(userId);

    return {
      message: `${user.role} deleted successfully`,
    };
  } catch (error: any) {
    console.error("Error deleting user/doctor:", error);
    throw new Error("Failed to delete user/doctor");
  }
}


async toggleBlockUser(userId: string): Promise<{ message: string; isBlocked: boolean;}> {
    try {
      const user = await this.adminRepo.findById(userId);
      if(!user) throw new Error("user not found");

      const updatedUser = await this.adminRepo.updateById(userId,{isBlocked: !user.isBlocked});
        return {
         message: `User ${updatedUser?.isBlocked ? "blocked" : "unblocked"} successfully`,
         isBlocked: updatedUser!.isBlocked,
        };
    } catch (error) {
        throw (error);
    }
}

async toggleVerifyUser(userId: string): Promise<{ message: string; isVerified: boolean | undefined;}> {
    try {
      const user = await this.adminRepo.findById(userId);
      if(!user) throw new Error("user not found");

      const updatedUser = await this.adminRepo.updateById(userId,{isVerified: !user.isVerified});
        return {
         message: `User ${updatedUser?.isVerified ? "verified" : "unVerified"} successfully`,
         isVerified: updatedUser!.isVerified,
        };
    } catch (error) {
        throw (error);
    }
}


}
