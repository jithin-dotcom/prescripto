import mongoose from "mongoose";


export interface CallLogDTO {
  doctorId:  mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  appointmentId?: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  duration: number;
  callType: "video" | "audio";
  callStatus: "completed" | "dropped" | "cancelled";
}




export interface WalletDTO {
  id: string;
  userId: mongoose.Types.ObjectId;
  role: "user" | "doctor";
  balance: number;
  expense?: number;
  createdAt: Date;
  updatedAt: Date;
}




export interface WalletHistoryInputDTO {
  walletId: string;
  appointmentId: string;
}
