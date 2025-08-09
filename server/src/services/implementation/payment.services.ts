

import Razorpay from "razorpay";
import crypto from "crypto";
import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { Buffer } from "buffer";
import { getAuthToken } from "../../utils/cashfreeClient";
import axios from "axios";
import { getDecentroHeaders } from "../../utils/decentroClient";

import { v4 as uuidv4 } from "uuid";

import { IPaymentService, RazorpayOrderInput, IRazorpayOrderResponse, IPayoutClean } from "../interface/IPaymentService";
import { IPaymentRepository } from "../../repositories/interface/IPaymentRepository";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IWalletRepository } from "../../repositories/interface/IWalletRepository";
import { IWalletHistoryRepository } from "../../repositories/interface/IWalletHistoryRepository";
import { IChatRepository } from "../../repositories/interface/IChatRepository";
import { IPayoutRepository } from "../../repositories/interface/IPayoutRepository";
import { IPayout } from "../../models/payout/IPayout";
import { mapPayouts } from "../../utils/mapper/paymentService.mapper";



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



  async createPayout(doctorId: string, amount: number, reason: string): Promise<{message: string}> {
    try {
       const newDoctorId = new mongoose.Types.ObjectId(doctorId);
       
       const wallet = await this._walletRepo.findOne({userId: newDoctorId});
       
       if(wallet?.balance && amount > wallet?.balance){
          throw new Error("Request amount is greater than wallet balance");
       }
       const data: Partial<IPayout> = {
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
            // console.log({payouts, total, totalPages});
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
              const payout = await this._payoutRepo.findById( payoutId );
              if(!payout){
                 throw new Error("Payout request not found");
              }
              if(payout.status !== "pending"){
                 throw new Error("Payment request already processed");
              }
              const wallet = await this._walletRepo.findOne({userId: doctorId});
              if(!wallet || wallet.balance < amount){
                 throw new Error("Wallet don't have sufficient balance for Payout");
              }

              const approve = await this._payoutRepo.updateById(payoutId,{
                 status: "approved",
                 approvedAt: new Date(),
              })

              this._walletRepo.updateById(wallet._id as mongoose.Types.ObjectId,{
                 $inc: {balance: -amount},
              })

              await this._walletHistoryRepo.create({
                 walletId: wallet._id as mongoose.Types.ObjectId,
                 amount: amount,
                 type: "debit",
                 source: "payout",
                 status: "success",
                 transactionId: new mongoose.Types.ObjectId(payoutId),
              });

           }catch (error) {
              if (error instanceof Error) {
                throw error;
              }else{
                throw new Error("Failed to initiate payout");
              }
               
           }
       }


  //   async initiatePayout(payoutId: string, doctorId: string, amount: number): Promise<void> {
  //   try {
  //     // Validate payout request
  //     const payout = await this._payoutRepo.findById(payoutId);
  //     if (!payout) {
  //       throw new Error("Payout request not found");
  //     }
  //     if (payout.status !== "pending") {
  //       throw new Error("Payout request is already processed");
  //     }

  //     // Check wallet balance
  //     const wallet = await this._walletRepo.findOne({ userId: new mongoose.Types.ObjectId(doctorId) });
  //     if (!wallet || wallet.balance < amount) {
  //       throw new Error("Insufficient wallet balance");
  //     }

      
  //     // const fundAccountId = process.env.RAZORPAY_TEST_FUND_ACCOUNT_ID; 
  //     const fundAccountId = "FA1234567890"
  //     if (!fundAccountId) {
  //       throw new Error("Fund account ID not configured");
  //     }

  //     // Create Razorpay payout
  //     const amountInPaise = amount * 100; // Convert to paise
  //     const razorpayPayout = await (this._razorpayInstance as any).payouts.create({
  //       // account_number: process.env.RAZORPAY_TEST_ACCOUNT_NUMBER, // Your Razorpay account number
  //       account_number: "7878787878787878",
  //       fund_account_id: fundAccountId,
  //       amount: amountInPaise,
  //       currency: "INR",
  //       mode: "IMPS", // Use IMPS for test mode
  //       purpose: "payout",
  //       queue_if_low_balance: false,
  //       reference_id: payoutId,
  //       narration: `Payout for request ${payoutId}`,
  //     });

  //     // Update payout status
  //     await this._payoutRepo.updateById(payoutId, {
  //       status: "approved",
  //       razorpayPayoutId: razorpayPayout.id,
  //       updatedAt: new Date(),
  //     });

  //     // Deduct amount from wallet
  //     await this._walletRepo.updateById(wallet._id as mongoose.Types.ObjectId, {
  //       $inc: { balance: -amount },
  //     });

  //     // Log wallet history
  //     await this._walletHistoryRepo.create({
  //       walletId: wallet._id as mongoose.Types.ObjectId,
  //       amount: amount,
  //       type: "debit",
  //       source: "payout",
  //       transactionId: new mongoose.Types.ObjectId(payoutId),
  //     });
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw error;
  //     } else {
  //       throw new Error("Failed to initiate payout");
  //     }
  //   }
  // }
  




//   async initiatePayout(payoutId: string, doctorId: string, amount: number): Promise<void> {
//   try {
//     const payout = await this._payoutRepo.findById(payoutId);
//     if (!payout) throw new Error("Payout request not found");
//     if (payout.status !== "pending") throw new Error("Payout already processed");

//     const wallet = await this._walletRepo.findOne({ userId: new mongoose.Types.ObjectId(doctorId) });
//     if (!wallet || wallet.balance < amount) throw new Error("Insufficient balance");

//     const token = await getAuthToken();

//     // Create Beneficiary first (once per doctor)
//     const beneficiaryId = `doctor_${doctorId}`;
//     await axios.post("https://payout-gamma.cashfree.com/payout/v1/addBeneficiary", {
//       beneId: beneficiaryId,
//       name: "Doctor Name", // You can fetch from doctor profile
//       email: "doctor@example.com",
//       phone: "9999999999",
//       bankAccount: "0000111122223333",
//       ifsc: "HDFC0001234",
//       address1: "Any address",
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     // Initiate Payout
//     const response = await axios.post("https://payout-gamma.cashfree.com/payout/v1/requestTransfer", {
//       beneId: beneficiaryId,
//       amount,
//       transferId: payoutId,
//       transferMode: "IMPS",
//       remarks: "Doctor Payout"
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     });

