
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