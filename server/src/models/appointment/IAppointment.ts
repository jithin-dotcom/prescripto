

import mongoose,{ Document } from "mongoose";
import { IDoctorUser } from "../../services/interface/IAppointmentService";



export interface IAppointment extends Document {
    
    userId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId | IDoctorUser;
    transactionId?: mongoose.Types.ObjectId;
    day: string;
    time: string;
    fee?: number;
    appointmentNo: number;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    payment: "paid" | "not paid";
    createdAt: Date;
    updatedAt: Date; 
}