//     const { referenceId } = response.data.data;

//     await this._payoutRepo.updateById(payoutId, {
//       status: "approved",
//       razorpayPayoutId: referenceId, // You can rename this field to cashfreePayoutId
//       updatedAt: new Date(),
//     });

//     await this._walletRepo.updateById(wallet._id as mongoose.Types.ObjectId, {
//       $inc: { balance: -amount },
//     });

//     await this._walletHistoryRepo.create({
//       walletId: wallet._id as mongoose.Types.ObjectId,
//       amount,
//       type: "debit",
//       source: "payout",
//       transactionId: new mongoose.Types.ObjectId(payoutId),
//     });

//   } catch (error: any) {
//     // console.error("Cashfree payout failed:", error);
//     // throw new Error("Cashfree payout failed");
//      if (axios.isAxiosError(error)) {
//     console.error("Cashfree API error:", error.response?.data || error.message);
//   } else {
//     console.error("Unexpected error:", error);
//   }
//   throw new Error("Cashfree payout failed");
//   }
// }







// async initiatePayout(payoutId: string, doctorId: string, amount: number): Promise<void> {
//   try {
//     const payout = await this._payoutRepo.findById(payoutId);
//     if (!payout || payout.status !== "pending") throw new Error("Invalid payout request");

//     const wallet = await this._walletRepo.findOne({ userId: new mongoose.Types.ObjectId(doctorId) });
//     if (!wallet || wallet.balance < amount) throw new Error("Insufficient wallet balance");

//     const headers = getDecentroHeaders();

//     // Step 1: Initiate Payout
//     const transferRes = await axios.post(`${process.env.DECENTRO_BASE_URL}/v3/core_banking/money_transfer/initiate`, {
//       bene_account_number: "123456789012", // Replace with actual doctor bank details
//       bene_ifsc: "HDFC0001234",
//       amount: amount.toFixed(2),
//       bene_name: "Dr. John Doe",
//       remarks: "Doctor Payout",
//       unique_ref_no: payoutId,
//       transfer_mode: "IMPS"
//     }, { headers });

//     const txnRef = transferRes.data.transaction_id || transferRes.data.data?.transaction_id;

//     // Update DB
//     await this._payoutRepo.updateById(payoutId, {
//       status: "approved",
//       razorpayPayoutId: txnRef,  // Rename this field if necessary
//       updatedAt: new Date(),
//     });

//     await this._walletRepo.updateById(wallet._id, { $inc: { balance: -amount } });

//     await this._walletHistoryRepo.create({
//       walletId: wallet._id,
//       amount,
//       type: "debit",
//       source: "payout",
//       transactionId: new mongoose.Types.ObjectId(payoutId),
//     });

