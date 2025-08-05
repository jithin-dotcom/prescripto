
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