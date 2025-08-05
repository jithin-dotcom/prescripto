



import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  authProvider: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  isBlocked: boolean;
  photo: string;
}

export interface IPayoutRequest  {
  _id: string;
  doctorId: IUser; 
  amount: number; 
  status: "pending" | "approved" | "rejected" | "processed" | "failed";
  reason: string;
  requestedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}