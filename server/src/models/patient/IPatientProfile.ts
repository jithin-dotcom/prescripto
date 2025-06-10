
import mongoose, { Document } from "mongoose";

export interface IPatientProfile extends Document {
    patientId: mongoose.Types.ObjectId;
    dateOfBirth: string;
    gender: "male" | "female" | "others";
    houseName: string;
    city: string;
    state: string;
    country: string;
    pin: number;
    createdAt: Date;
    updatedAt: Date;
}