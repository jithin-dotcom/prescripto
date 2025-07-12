

import mongoose,{ Document } from "mongoose";

export interface IAppointment extends Document {
    
    userId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    transactionId?: mongoose.Types.ObjectId;
    date: string;
    time: string;
    status: "pending" | "confirmed" | "cancelled" | "completed";
    createdAt: Date;
    updatedAt: Date; 
}