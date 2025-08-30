

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
import { UploadedFiles } from "../interface/IAdminService";
import { uploadToCloudinary } from "../../config/cloudinary";

import { UpdateUserDTO, UpdateDoctorProfileDTO, UpdatePatientProfileDTO, CreateUserDTO, UserWithProfileResponseDTO } from "../../utils/reverseMapper/adminService/IAdminService";
import { mapUserDtoToDb, mapDoctorProfileDtoToDb, mapPatientProfileDtoToDb, mapCreateUserDtoToDb } from "../../utils/reverseMapper/adminService/adminService";

export class AdminService implements IAdminService {
  constructor(
    private _adminRepo: IAdminRepository,
    private _patientProfileRepo: IPatientProfileRepository,
    private _doctorProfileRepo: IDoctorProfileRepository
  ) {}

 

async getUserById(userId: string): Promise<IUserWithProfileResponse> {
  try {
      const user = await this._adminRepo.findById(userId);
      if(!user){
         throw new Error("User not Found");
      }
      let profile = null;
      if(!user) throw new Error("user not found");
      if(user.role === "user"){
         profile = await this._patientProfileRepo.findAll({patientId: userId});
      }else if(user.role === "doctor"){
         profile = await this._doctorProfileRepo.findAll({doctorId: userId});
      }
      
       return mapUserToDTO(user, profile);
  } catch (error) {
    if(error instanceof Error){
       throw error;
    }else{
       throw new Error("Failed to fetch user");
    }
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


// async getAllByRole(
//   role: string,
//   page = 1,
//   limit = 10,
//   search = "",
//   specialty = ""
// ) {
//   try {
   
//     const safePage = Math.max(1, page);
//     const safeLimit = Math.max(1, limit);
//     const skip = (safePage - 1) * safeLimit;
       
//     if (specialty === "") {
//       const [items, totalItems] = await Promise.all([
//         this._adminRepo.getAllByRole(role, safeLimit, skip, search),
//         this._adminRepo.countByRole(role),
//       ]);

//       const itemsWithProfiles = await Promise.all(
//         items.map(async (user) => {
//           const profile =
//             role === "doctor"
//               ? await this._doctorProfileRepo.findAll({ doctorId: user._id })
//               : await this._patientProfileRepo.findAll({ patientId: user._id });

          
//           return mapUserToDTO(user , profile);
//         })
//       );

//       return {
//         items: itemsWithProfiles,
//         currentPage: safePage,
//         totalPages: Math.ceil(totalItems / safeLimit),
//         totalItems,
//       };
//     }

//     if (role === "doctor" && specialty !== "") {
//       const profiles = await this._doctorProfileRepo.findAll({ specialization: specialty });

//       const matchedDoctors = await Promise.all(
//         profiles.map(async (profile) => {
//           const user = await this._adminRepo.findOne({ _id: profile.doctorId });

//           if (!user) return null;

//           const nameMatches = user.name
//             .toLowerCase()
//             .includes(search.trim().toLowerCase());

//           if (!nameMatches) return null;

         
//           return mapUserToDTO(user, [profile]);
//         })
//       );

//       const filtered = matchedDoctors.filter(Boolean) as IUserWithProfileResponse[];;
//       const paginated = filtered.slice(skip, skip + safeLimit);

//       return {
//         items: paginated,
//         currentPage: safePage,
//         totalPages: Math.ceil(filtered.length / safeLimit),
//         totalItems: filtered.length,
//       };
//     }

//     if (role === "user") {
//       const [items, totalItems] = await Promise.all([
//         this._adminRepo.getAllByRole(role, safeLimit, skip, search),
//         this._adminRepo.countByRole(role),
//       ]);

//       const itemsWithProfiles = await Promise.all(
//         items.map(async (user) => {
//           const profile = await this._patientProfileRepo.findAll({ patientId: user._id });

          
//           return mapUserToDTO(user, profile);
//         })
//       );

//       return {
//         items: itemsWithProfiles,
//         currentPage: safePage,
//         totalPages: Math.ceil(totalItems / safeLimit),
//         totalItems,
//       };
//     }

//     return { items: [], currentPage: 1, totalPages: 0, totalItems: 0 };
//   } catch (error) {
//     console.error(`Error fetching ${role}s:`, error);
//     throw new Error(`Failed to fetch ${role}s`);
//   }
// }



async getAllByRole(
  role: string,
  page = 1,
  limit = 10,
  search = "",
  specialty = ""
): Promise<{
  items: UserWithProfileResponseDTO[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}> {
  try {
    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, limit);
    const skip = (safePage - 1) * safeLimit;

    let items: any[] = [];
    let totalItems = 0;

    if (role === "doctor" && specialty !== "") {
      const profiles = await this._doctorProfileRepo.findAll({ specialization: specialty });
      const matchedDoctors = await Promise.all(
        profiles.map(async (profile) => {
          const user = await this._adminRepo.findOne({ _id: profile.doctorId });
          if (!user) return null;
          if (!user.name.toLowerCase().includes(search.trim().toLowerCase())) return null;
          return mapUserToDTO(user, [profile]);
        })
      );
      const filtered = matchedDoctors.filter(Boolean) as UserWithProfileResponseDTO[];
      items = filtered.slice(skip, skip + safeLimit);
      totalItems = filtered.length;
    } else {
      const [users, count] = await Promise.all([
        this._adminRepo.getAllByRole(role, safeLimit, skip, search),
        this._adminRepo.countByRole(role),
      ]);
      totalItems = count;
      items = await Promise.all(
        users.map(async (user) => {
          const profile =
            role === "doctor"
              ? await this._doctorProfileRepo.findAll({ doctorId: user._id })
              : await this._patientProfileRepo.findAll({ patientId: user._id });
          return mapUserToDTO(user, profile);
        })
      );
    }

    return {
      items,
      currentPage: safePage,
      totalPages: Math.ceil(totalItems / safeLimit),
      totalItems,
    };
  } catch (error) {
    console.error(`Error fetching ${role}s:`, error);
    throw new Error(`Failed to fetch ${role}s`);
  }
};




// async createUserOrDoctor(
//   { userData, profileData, files }: CreateUserOrDoctorInput
// ): Promise<{ message: string; userId: string }> {
//   try {
//     if (!userData.role || !["user", "doctor"].includes(userData.role)) {
//       throw new Error("Invalid role. Only 'user' or 'doctor' are allowed.");
//     }

   
//     if (userData.password) {
//       const saltRounds = 10;
//       userData.password = await bcrypt.hash(userData.password, saltRounds);
//     }

    
//     if (files?.photo?.[0]) {
//       const photoUrl = await uploadToCloudinary(files.photo[0].buffer, "profile_photos");
//       userData.photo = photoUrl; 
//     }

//     if (files?.signature?.[0] && userData.role === "doctor") {
//       const signatureUrl = await uploadToCloudinary(files.signature[0].buffer, "signatures");
//       userData.signature = signatureUrl; 
//     }

//     if (files?.proofDocument?.length && userData.role === "doctor") {
//       const proofUrls: string[] = [];
//       for (const file of files.proofDocument) {
//         const url = await uploadToCloudinary(file.buffer, "proof_documents");
//         proofUrls.push(url);
//       }
//       (profileData as Partial<IDoctorProfile>).proofDocuments = proofUrls;
//     }

   
//     const user = await this._adminRepo.create(userData);
//     const userId = user._id as unknown as string;

   
//     if (userData.role === "user") {
//       await this._patientProfileRepo.create({
//         patientId: new mongoose.Types.ObjectId(userId),
//         ...(profileData as Partial<IPatientProfile>),
//       });
//     } else if (userData.role === "doctor") {
//       await this._doctorProfileRepo.create({
//         doctorId: new mongoose.Types.ObjectId(userId),
//         ...(profileData as Partial<IDoctorProfile>),
//       });
//     }

//     return {
//       message: `${userData.role} created successfully`,
//       userId,
//     };
//   } catch (error) {
   
//     if (
//       error instanceof Error &&
//       (error as { code?: number; keyPattern?: Record<string, unknown> }).code === 11000 &&
//       (error as { keyPattern?: { email?: number } }).keyPattern?.email
//     ) {
//       throw new Error(`User with email ${userData.email} already exists`);
//     }

//     console.error("Error creating user/doctor:", error);
//     throw new Error("Failed to create user/doctor");
//   }
// }






async createUserOrDoctor({
  userData,
  profileData,
  files,
}: CreateUserOrDoctorInput): Promise<{ message: string; userId: string }> {
  try {
    if (!userData.role || !["user", "doctor"].includes(userData.role)) {
      throw new Error("Invalid role. Only 'user' or 'doctor' are allowed.");
    }

   
    if (userData.password) {
      const saltRounds = 10;
      userData.password = await bcrypt.hash(userData.password, saltRounds);
    }

   
    if (files?.photo?.[0]) {
      userData.photo = await uploadToCloudinary(files.photo[0].buffer, "profile_photos");
    }
    if (files?.signature?.[0] && userData.role === "doctor") {
      userData.signature = await uploadToCloudinary(files.signature[0].buffer, "signatures");
    }
    if (files?.proofDocument?.length && userData.role === "doctor") {
      const proofUrls: string[] = [];
      for (const file of files.proofDocument) {
        proofUrls.push(await uploadToCloudinary(file.buffer, "proof_documents"));
      }
      (profileData as UpdateDoctorProfileDTO).proofDocuments = proofUrls;
    }

    
    const userDb = mapCreateUserDtoToDb(userData);
    const user = await this._adminRepo.create(userDb);
    const userId = (user._id as mongoose.Types.ObjectId).toString();

   
    if (userData.role === "user") {
      const profileDb = mapPatientProfileDtoToDb(profileData as UpdatePatientProfileDTO);
      await this._patientProfileRepo.create({
        patientId: new mongoose.Types.ObjectId(userId),
        ...profileDb,
      });
    } else if (userData.role === "doctor") {
      const profileDb = mapDoctorProfileDtoToDb(profileData as UpdateDoctorProfileDTO);
      await this._doctorProfileRepo.create({
        doctorId: new mongoose.Types.ObjectId(userId),
        ...profileDb,
      });
    }

    return { message: `${userData.role} created successfully`, userId };
  } catch (error) {
 
      if (
        error instanceof Error &&
        (error as { code?: number; keyPattern?: Record<string, unknown> }).code === 11000 &&
        (error as { keyPattern?: { email?: number } }).keyPattern?.email
      ) {
        throw new Error(`User with email ${userData.email} already exists`);
      }

      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
  }
};




  
// async updateUserOrDoctor(
//   userId: string,
//   userData: Partial<IUser>,
//   profileData?: Partial<IPatientProfile> | Partial<IDoctorProfile>,
//   files?: UploadedFiles
// ): Promise<string> {
//   try{

//     const user = await this._adminRepo.findById(userId);
//     if (!user) throw new Error("User not found");

//     if (userData.password) {
//       const saltRounds = 10;
//       userData.password = await bcrypt.hash(userData.password, saltRounds);
//     }

//     if (files?.photo?.[0]) {
//       const photoUrl = await uploadToCloudinary(files.photo[0].buffer, "profile_photos");  
//       userData.photo = photoUrl;
//     }

//     if (files?.signature?.[0] && user.role === "doctor") {
//       const signatureUrl = await uploadToCloudinary(files.signature[0].buffer, "signatures"); 
//       userData.signature = signatureUrl;
//     }

//     if (files?.proofDocument?.length && user.role === "doctor") {
//       const proofUrls: string[] = [];
//       for (const file of files.proofDocument) {
//         const url = await uploadToCloudinary(file.buffer, "proof_documents");
//         proofUrls.push(url);
//       }
//       (profileData as Partial<IDoctorProfile>).proofDocuments = proofUrls;
//     }

 
//     await this._adminRepo.updateById(userId, userData);

//     const objectId = new mongoose.Types.ObjectId(userId);

//     if (user.role === "user" && profileData) {
//       const existingProfile = await this._patientProfileRepo.findByPatientId(objectId);
//       if (existingProfile) {
//         await this._patientProfileRepo.updateByPatientId(objectId, profileData as Partial<IPatientProfile>);
//       } else {
//         await this._patientProfileRepo.create({ patientId: objectId, ...(profileData as Partial<IPatientProfile>) });
//       }
//     } else if (user.role === "doctor" && profileData) {
//       const existingProfile = await this._doctorProfileRepo.findByDoctorId(objectId);
//       if (existingProfile) {
//         await this._doctorProfileRepo.updateByDoctorId(objectId, profileData as Partial<IDoctorProfile>);
//       } else {
//         await this._doctorProfileRepo.create({ doctorId: objectId, ...(profileData as Partial<IDoctorProfile>) });
//       }
//     }

//     return `${user.role} updated successfully`;
//  }catch(error){
//     if(error instanceof Error){
//        throw error;
//     }else{
//        throw new Error("Failed to update");
//     }
//  } 
// }






async updateUserOrDoctor(
  userId: string,
  userDTO: UpdateUserDTO,
  profileDTO?: UpdatePatientProfileDTO | UpdateDoctorProfileDTO,
  files?: UploadedFiles
): Promise<string>{
  const user = await this._adminRepo.findById(userId);
  if (!user) throw new Error("User not found");

  
  if (userDTO.password) {
    const saltRounds = 10;
    userDTO.password = await bcrypt.hash(userDTO.password, saltRounds);
  }

 
  if (files?.photo?.[0]) {
    userDTO.photo = await uploadToCloudinary(files.photo[0].buffer, "profile_photos");
  }
  if (files?.signature?.[0] && user.role === "doctor") {
    userDTO.signature = await uploadToCloudinary(files.signature[0].buffer, "signatures");
  }
  if (files?.proofDocument?.length && user.role === "doctor") {
    const proofUrls: string[] = [];
    for (const file of files.proofDocument) {
      proofUrls.push(await uploadToCloudinary(file.buffer, "proof_documents"));
    }
    (profileDTO as UpdateDoctorProfileDTO).proofDocuments = proofUrls;
  }

 
  const userData = mapUserDtoToDb(userDTO);
  await this._adminRepo.updateById(userId, userData);

  const objectId = new mongoose.Types.ObjectId(userId);

 
  if (user.role === "user" && profileDTO) {
    const profileData = mapPatientProfileDtoToDb(profileDTO as UpdatePatientProfileDTO);
    const existingProfile = await this._patientProfileRepo.findByPatientId(objectId);
    if (existingProfile) {
      await this._patientProfileRepo.updateByPatientId(objectId, profileData);
    } else {
      await this._patientProfileRepo.create({ patientId: objectId, ...profileData });
    }
  } else if (user.role === "doctor" && profileDTO) {
    const profileData = mapDoctorProfileDtoToDb(profileDTO as UpdateDoctorProfileDTO);
    const existingProfile = await this._doctorProfileRepo.findByDoctorId(objectId);
    if (existingProfile) {
      await this._doctorProfileRepo.updateByDoctorId(objectId, profileData);
    } else {
      await this._doctorProfileRepo.create({ doctorId: objectId, ...profileData });
    }
  }

  return `${user.role} updated successfully`;
};






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
      await this._adminRepo.updateById(userId, { isBlocked });

      
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