//   } catch (error) {
//     console.error("Decentro Payout Error:", error?.response?.data || error);
//     throw new Error("Decentro payout failed");
//   }
// }












// async initiatePayout(payoutId: string, doctorId: string, amount: number): Promise<void> {
//   try {
//     const payout = await this._payoutRepo.findById(payoutId);
//     if (!payout || payout.status !== "pending") throw new Error("Invalid payout request");

//     const wallet = await this._walletRepo.findOne({ userId: new mongoose.Types.ObjectId(doctorId) });
//     if (!wallet || wallet.balance < amount) throw new Error("Insufficient wallet balance");

//     const headers = getDecentroHeaders();

//     // Temporary hardcoded values – replace with actual doctor info
//     const rawName = "Dr. John Doe";

//     // ✅ Sanitize bene_name to remove special characters
//     const sanitizeName = (name: string) => {
//       return name.replace(/[.@#$%^&*!;:'"~`?=+)(]/g, '').trim();
//     };

//     const bene_name = sanitizeName(rawName);
//     console.log("providerId : ",payoutId);
//     // Step 1: Initiate Payout
//     const transferRes = await axios.post(`${process.env.DECENTRO_BASE_URL}/v3/core_banking/money_transfer/initiate`, {
//       reference_id: payoutId, 
//       bene_account_number: "123456789012", // Replace with actual doctor bank details
//       bene_ifsc: "HDFC0001234",
//       transfer_amount: amount,
//       bene_name, // ✅ sanitized name
//       remarks: "Doctor Payout",
//       unique_ref_no: payoutId,
//       transfer_mode: "IMPS"
//     }, { headers });

//     const txnRef = transferRes.data.transaction_id || transferRes.data.data?.transaction_id;

//     // Update DB
//     await this._payoutRepo.updateById(payoutId, {
//       status: "approved",
//       razorpayPayoutId: txnRef,  // Rename this field if necessary
//       updatedAt: new Date(),
//     });

//     await this._walletRepo.updateById(wallet._id, { $inc: { balance: -amount } });

//     await this._walletHistoryRepo.create({
//       walletId: wallet._id,
//       amount,
//       type: "debit",
//       source: "payout",
//       transactionId: new mongoose.Types.ObjectId(payoutId),
//     });

//   } catch (error) {
//     console.error("Decentro Payout Error:", error?.response?.data || error);
//     throw new Error("Decentro payout failed");
//   }
// }










// async initiatePayout(payoutId: string, doctorId: string, amount: number): Promise<void> {
//   try {
//     const payout = await this._payoutRepo.findById(payoutId);
//     if (!payout || payout.status !== "pending") throw new Error("Invalid payout request");

//     const wallet = await this._walletRepo.findOne({ userId: new mongoose.Types.ObjectId(doctorId) });
//     if (!wallet || wallet.balance < amount) throw new Error("Insufficient wallet balance");

//     const headers = getDecentroHeaders();

//     const rawName = "Dr. John Doe";
//     const sanitizeName = (name: string) => {
//       return name.replace(/[.@#$%^&*!;:'"~`?=+)(]/g, '').trim();
//     };
//     const bene_name = sanitizeName(rawName);

//     const requestBody = {
//       reference_id: payoutId,
//       bene_account_number: "123456789012", // Replace with real value
//       bene_ifsc: "HDFC0001234",
//       transfer_amount: amount,
//       bene_name,
//       remarks: "Doctor Payout",
//       unique_ref_no: payoutId,
//       transfer_mode: "IMPS"
//     };

//     console.log("🔹 Initiating payout with request:", requestBody);

//     const transferRes = await axios.post(
//       `${process.env.DECENTRO_BASE_URL}/v3/core_banking/money_transfer/initiate`,
//       requestBody,
//       { headers }
//     );

//     const txnRef = transferRes.data.transaction_id || transferRes.data.data?.transaction_id;

//     await this._payoutRepo.updateById(payoutId, {
//       status: "approved",
//       razorpayPayoutId: txnRef,
//       updatedAt: new Date(),
//     });

//     await this._walletRepo.updateById(wallet._id, { $inc: { balance: -amount } });

//     await this._walletHistoryRepo.create({
//       walletId: wallet._id,
//       amount,
//       type: "debit",
//       source: "payout",
//       transactionId: new mongoose.Types.ObjectId(payoutId),
//     });

//   } catch (error: any) {
//     console.error("❌ Decentro Payout Error");

//     if (error.response) {
//       console.error("🔸 Response Data:", error.response.data);
//       console.error("🔸 Status Code:", error.response.status);
//       console.error("🔸 Headers:", error.response.headers);
//     } else if (error.request) {
//       console.error("🔸 No response received. Request:", error.request);
//     } else {
//       console.error("🔸 Error Message:", error.message);
//     }

