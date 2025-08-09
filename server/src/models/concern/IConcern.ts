
import mongoose, { Document } from "mongoose";

export interface IConcern extends Document{

  appointmentId: string | mongoose.Types.ObjectId;
  doctorId: string | mongoose.Types.ObjectId;
  userId: string | mongoose.Types.ObjectId;
  doctorName?: string; 
  title: string;
  description: string;
  status: "pending" | "resolved" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}








export interface IConcernDocPopulated extends Document {
  _id: mongoose.Types.ObjectId;
  appointmentId: {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    appointmentNo: number;
    day: string;
    time: string;
    status: string;
    fee: number;
    payment: string;
    createdAt: Date;
    updatedAt: Date;
  };
  userId: {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    authProvider: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    photo: string;
  };
  doctorId: {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    authProvider: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    photo: string;
  };
  doctorName?: string;
  title: string;
  description: string;
  status: "pending" | "resolved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}