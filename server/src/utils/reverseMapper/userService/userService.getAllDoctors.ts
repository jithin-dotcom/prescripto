


import { GetAllDoctorsUserDTO, GetAllDoctorsDoctorProfileDTO } from "./IUserService.getAllDoctors"; 
import { Document } from "mongoose";
import { IDoctorProfile } from "../../../models/doctor/IDoctorProfile";

export function mapGetAllDoctorsUserDTO(user: Document & any): GetAllDoctorsUserDTO {
  const obj = user.toObject();
  return {
    id: obj._id.toString(),
    name: obj.name,
    email: obj.email,
    role: obj.role,
    avatar: obj.avatar,
    isVerified: obj.isVerified,
    photo: obj.photo,
    signature: obj.signature,
    isBlocked: obj.isBlocked,
  };
}

export function mapGetAllDoctorsDoctorProfileDTO(profile: IDoctorProfile | null): GetAllDoctorsDoctorProfileDTO | null {
  if (!profile) return null;
  const obj = profile.toObject();
  return {
    id: obj._id.toString(),
    educationDetails: obj.educationDetails,
    specialization: obj.specialization,
    registrationNumber: obj.registrationNumber,
    registrationYear: obj.registrationYear,
    yearOfExperience: obj.yearOfExperience,
    signature: obj.signature,
    proofDocuments: obj.proofDocuments,
    fee: obj.fee,
    about: obj.about,
    averageRating: obj.averageRating,
    ratingCount: obj.ratingCount,
    availability: obj.availability,
    slotDuration: obj.slotDuration,
  };
}
