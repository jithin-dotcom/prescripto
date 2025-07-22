
import mongoose, { Document } from "mongoose";

export interface ICallLog extends Document {
    doctorId: mongoose.Types.ObjectId;
    patientId: mongoose.Types.ObjectId;
    appointmentId: mongoose.Types.ObjectId;
    startTime: Date;
    endTime: Date;
    duration: number;
    callType: "video" | "audio";
    callStatus: "completed" | "dropped" | "cancelled";
    createdAt: Date;
    updateAt: Date;

}