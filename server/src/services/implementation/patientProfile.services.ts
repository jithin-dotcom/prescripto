

import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";
import { IPatientProfileService } from "../interface/IPatientService";
import { IUserRepository } from "../../repositories/interface/IUserRepository";

import {uploadToCloudinary} from "../../config/cloudinary";
import { PatientProfileDTO } from "../../utils/reverseMapper/patientProfileServices/IPatientProfileService";
import { toPatientProfilePersistence } from "../../utils/reverseMapper/patientProfileServices/patientService";


export  class PatientProfileService implements IPatientProfileService{
    constructor( 
      private _patientRepo : IPatientProfileRepository,
      private _userRepo: IUserRepository
    ) {}

 


    async createPatientProfile(
      patientId: string,
      data: PatientProfileDTO
    ): Promise<{ message: string }> {
      try {
        if (!patientId) {
          throw new Error("Patient ID is required");
        }

        const existing = await this._patientRepo.findByPatientId(patientId);
        if (existing) {
          throw new Error("Profile already exists");
        }

    
        const profileData = toPatientProfilePersistence(patientId, data);

        await this._patientRepo.create(profileData);

        return { message: "Successfully Created Profile" };
      } catch (error) {
        console.error("Error in creating profile:", error);
        throw error;
      }
    }


    async editPatientProfile(patientId: string, data: PatientProfileDTO): Promise<{message: string}> {
       try {
         const existing = await this._patientRepo.findByPatientId(patientId);
         if (!existing) {
           throw new Error("Profile not found");
         }

     
         const profileData = toPatientProfilePersistence(patientId, data);

         const updated = await this._patientRepo.create(profileData);
         if (!updated) {
           throw new Error("Failed to update profile");
         }

         return { message: "Profile Edited successfully"};

       }catch (error) {
         console.error("Error in editing profile: ", error);
         throw error;
       }
    }



  async uploadProfilePhoto(userId: string, file: Express.Multer.File) {
    try {

       const url = await uploadToCloudinary(file.buffer, "telecare/profile_photos");
       const updatedUser = await this._userRepo.updatePhoto(userId, url);
       return updatedUser;
      
    }catch (error) {
      console.error("Error uploading profile photo:", error);
      throw new Error("Failed to upload profile photo");
    }
  }

}