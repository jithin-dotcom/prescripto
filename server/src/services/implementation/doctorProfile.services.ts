
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import { IDoctorProfileService } from "../interface/IDoctorService";
import mongoose from "mongoose";

export  class DoctorProfileService implements IDoctorProfileService{
    constructor( private _DoctorRepo : IDoctorProfileRepository) {}

 
    async createDoctorProfile(
       DoctorId: string,
       data: Partial<IDoctorProfile>
     ): Promise<IDoctorProfile> {
        try {
           if (!DoctorId) {
               throw new Error("Doctor ID is required");
           }

           const existing = await this._DoctorRepo.findByDoctorId(DoctorId);
           if (existing) {
               throw new Error("Profile already exists");
           }

           const profileData = {
               ...data,
               DoctorId: new mongoose.Types.ObjectId(DoctorId),
           };

           const createProfile = await this._DoctorRepo.create(profileData);
           return createProfile;

        }catch (error) {
           console.error("Error in creating profile:", error);
           throw error;
       }
    }


    async editDoctorProfile(DoctorId: string, data: Partial<IDoctorProfile>): Promise<IDoctorProfile> {
       try {
         const existing = await this._DoctorRepo.findByDoctorId(DoctorId);
         if (!existing) {
           throw new Error("Profile not found");
         }

         const updated = await this._DoctorRepo.updateByDoctorId(DoctorId, data);
         if (!updated) {
           throw new Error("Failed to update profile");
         }

         return updated;

       }catch (error) {
         console.error("Error in editing profile: ", error);
         throw error;
       }
    }

    async deleteDoctorProfile(DoctorId: string): Promise<void> {
        try {
            const existing = await this._DoctorRepo.findByDoctorId(DoctorId);
            if(!existing){
                throw new Error("Doctor profile not found");
            }
            await this._DoctorRepo.deleteById(existing._id  as mongoose.Types.ObjectId);

        } catch (error) {
            console.error("error deleting the Doctor : ",error);
            throw error;
        }
    }

}