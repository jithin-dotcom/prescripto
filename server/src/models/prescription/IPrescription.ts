
import mongoose,{ Document } from "mongoose";

export interface IPrescription extends Document {
  appointmentId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  diagnosis: string;
  notes?: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }[];
  followUpDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}








export interface IUserBasic {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  authProvider: string;
  photo?: string;
  signature?: string;
  createdAt: string;
}

export interface IAppointmentBasic {
  _id: string;
  appointmentNo: number;
  doctorId: string;
  userId: string;
  day: string;
  time: string;
  status: string;
  payment: string;
  fee: number;
  createdAt: string;
  updatedAt: string;
}

export interface IMedicine {
  _id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface IPrescriptionClean {
  _id: string;
  appointmentId: IAppointmentBasic;
  doctorId: IUserBasic;
  patientId: IUserBasic;
  diagnosis: string;
  followUpDate?: string;
  notes?: string;
  medicines: IMedicine[];
  createdAt: string;
  updatedAt: string;
}

export interface IPrescriptionDocPopulated {
  _id: mongoose.Types.ObjectId;
  appointmentId: {
    _id: mongoose.Types.ObjectId;
    appointmentNo: number;
    doctorId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    day: string;
    time: string;
    status: string;
    payment: string;
    fee: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
  doctorId: {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    isBlocked: boolean;
    authProvider: string;
    createdAt: Date;
    updatedAt: Date;
    photo?: string;
    signature?: string;
    __v: number;
    password?: string;
  };
  patientId: {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    isBlocked: boolean;
    authProvider: string;
    createdAt: Date;
    updatedAt: Date;
    photo?: string;
    __v: number;
    password?: string;
  };
  diagnosis: string;
  followUpDate?: Date;
  notes?: string;
  medicines: {
    _id: mongoose.Types.ObjectId;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}