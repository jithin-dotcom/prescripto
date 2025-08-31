


import { UserDTO, DoctorProfileDTO, PatientProfileDTO } from "./IUserService";
import { IUser } from "../../../types/user.type";
import { IPatientProfile } from "../../../models/patient/IPatientProfile";
import { IDoctorProfile } from "../../../models/doctor/IDoctorProfile";
import mongoose from "mongoose";

export function mapUserToDTO(user: IUser & { _id: any }): UserDTO {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    isVerified: user.isVerified,
    photo: user.photo,
    signature: user.signature,
    isBlocked: user.isBlocked,
    password: user.password,
  };
}



export function mapPatientProfileToDTO(profile: IPatientProfile & { _id: any }): PatientProfileDTO {
  return {
    patientId: profile.patientId.toString(),
    dateOfBirth: profile.dateOfBirth,
    gender: profile.gender,
    houseName: profile.houseName,
    city: profile.city,
    state: profile.state,
    country: profile.country,
    pin: profile.pin,
  };
}



export function mapDoctorProfileToDTO(profile: IDoctorProfile & { _id: any }): DoctorProfileDTO {
  return {
    doctorId: profile.doctorId.toString(),
    educationDetails: profile.educationDetails,
    specialization: profile.specialization,
    registrationNumber: profile.registrationNumber,
    registrationYear: profile.registrationYear,
    yearOfExperience: profile.yearOfExperience,
    signature: profile.signature,
    proofDocuments: profile.proofDocuments,
    fee: profile.fee,
    about: profile.about,
    averageRating: profile.averageRating,
    ratingCount: profile.ratingCount,
    availability: profile.availability,
    slotDuration: profile.slotDuration,
  };
}




export function mapPatientProfileDTOToPersistence(
  dto: Partial<PatientProfileDTO>,
  userId: string
): Partial<IPatientProfile> {
  return {
    ...dto,
    patientId: new mongoose.Types.ObjectId(userId),
  };
}

export function mapDoctorProfileDTOToPersistence(
  dto: Partial<DoctorProfileDTO>,
  userId: string
): Partial<IDoctorProfile> {
  return {
    ...dto,
    doctorId: new mongoose.Types.ObjectId(userId),
  };
}