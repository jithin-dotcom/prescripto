


import mongoose, { Document } from "mongoose";

export interface IDoctorRating extends Document {
  doctorId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  appointmentId: mongoose.Types.ObjectId;
  rating: number; 
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}
