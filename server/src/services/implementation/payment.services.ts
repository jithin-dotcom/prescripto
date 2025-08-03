

import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Buffer } from "buffer";

import { IPaymentService, RazorpayOrderInput, IRazorpayOrderResponse } from "../interface/IPaymentService";
import { IPaymentRepository } from "../../repositories/interface/IPaymentRepository";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IWalletRepository } from "../../repositories/interface/IWalletRepository";
import { IWalletHistoryRepository } from "../../repositories/interface/IWalletHistoryRepository";
import { IChatRepository } from "../../repositories/interface/IChatRepository";


export class PaymentService implements IPaymentService {
  constructor(
    private _paymentRepo: IPaymentRepository,
    private _razorpayInstance: Razorpay,
    private _appointmentRepo: IAppointmentRepository,
    private _walletRepo: IWalletRepository,
    private _walletHistoryRepo: IWalletHistoryRepository,
    private _chatRepo: IChatRepository,
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
    console.log("entered into verify razorpay")
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
      
      await this._paymentRepo.updateById(payment._id as string, {
        razorpayPaymentId,
        razorpaySignature,
        status: "paid",
        
      });

     
      if (payment.appointmentId && payment._id) {
        // await this._appointmentRepo.updatePaymentStatus(payment.appointmentId.toString(), "paid",new mongoose.Types.ObjectId(payment._id.toString()));
        await this._appointmentRepo.updateById(payment.appointmentId,{status:"confirmed",payment:"paid"});
      }

     
      let doctorWallet = await this._walletRepo.findOne({userId: payment.doctorId});
      if(!doctorWallet){
         doctorWallet = await this._walletRepo.create({
            userId: payment.doctorId,
            role: "doctor",
         })
         if(!doctorWallet){
            throw new Error("Failed to create doctor wallet");
         }
      }
       
       const amount = Math.floor(payment.amount - (payment.amount/10));
       const walletHistoryDoctor = await this._walletHistoryRepo.create({
            walletId: doctorWallet._id as mongoose.Types.ObjectId, 
            appointmentId: new mongoose.Types.ObjectId(payment.appointmentId),
            amount: amount,
            type: "credit",
            source: "consultation",
            transactionId: new mongoose.Types.ObjectId(payment._id as string),
         })
         if(!walletHistoryDoctor){
            throw new Error("Failed to create doctor history");
         }
          
         const updateDoctor = await this._walletRepo.updateById(doctorWallet._id as mongoose.Types.ObjectId,{$inc:{balance: amount}});
         console.log("updateDoctor : ",updateDoctor);
         if(!updateDoctor){
              throw new Error("Failed to update wallet balance");
         } 


         const existing = await this._chatRepo.findByAppointmentId(payment.appointmentId.toString());
         if(!existing){
            const chat = await this._chatRepo.createChat({
              appointmentId: payment.appointmentId,
              participants:[payment.userId,payment.doctorId],
              isActive: true,
              doctorId: payment.doctorId,
              userId: payment.userId,
            });   
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



  async downloadRecept(appointmentId: string): Promise<Buffer> {
       try {
         console.log("entered into service");
         const data = await this._paymentRepo.getPaymentInfo(appointmentId);
         if(!data){
            throw new Error("Failed to get payment details");
         }
         console.log("data: ", data);
         return this.generateReceiptPDF(data);
       }catch (error) {
         if(error instanceof Error){
            throw error;
         }else{
           throw new Error("Something went wrong");
         }
       }
  }
  


  async generateReceiptPDF(data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers: any[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    // Load logo
    const logoPath = path.resolve(__dirname, "../../../public/images/logo2.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 130, 30, { width: 60 });
    }

    doc.fontSize(20).text("Prescripto Online Consultancy", 130, 50);
    doc.fontSize(10).text("123 Health Lane, Wellness City, India", 130, 75);
    doc.moveDown(2);

    // Header
    doc
      .fontSize(16)
      .fillColor("#000")
      .text("Payment Receipt", { align: "center", underline: true });

    doc.moveDown();

    const createdAt = new Date(data.createdAt).toLocaleDateString();

    
    doc
      .fontSize(12)
      .fillColor("black")
      .text(`Receipt Date: ${createdAt}`)
      .text(`Appointment No: ${data.appointmentId.appointmentNo}`)
      .text(`Doctor: Dr. ${data.doctorId.name}`)
      .text(`Payment ID: ${data.razorpayPaymentId}`)
      // .text(`Status: ${data.status}`)
      .moveDown();

    
    doc
      .fontSize(14)
      .text("Payment Details", { underline: true })
      .moveDown(0.5);

    doc.fontSize(12).text(`Date: ${data.appointmentId.day} ${data.appointmentId.time}`);
    doc.text(`Fee Amount: ${data.amount}`);
    doc.text(`Currency: ${data.currency}`);
    doc.text(`Payment Mode: Razorpay`);
    doc.text(`Payment Status: ${data.status}`);
    doc.moveDown(2);

    doc
      .fontSize(10)
      .fillColor("gray")
      .text("Prescripto Online Consultancy • +91-9876543210 • support@prescripto.com", {
        align: "center",
      });

    doc.end();
  });
}


}
