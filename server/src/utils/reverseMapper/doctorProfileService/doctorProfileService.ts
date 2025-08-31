


import mongoose from "mongoose";
import { CreateDoctorProfileDTO } from "./IDoctorProfileService";
import { IDoctorProfile } from "../../../models/doctor/IDoctorProfile"; 

export const mapCreateDoctorProfileDTOToEntity = (
  doctorId: string,
  dto: CreateDoctorProfileDTO
): Partial<IDoctorProfile> => {
  return {
    doctorId: new mongoose.Types.ObjectId(doctorId),
    educationDetails: dto.educationDetails,
    specialization: dto.specialization,
    registrationNumber: dto.registrationNumber,
    registrationYear: dto.registrationYear,
    yearOfExperience: dto.yearOfExperience,
    signature: dto.signature,
    proofDocuments: dto.proofDocuments,
    fee: dto.fee,
    about: dto.about,
    availability: dto.availability,
    slotDuration: dto.slotDuration,
  };
};
