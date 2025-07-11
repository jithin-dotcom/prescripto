

import mongoose, { Document} from "mongoose";

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    doctorId: mongoose.Types.ObjectId;
    appointmentId: mongoose.Types.ObjectId;
    transactionId: string;
    amount: number;
    status: "pending" | "success" | "failed" | "cancelled";
    method: string;
    createdAt: Date;
    updatedAt: Date;
}