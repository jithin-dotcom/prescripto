

import mongoose,{ Document } from "mongoose";
import { IDoctorUser } from "../../services/interface/IAppointmentService";


export interface IPatientUser {
  _id: mongoose.Types.ObjectId;
   name: string;
   email: string;
   photo: string;
   isVerified: boolean;
   isBlocked: boolean;
}

export interface IAppointment extends Document {
    
    userId: mongoose.Types.ObjectId | IPatientUser;
    doctorId: mongoose.Types.ObjectId | IDoctorUser;
    transactionId?: mongoose.Types.ObjectId;
    day: string;
    time: string;
    fee?: number;
    appointmentNo: number;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    payment: "paid" | "not paid" | "refund";
    method: string;
    createdAt: Date;
    updatedAt: Date; 
}