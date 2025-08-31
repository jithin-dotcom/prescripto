


import { GetProfileUserDTO, GetProfilePatientProfileDTO, GetProfileDoctorProfileDTO } from "./IUserServiceGetUser";
import { Document } from "mongoose";
import { IPatientProfile } from "../../../models/patient/IPatientProfile";
import { IDoctorProfile } from "../../../models/doctor/IDoctorProfile";

export function mapGetProfileUserDTO(user: Document & any): GetProfileUserDTO {
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

export function mapGetProfilePatientProfileDTO(profile: IPatientProfile | null): GetProfilePatientProfileDTO | null {
  if (!profile) return null;
  const obj = profile.toObject();
  return {
    id: obj._id.toString(),
    dateOfBirth: obj.dateOfBirth,
    gender: obj.gender,
    houseName: obj.houseName,
    city: obj.city,
    state: obj.state,
    country: obj.country,
    pin: obj.pin,
  };
}

export function mapGetProfileDoctorProfileDTO(profile: IDoctorProfile | null): GetProfileDoctorProfileDTO | null {
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
