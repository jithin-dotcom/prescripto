

import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Buffer } from "buffer";
import { IData } from "../interface/IPaymentService";


import { IPaymentService, RazorpayOrderInput, IRazorpayOrderResponse, IPayoutClean } from "../interface/IPaymentService";
import { IPaymentRepository } from "../../repositories/interface/IPaymentRepository";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IWalletRepository } from "../../repositories/interface/IWalletRepository";
import { IWalletHistoryRepository } from "../../repositories/interface/IWalletHistoryRepository";
import { IChatRepository } from "../../repositories/interface/IChatRepository";
import { IPayoutRepository } from "../../repositories/interface/IPayoutRepository";

import { mapPayouts } from "../../utils/mapper/paymentService.mapper";
import axios from "axios";


 const DECENTRO_CLIENT_ID = process.env.DECENTRO_CLIENT_ID;
 const DECENTRO_CLIENT_SECRET = process.env.DECENTRO_CLIENT_SECRET;
 const DECENTRO_MODULE_SECRET= process.env.DECENTRO_MODULE_SECRET;
 const DECENTRO_PROVIDER_SECRET = process.env.DECENTRO_PROVIDER_SECRET;
 const DECENTRO_API_URL = process.env.DECENTRO_BASE_URL;


export class PaymentService implements IPaymentService {
  constructor(
    private _paymentRepo: IPaymentRepository,
    private _razorpayInstance: Razorpay,
    private _appointmentRepo: IAppointmentRepository,
    private _walletRepo: IWalletRepository,
    private _walletHistoryRepo: IWalletHistoryRepository,
    private _chatRepo: IChatRepository,
    private _payoutRepo: IPayoutRepository,
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
      paymentMethod: "razorpay",
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
      
      await this._paymentRepo.updateById(payment._id as string, {
        razorpayPaymentId,
        razorpaySignature,
        status: "paid",
        
      });

     
      if (payment.appointmentId && payment._id) {
        await this._appointmentRepo.updateById(payment.appointmentId,{status:"confirmed",payment:"paid", method: "razorpay"});
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



  async createPayout(doctorId: string, amount: number, reason: string): Promise<{message: string}> {
    try {
       const newDoctorId = new mongoose.Types.ObjectId(doctorId);
       
       const wallet = await this._walletRepo.findOne({userId: newDoctorId});
       
       if(wallet?.balance && amount > wallet?.balance){
          throw new Error("Request amount is greater than wallet balance");
       }
       const data: Partial<IData> = {
         doctorId: newDoctorId,
         amount,
         reason,
       }
       const payout = await this._payoutRepo.create(data);
       if(!payout){
         throw new Error("Failed to create Payment");
       }
       return {message: "Payout created successfully"};
    }catch (error) {
       if(error instanceof Error){
         throw error;
       }else{
         throw new Error(" Something went wrong");
       }      
    }
  }


  
    async getPayout(page: number, limit: number): Promise<{ payouts: IPayoutClean[] | [], total: number, totalPages: number }> {
        try {
            const skip = (page - 1) * limit;
            const { payouts, total } = await this._payoutRepo.getAllPayout(skip, limit);
            const totalPages = Math.ceil(total / limit);
            const cleanedPayouts = mapPayouts(payouts);
            return { payouts: cleanedPayouts, total, totalPages };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Failed to fetch Payouts");
            }
        }
    }


  
    async getDoctorPayout(doctorId: string, page: number, limit: number): Promise<{ payouts: IPayoutClean[] | [], total: number, totalPages: number }> {
        try {
            const skip = (page - 1) * limit;
            const { payouts, total } = await this._payoutRepo.getDoctorPayout(doctorId, skip, limit);
            const totalPages = Math.ceil(total / limit);
            const cleanedPayouts = mapPayouts(payouts);
            return { payouts: cleanedPayouts, total, totalPages };
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            } else {
                throw new Error("Failed to fetch Doctor Payouts");
            }
        }
    }


  async initiatePayout(payoutId: string, amount: number, doctorId: string): Promise<void> {
    try {
      const payment = new mongoose.Types.ObjectId(payoutId);
      const payout = await this._payoutRepo.findById(payoutId);
    
      if (!payout) {
        throw new Error('Payout request not found');
      }
      if (payout.status !== 'pending') {
        throw new Error('Payment request already processed');
      }
      const wallet = await this._walletRepo.findOne({ userId: doctorId });
      if (!wallet || wallet.balance < amount) {
        throw new Error("Wallet don't have sufficient balance for Payout");
      }

      const decentroPayload = {
        reference_id: `payout_${payoutId}_${Date.now()}`,
        purpose_message: 'Payout for doctor services',
        from_account: '462515267984680740', 
        to_account: '111111111111111', 
        transfer_type: 'NEFT',
        transfer_amount: amount.toString(),
        beneficiary_details: {
          email_address: 'test1@company.com',
          mobile_number: '8888888888',
          ifsc_code: 'YESB0CMSNOC',
          payee_name: 'Test Name',
        },
      };

      
      const decentroResponse = await axios.post(
        `${DECENTRO_API_URL}/core_banking/money_transfer/initiate`,
        decentroPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            client_id: DECENTRO_CLIENT_ID,
            client_secret: DECENTRO_CLIENT_SECRET,
            module_secret: DECENTRO_MODULE_SECRET,
            provider_secret: DECENTRO_PROVIDER_SECRET,
          },
        }
      );

      
      if (
        decentroResponse.data.status !== 'pending' ||
        decentroResponse.data.responseCode !== 'S00000'
      ) {
        throw new Error(`Decentro payout failed: ${decentroResponse.data.message}`);
      }

     
      await this._payoutRepo.updateById(payoutId, {
        status: 'approved',
        approvedAt: new Date(),
        decentroTxnId: decentroResponse.data.decentroTxnId, 
      });

     
      await this._walletRepo.updateById(wallet._id as mongoose.Types.ObjectId, {
        $inc: { balance: -amount, expense: amount },
      });

      
      await this._walletHistoryRepo.create({
        walletId: wallet._id as mongoose.Types.ObjectId,
        amount: amount,
        type: 'debit',
        source: 'payout',
        status: 'success',
        transactionId: new mongoose.Types.ObjectId(payoutId),
      });


    } catch (error) {
      if(error instanceof Error){
         throw error;
      }else{
         throw new Error("Payout Failed");
      }
  
    }
  }


  async downloadRecept(appointmentId: string): Promise<Buffer> {
       try {
         
         const data = await this._paymentRepo.getPaymentInfo(appointmentId);
         if(!data){
            throw new Error("Failed to get payment details");
         }
         
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

    
    const logoPath = path.resolve(__dirname, "../../../public/images/logo2.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 130, 30, { width: 60 });
    }

    doc.fontSize(20).text("Prescripto Online Consultancy", 130, 50);
    doc.fontSize(10).text("123 Health Lane, Wellness City, India", 130, 75);
    doc.moveDown(2);

   
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
      .text(`Payment ID: ${data.razorpayOrderId}`)
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




