
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import { IPatientProfileRepository } from "../../repositories/interface/IPatientProfileRepository";
import { IPatientProfileService } from "../interface/IPatientService";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import mongoose from "mongoose";
import {uploadToCloudinary} from "../../config/cloudinary";

export  class PatientProfileService implements IPatientProfileService{
    constructor( 
      private patientRepo : IPatientProfileRepository,
      private userRepo: IUserRepository
    ) {}

 
    async createPatientProfile(
       patientId: string,
       data: Partial<IPatientProfile>
     ): Promise<IPatientProfile> {
        try {
           if (!patientId) {
               throw new Error("Patient ID is required");
           }

           const existing = await this.patientRepo.findByPatientId(patientId);
           if (existing) {
               throw new Error("Profile already exists");
           }

           const profileData = {
               ...data,
               patientId: new mongoose.Types.ObjectId(patientId),
           };

           const createProfile = await this.patientRepo.create(profileData);
           return createProfile;

        }catch (error) {
           console.error("Error in creating profile:", error);
           throw error;
       }
    }


    async editPatientProfile(patientId: string, data: Partial<IPatientProfile>): Promise<IPatientProfile> {
       try {
         const existing = await this.patientRepo.findByPatientId(patientId);
         if (!existing) {
           throw new Error("Profile not found");
         }

         const updated = await this.patientRepo.updateByPatientId(patientId, data);
         if (!updated) {
           throw new Error("Failed to update profile");
         }

         return updated;

       }catch (error) {
         console.error("Error in editing profile: ", error);
         throw error;
       }
    }

    async deletePatientProfile(patientId: string): Promise<void> {
        try {
            const existing = await this.patientRepo.findByPatientId(patientId);
            if(!existing){
                throw new Error("Patient profile not found");
            }
            await this.patientRepo.deleteById(existing._id  as mongoose.Types.ObjectId);

        } catch (error) {
            console.error("error deleting the patient : ",error);
            throw error;
        }
    }

    async uploadProfilePhoto(userId: string, file: Express.Multer.File) {
    try {


       const url = await uploadToCloudinary(file.buffer, "telecare/profile_photos");
       const updatedUser = await this.userRepo.updatePhoto(userId, url);
       return updatedUser;
      
    } catch (error: any) {
      console.error("Error uploading profile photo:", error);
      throw new Error("Failed to upload profile photo");
    }
  }



}