//     console.error("🔸 Axios Error Object:", error.toJSON ? error.toJSON() : error);

//     throw new Error("Decentro payout failed");
//   }
// }





 // Import uuid

//  async  initiatePayout(payoutId: string, amount: number, bene_name: string) {
//   const uniqueRefId = `${payoutId}-${uuidv4()}`; // ensures uniqueness

//   const headers = {
//     client_id: process.env.DECENTRO_CLIENT_ID,
//     client_secret: process.env.DECENTRO_CLIENT_SECRET,
//     module_secret: process.env.DECENTRO_MODULE_SECRET,
//     provider_secret: process.env.DECENTRO_PROVIDER_SECRET,
//     "Content-Type": "application/json",
//   };

//   const requestData = {
//     reference_id: uniqueRefId,
//     bene_account_number: "123456789012", // 🔁 replace with actual doctor account number
//     bene_ifsc: "HDFC0001234",           // 🔁 replace with actual IFSC
//     transfer_amount: amount,
//     bene_name,
//     remarks: "Doctor Payout",
//     unique_ref_no: uniqueRefId,
//     transfer_mode: "IMPS",
//   };

//   try {
//     console.log("📤 Initiating payout with request:", requestData);

//     const response = await axios.post(
//       `${process.env.DECENTRO_BASE_URL}/v3/core_banking/money_transfer/initiate`,
//       requestData,
//       { headers }
//     );

//     console.log("✅ Payout Response:", response.data);

//     if (response.data.api_status !== "SUCCESS") {
//       throw new Error(`Decentro payout failed: ${response.data.message}`);
//     }

//     return {
//       success: true,
//       txnId: response.data.decentro_txn_id,
//       message: response.data.message,
//     };

//   } catch (error: any) {
//     console.error("❌ Decentro Payout Error");

//     if (error.response) {
//       console.error("🔸 Response Data:", error.response.data);
//       console.error("🔸 Status Code:", error.response.status);
//       console.error("🔸 Headers:", error.response.headers);
//     }

//     throw new Error("Decentro payout failed");
//   }
// }






// async initiatePayout(payoutId: string, amount: number, bene_name: string) {
//   const uniqueRefId = uuidv4(); // ✅ Safe: 36 characters

//   const headers = {
//     client_id: process.env.DECENTRO_CLIENT_ID,
//     client_secret: process.env.DECENTRO_CLIENT_SECRET,
//     module_secret: process.env.DECENTRO_MODULE_SECRET,
//     provider_secret: process.env.DECENTRO_PROVIDER_SECRET,
//     "Content-Type": "application/json",
//   };

//   function sanitizeName(name: string) {
//   return name.replace(/[.@#$%^&*!;:'"~`?=+)(]/g, "");
// }

// const sanitizedName = sanitizeName("Dr. Anjali Sharma");

//   const requestData = {
//     reference_id: uniqueRefId,
//     bene_account_number: "123456789012", // Replace later with actual value
//     bene_ifsc: "HDFC0001234",            // Replace later with actual value
//     transfer_amount: amount,             // ✅ amount should be number, not string
//     // bene_name: bene_name,                // ✅ should be a string
//      bene_name: sanitizeName,
//     remarks: "Doctor Payout",
//     unique_ref_no: uniqueRefId,
//     transfer_mode: "IMPS",
//   };

//   try {
//     console.log("📤 Initiating payout with request:", requestData);

//     const response = await axios.post(
//       `${process.env.DECENTRO_BASE_URL}/v3/core_banking/money_transfer/initiate`,
//       requestData,
//       { headers }
//     );

//     console.log("✅ Payout Response:", response.data);

//     if (response.data.api_status !== "SUCCESS") {
//       throw new Error(`Decentro payout failed: ${response.data.message}`);
//     }

//     return {
//       success: true,
//       txnId: response.data.decentro_txn_id,
//       message: response.data.message,
//     };

//   } catch (error: any) {
//     console.error("❌ Decentro Payout Error");

//     if (error.response) {
//       console.error("🔸 Response Data:", error.response.data);
//       console.error("🔸 Status Code:", error.response.status);
//       console.error("🔸 Headers:", error.response.headers);
//     }

//     throw new Error("Decentro payout failed");
//   }
// }








// async initiatePayout(payoutId: string, amount: number, bene_name: string) {
//   const uniqueRefId = uuidv4(); // ✅ Safe and unique

