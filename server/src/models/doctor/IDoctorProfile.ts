
import mongoose, { Document } from "mongoose";

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
}