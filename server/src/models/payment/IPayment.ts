

// import mongoose, { Document} from "mongoose";

// export interface IPayment extends Document {
//   appointmentId: mongoose.Types.ObjectId;
//   userId: mongoose.Types.ObjectId;
//   doctorId: mongoose.Types.ObjectId;
//   amount: number;
//   currency: string;
//   status: "pending" | "succeeded" | "failed" | "refunded";
//   paymentMethod?: string;
//   stripePaymentIntentId?: string;
//   stripeCustomerId?: string;
//   stripeRefundId?: string;
//   errorMessage?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }



import mongoose, { Document } from "mongoose";

export interface IPayment extends Document {
  appointmentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: "created" | "paid" | "failed"; 
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}
