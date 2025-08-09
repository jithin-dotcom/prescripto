

import mongoose, { Document } from "mongoose";

export interface IPayment extends Document {
  appointmentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed"; 
  paymentMethod?: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}
