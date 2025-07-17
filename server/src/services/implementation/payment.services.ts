// import Razorpay from "razorpay";
// import crypto from "crypto";
// import { IPaymentService, RazorpayOrderInput, IRazorpayOrderResponse } from "../interface/IPaymentService";
// import { IPaymentRepository } from "../../repositories/interface/IPaymentRepository";
// import { IPayment } from "../../models/payment/IPayment";
// import mongoose from "mongoose";
// import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";

// export class PaymentService implements IPaymentService {
//   constructor(
//     private _paymentRepo: IPaymentRepository,
//     private _razorpayInstance: Razorpay,
//     private _appointmentRepo: IAppointmentRepository
//   ) {}

//   async createRazorpayOrder(data: RazorpayOrderInput): Promise<IRazorpayOrderResponse> {
//     const amountInPaise = data.amount * 100;

//     const order = await this._razorpayInstance.orders.create({
//       amount: amountInPaise,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     });

//     await this._paymentRepo.create({
//       appointmentId: new mongoose.Types.ObjectId(data.appointmentId),
//       userId: new mongoose.Types.ObjectId(data.userId),
//       doctorId: new mongoose.Types.ObjectId(data.doctorId),
//       amount: data.amount,
//       currency: "INR",
//       status: "created",
//       razorpayOrderId: order.id,
//     });

//     return {
//       id: order.id,
//       amount: Number(order.amount),
//       currency: order.currency,
//       status: order.status,
//     };
//   }

//   async verifyPaymentSignature(
//     razorpayOrderId: string,
//     razorpayPaymentId: string,
//     razorpaySignature: string
//   ): Promise<{ success: boolean; message: string }> {
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
//       .update(`${razorpayOrderId}|${razorpayPaymentId}`)
//       .digest("hex");

//     const payment = await this._paymentRepo.findByRazorpayOrderId(razorpayOrderId);
//     if (!payment) {
//       return { success: false, message: "Payment not found" };
//     }

//     if (expectedSignature === razorpaySignature) {
//       await this._paymentRepo.updateById(payment._id as string, {
//         razorpayPaymentId,
//         razorpaySignature,
//         status: "paid",
//       });
     
//       return { success: true, message: "Payment verified successfully" };
//     } else {
//       await this._paymentRepo.updateById(payment._id as string, {
//         status: "failed",
//         errorMessage: "Invalid signature",
//       });
//       return { success: false, message: "Invalid signature" };
//     }
//   }
// }




import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";

import { IPaymentService, RazorpayOrderInput, IRazorpayOrderResponse } from "../interface/IPaymentService";
import { IPaymentRepository } from "../../repositories/interface/IPaymentRepository";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";

export class PaymentService implements IPaymentService {
  constructor(
    private _paymentRepo: IPaymentRepository,
    private _razorpayInstance: Razorpay,
    private _appointmentRepo: IAppointmentRepository
  ) {}

  async createRazorpayOrder(data: RazorpayOrderInput): Promise<IRazorpayOrderResponse> {
    const amountInPaise = data.amount * 100;

    const order = await this._razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    await this._paymentRepo.create({
      appointmentId: new mongoose.Types.ObjectId(data.appointmentId),
      userId: new mongoose.Types.ObjectId(data.userId),
      doctorId: new mongoose.Types.ObjectId(data.doctorId),
      amount: data.amount,
      currency: "INR",
      status: "created",
      razorpayOrderId: order.id,
    });

    return {
      id: order.id,
      amount: Number(order.amount),
      currency: order.currency,
      status: order.status,
    };
  }

  async verifyPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<{ success: boolean; message: string }> {
    const secret = process.env.RAZORPAY_SECRET_KEY;
    if (!secret) {
      throw new Error("RAZORPAY_SECRET_KEY is not set in environment variables.");
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    const payment = await this._paymentRepo.findByRazorpayOrderId(razorpayOrderId);
    if (!payment) {
      return { success: false, message: "Payment not found" };
    }

    if (expectedSignature === razorpaySignature) {
      // Update payment status
      await this._paymentRepo.updateById(payment._id as string, {
        razorpayPaymentId,
        razorpaySignature,
        status: "paid",
      });

      // ✅ Update appointment payment status
      if (payment.appointmentId) {
        await this._appointmentRepo.updatePaymentStatus(payment.appointmentId.toString(), "paid");
      }

      return { success: true, message: "Payment verified successfully" };
    } else {
      await this._paymentRepo.updateById(payment._id as string, {
        status: "failed",
        errorMessage: "Invalid signature",
      });
      return { success: false, message: "Invalid signature" };
    }
  }
}
