

import { IPayout } from "../../models/payout/IPayout";
import mongoose from "mongoose";

export interface RazorpayOrderInput {
  appointmentId: string;
  userId: string;
  doctorId: string;
  amount: number;
}

export interface IRazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

export interface IPaymentService {
  createRazorpayOrder(data: RazorpayOrderInput): Promise<IRazorpayOrderResponse>;
  verifyPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<{ success: boolean; message: string }>;

  downloadRecept(appointmentId: string): Promise<Buffer>;
  generateReceiptPDF(data: any): Promise<Buffer>;
  createPayout(doctorId: string, amount: number, reason: string): Promise<{message: string}>;
  // getPayout(): Promise<IPayout[] | []>;
  // getDoctorPayout(doctorId: string): Promise<IPayout[] | []>;
  getPayout(page: number, limit: number): Promise<{ payouts: IPayoutClean[] | [], total: number, totalPages: number }>;
  getDoctorPayout(doctorId: string, page: number, limit: number): Promise<{ payouts: IPayoutClean[] | [], total: number, totalPages: number }>;
  // createPayout(doctorId: string, amount: number, reason: string): Promise<IPayout>;
  initiatePayout(payoutId: string, amount: number, doctorId: string): Promise<void>;
}














export interface IDoctorBasic {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  authProvider: string;
  isBlocked: boolean;
  createdAt: string; 
  photo?: string;
}

export interface IPayoutClean {
  _id: string;
  doctorId: IDoctorBasic;
  amount: number;
  status: string;
  reason: string;
  requestedAt: string;
  createdAt: string;
}

export interface IPayoutDocPopulated {
  _id: mongoose.Types.ObjectId;
  doctorId: {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
    authProvider: string;
    isBlocked: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    password?: string;
    photo?: string;
  };
  amount: number;
  status: string;
  reason: string;
  requestedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
