

import mongoose,{ Document } from "mongoose";

export interface IWallet extends Document {
     userId: mongoose.Types.ObjectId;
     role: "user" | "doctor";
     balance: number;
     createdAt: Date;
     updatedAt: Date;
} 