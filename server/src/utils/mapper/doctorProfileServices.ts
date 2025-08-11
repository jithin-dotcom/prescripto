

import mongoose from "mongoose";
import { IDoctorProfileDashboard } from "../../models/doctor/IDoctorProfile";
import { IUser } from "../../types/user.type";

export interface IDoctorProfileDashboardClean {
  _id: string;
  doctorId: {
    _id: string;
    name: string;
    email: string;
    role: "user" | "doctor" | "admin";
    isVerified?: boolean;
    authProvider?: "local" | "google";
    isBlocked: boolean;
    createdAt: string;
    photo?: string;
  };
  educationDetails: string;
  specialization: string;
  registrationNumber: string;
  registrationYear: string;
  yearOfExperience: number;
  proofDocuments: string[];
  fee: number;
  about: string;
  createdAt: string;
  averageRating?: number;
  ratingCount?: number;
  availability?: any; 
  slotDuration?: number;
}



export function mapDoctorProfiles(
  data: IDoctorProfileDashboard[]
): IDoctorProfileDashboardClean[] {
  return data
    .filter((profile) => profile && profile.doctorId) 
    .map((profile) => ({
      _id: (profile._id as mongoose.Types.ObjectId).toString(),
      doctorId: {
        _id: ((profile.doctorId as any)?._id ?? "").toString(),
        name: (profile.doctorId as IUser)?.name ?? "",
        email: (profile.doctorId as IUser)?.email ?? "",
        role: (profile.doctorId as IUser)?.role ?? "doctor",
        isVerified: (profile.doctorId as IUser)?.isVerified ?? false,
        authProvider: (profile.doctorId as IUser)?.authProvider ?? "local",
        isBlocked: (profile.doctorId as IUser)?.isBlocked ?? false,
        createdAt: ((profile.doctorId as any)?.createdAt instanceof Date
          ? (profile.doctorId as any).createdAt.toISOString()
          : ""),
        photo: (profile.doctorId as IUser)?.photo ?? undefined,
      },
      educationDetails: profile.educationDetails ?? "",
      specialization: profile.specialization ?? "",
      registrationNumber: profile.registrationNumber ?? "",
      registrationYear: profile.registrationYear ?? "",
      yearOfExperience: profile.yearOfExperience ?? 0,
      proofDocuments: profile.proofDocuments ?? [],
      fee: profile.fee ?? 0,
      about: profile.about ?? "",
      createdAt: profile.createdAt instanceof Date
        ? profile.createdAt.toISOString()
        : "",
      averageRating: profile.averageRating ?? 0,
      ratingCount: profile.ratingCount ?? 0,
      availability: profile.availability ?? [],
      slotDuration: profile.slotDuration ?? undefined,
    }));
}