//   const headers = {
//     client_id: process.env.DECENTRO_CLIENT_ID,
//     client_secret: process.env.DECENTRO_CLIENT_SECRET,
//     module_secret: process.env.DECENTRO_MODULE_SECRET,
//     provider_secret: process.env.DECENTRO_PROVIDER_SECRET,
//     "Content-Type": "application/json",
//   };

//   function sanitizeName(name: string) {
//     return name.replace(/[.@#$%^&*!;:'"~`?=+)(]/g, "");
//   }

//   const sanitizedName = sanitizeName(bene_name);

//   const requestData = {
//     reference_id: uniqueRefId,
//     bene_account_number: "0001111122223333", // ✅ Replace with real account later
//     bene_ifsc: "HDFC0000001",            // ✅ Replace with real IFSC later
//     transfer_amount: amount,             // ✅ Ensure it's a number
//     bene_name: "anjali",            // ✅ Use the cleaned string, not the function
//     remarks: "Doctor Payout",
//     unique_ref_no: uniqueRefId,
//     transfer_mode: "IMPS",
//   };

//   try {
//     console.log("📤 Initiating payout with request:", requestData);

//     const response = await axios.post(
//       `${process.env.DECENTRO_BASE_URL}/v3/core_banking/money_transfer/initiate`,
//       requestData,
//       { headers }
//     );

//     console.log("✅ Payout Response:", response.data);

//     if (response.data.api_status !== "SUCCESS") {
//       throw new Error(`Decentro payout failed: ${response.data.message}`);
//     }

//     return {
//       success: true,
//       txnId: response.data.decentro_txn_id,
//       message: response.data.message,
//     };

//   } catch (error: any) {
//     console.error("❌ Decentro Payout Error");

//     if (error.response) {
//       console.error("🔸 Response Data:", error.response.data);
//       console.error("🔸 Status Code:", error.response.status);
//       console.error("🔸 Headers:", error.response.headers);
//     } else {
//       console.error("🔸 Error Message:", error.message);
//     }

//     throw new Error("Decentro payout failed");
//   }
// }




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





// import express from "express";
// import Razorpay from "razorpay";
// import axiosInstance from "../utils/axios"; // Your existing axios instance

// const router = express.Router();
// const razorpay = new Razorpay({
//   key_id: "rzp_test_YOUR_TEST_KEY_ID",
//   key_secret: "YOUR_TEST_KEY_SECRET",
// });

// router.post("/payout", async (req, res) => {
//   try {
//     const { doctorId, amount } = req.body; // Amount in paise (e.g., 10000 = ₹100)

//     // Mock beneficiary details for test mode
//     const beneficiary = {
//       account_number: "7878787878787878", // Test account number
//       ifsc: "RAZORTEST", // Test IFSC code
//       fund_account_id: "FA1234567890", // Mock fund account ID (optional)
//     };

//     // Simulate payout creation (test mode)
//     const payout = await razorpay.payouts.create({
//       account_number: beneficiary.account_number,
//       ifsc: beneficiary.ifsc,
//       amount: amount, // In paise
//       currency: "INR",
//       mode: "IMPS", // Test mode supports IMPS
//       purpose: "consultation_earnings",
//       queue_if_low_balance: true, // Optional
//     });

//     // Update wallet or database (mock deduction)
//     await updateWallet(doctorId, amount);

//     res.status(200).json({
//       status: "success",
//       data: payout,
//       message: "Payout simulated successfully in test mode",
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: error.message || "Error processing test payout",
//     });
//   }
// });

// // Helper function (mock implementation)
// async function updateWallet(doctorId: string, amount: number) {
//   // Simulate wallet deduction (e.g., update database)
//   // Example: await axiosInstance.patch(`/wallet/${doctorId}`, { amount, status: "paid" });
//   console.log(`Mock deducted ₹${amount / 100} from wallet for doctor ${doctorId}`);
// }

// export default router;









  // async getPayout(): Promise<IPayout[] | []> {
  //    try {
  //       const payout = await this._payoutRepo.getAllPayout();
  //       return payout;
  //    }catch (error) {
  //       if(error instanceof Error){
  //         throw error;
  //       }else{
  //         throw new Error("Failed to fetch Payouts");
  //       }    
  //    }
  // }





  


  //   async getDoctorPayout(doctorId: string): Promise<IPayout[] | []> {
  //    try {
  //       const payout = await this._payoutRepo.findAll({doctorId});
  //       return payout;
  //    }catch (error) {
  //       if(error instanceof Error){
  //         throw error;
  //       }else{
  //         throw new Error("Failed to fetch Payouts");
  //       }    
  //    }
  // }





















