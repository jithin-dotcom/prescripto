

import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import { IDoctorProfileService } from "../interface/IDoctorService";
import { mapDoctorProfiles } from "../../utils/mapper/doctorProfileServices";
import { IDoctorProfileDashboardClean } from "../../utils/mapper/doctorProfileServices";
import { CreateDoctorProfileDTO } from "../../utils/reverseMapper/doctorProfileService/IDoctorProfileService";
import { mapCreateDoctorProfileDTOToEntity } from "../../utils/reverseMapper/doctorProfileService/doctorProfileService";


export  class DoctorProfileService implements IDoctorProfileService{
    constructor( private _DoctorRepo : IDoctorProfileRepository) {}




  async createDoctorProfile(
    doctorId: string,
    data: CreateDoctorProfileDTO
  ): Promise<{ message: string }> {
    try {
      if (!doctorId) {
        throw new Error("Doctor ID is required");
      }

      const existing = await this._DoctorRepo.findByDoctorId(doctorId);
      if (existing) {
        throw new Error("Profile already exists");
      }

      const profileData = mapCreateDoctorProfileDTOToEntity(doctorId, data);

      await this._DoctorRepo.create(profileData);
      return { message: "Profile created successfully" };
    } catch (error) {
      console.error("Error in creating profile:", error);
      throw error;
    }
  }


    async editDoctorProfile(DoctorId: string, data: Partial<CreateDoctorProfileDTO>): Promise<{message: string}> {
       try {
         const existing = await this._DoctorRepo.findByDoctorId(DoctorId);
         if (!existing) {
           throw new Error("Profile not found");
         }

         const updated = await this._DoctorRepo.updateByDoctorId(DoctorId, data);
         if (!updated) {
           throw new Error("Failed to update profile");
         }

         return {message: "Updated successfully"};

       }catch (error) {
         console.error("Error in editing profile: ", error);
         throw error;
       }
    }




async findDoctorProfileWithRatings(): Promise<IDoctorProfileDashboardClean[]> {
  try {
    const doctorProfiles = await this._DoctorRepo.findTopDoctorsWithRating();

    const nonNullProfiles = doctorProfiles.filter(
      (profile): profile is NonNullable<typeof profile> => profile !== null && profile.doctorId.isVerified === true
    );

    const topFourProfile = nonNullProfiles.slice(0,4);

    return mapDoctorProfiles(topFourProfile);
  } catch (error) {
    console.error("Error in findDoctorProfileWithRatings:", error);
    throw error; 
  }
}


}