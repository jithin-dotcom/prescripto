

import mongoose, { Document } from "mongoose";
import { IUser } from "../../types/user.type";

export interface ITimeBlock {
  from: string;
  to: string;
}

export interface IAvailabilitySlot {
  day: string;
  slots: ITimeBlock[]; 
}

export interface IDoctorProfile extends Document {
  doctorId: mongoose.Types.ObjectId;
  educationDetails: string;
  specialization: string;
  registrationNumber: string;
  registrationYear: string;
  yearOfExperience: number;
  proofDocuments: string[];
  fee: number;
  about: string;
  createdAt: Date;
  updatedAt: Date;
  averageRating?: number;
  ratingCount?: number;

  availability?: IAvailabilitySlot[];
  slotDuration?: number;
}



export interface IDoctorProfileDashboard extends Document {
  doctorId: IUser;
  educationDetails: string;
  specialization: string;
  registrationNumber: string;
  registrationYear: string;
  yearOfExperience: number;
  proofDocuments: string[];
  fee: number;
  about: string;
  createdAt: Date;
  updatedAt: Date;
  averageRating?: number;
  ratingCount?: number;

  availability?: IAvailabilitySlot[];
  slotDuration?: number;
}




export interface IDoctorProfileDashboardClean {
  _id: string;
  doctorId: {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    authProvider: string;
    isBlocked: boolean;
    createdAt: string;
    photo: string;
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
  availability?: IAvailabilitySlot[];
  slotDuration?: number;
  averageRating?: number;
  ratingCount?: number;
}
