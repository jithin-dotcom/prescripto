


import { UpdateUserDTO, UpdateDoctorProfileDTO, UpdatePatientProfileDTO, CreateUserDTO, UserWithProfileResponseDTO } from "./IAdminService";

import { IUser } from "../../../types/user.type";
import { IPatientProfile } from "../../../models/patient/IPatientProfile";
import { IDoctorProfile } from "../../../models/doctor/IDoctorProfile";
import mongoose, { Document } from "mongoose";

export const mapUserDtoToDb = (dto: UpdateUserDTO): Partial<IUser> => ({
  name: dto.name,
  email: dto.email,
  password: dto.password,
  photo: dto.photo,
  signature: dto.signature
});

export const mapPatientProfileDtoToDb = (dto: UpdatePatientProfileDTO): Partial<IPatientProfile> => ({
  ...dto
});

export const mapDoctorProfileDtoToDb = (dto: UpdateDoctorProfileDTO): Partial<IDoctorProfile> => ({
  ...dto
});





export const mapCreateUserDtoToDb = (dto: CreateUserDTO): Partial<IUser> => ({
  name: dto.name,
  email: dto.email,
  password: dto.password,
  role: dto.role,
  photo: dto.photo,
  signature: dto.signature,
});

// export const mapPatientProfileDtoToDb = (dto: CreatePatientProfileDTO) => ({ ...dto });

// export const mapDoctorProfileDtoToDb = (dto: CreateDoctorProfileDTO) => ({ ...dto });




export const mapUserToDTOResponse = (
  user: IUser & Document,
  profile: (IDoctorProfile & IPatientProfile)[] | null
): UserWithProfileResponseDTO => ({
  id: (user._id as mongoose.Types.ObjectId).toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  isVerified: user.isVerified,
  isBlocked: user.isBlocked,
  authProvider: user.authProvider,
  photo: user.photo,
  signature: user.signature,
  profile: profile ? profile.map((p) => mapProfileToDTO(user.role, p)) : null,
});

const mapProfileToDTO = (role: string, profile: IDoctorProfile & IPatientProfile): UpdateDoctorProfileDTO | UpdatePatientProfileDTO => {
  if (role === "doctor") {
    return {
      educationDetails: profile.educationDetails,
      specialization: profile.specialization,
      registrationNumber: profile.registrationNumber,
      registrationYear: profile.registrationYear,
      yearOfExperience: profile.yearOfExperience,
      signature: profile.signature,
      proofDocuments: profile.proofDocuments,
      fee: profile.fee,
      about: profile.about,
      availability: profile.availability,
      slotDuration: profile.slotDuration,
    };
  } else {
    return {
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
      houseName: profile.houseName,
      city: profile.city,
      state: profile.state,
      country: profile.country,
      pin: profile.pin,
    };
  }
};