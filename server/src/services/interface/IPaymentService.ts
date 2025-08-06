

import { IPayout } from "../../models/payout/IPayout";

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
  createPayout(doctorId: string, amount: number, reason: string): Promise<IPayout>;
  // getPayout(): Promise<IPayout[] | []>;
  // getDoctorPayout(doctorId: string): Promise<IPayout[] | []>;
  getPayout(page: number, limit: number): Promise<{ payouts: IPayout[] | [], total: number, totalPages: number }>;
  getDoctorPayout(doctorId: string, page: number, limit: number): Promise<{ payouts: IPayout[] | [], total: number, totalPages: number }>;
  createPayout(doctorId: string, amount: number, reason: string): Promise<IPayout>;
  initiatePayout(payoutId: string, amount: number, doctorId: string): Promise<void>;
}
