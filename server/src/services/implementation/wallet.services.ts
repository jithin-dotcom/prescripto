

import { IWalletServiceResponse, IWalletService } from "../interface/IWalletService";
import { IWalletRepository } from "../../repositories/interface/IWalletRepository";
import { IWalletHistoryRepository } from "../../repositories/interface/IWalletHistoryRepository";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IChatRepository } from "../../repositories/interface/IChatRepository";
import { IPaymentRepository } from "../../repositories/interface/IPaymentRepository";
import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";
import mongoose from "mongoose";


export class WalletService implements IWalletService {

    constructor(
        private _walletRepo: IWalletRepository,
        private _walletHistoryRepo: IWalletHistoryRepository,
        private _appointmentRepo: IAppointmentRepository,
        private _chatRepo: IChatRepository,
        private _paymentRepo: IPaymentRepository,
        private _doctorProfileRepo: IDoctorProfileRepository,
    ){}


    async getWallet(
     userId: string,
     role: "user" | "doctor",
     page: number,
     limit: number
    ): Promise<IWalletServiceResponse> {
      try {
        let wallet = await this._walletRepo.findOne({ userId });

        if (!wallet) {
          wallet = await this._walletRepo.create({
          userId: new mongoose.Types.ObjectId(userId),
          role,
          balance: 0,
        });
       }

       if (!wallet) {
         throw new Error("Failed to create Wallet");
       }

       const walletId = wallet._id;

       const [walletHistory, totalCount] = await this._walletHistoryRepo.findPaginated(
         walletId as mongoose.Types.ObjectId,
         page,
         limit
       );

       return {
         userId: wallet.userId,
         role,
         balance: wallet.balance,
         expense: wallet.expense || 0,
         history: walletHistory,
         page,
         totalPages: Math.ceil(totalCount / limit),
         totalTransactions: totalCount
       };
      }catch (error) {
        throw error instanceof Error ? error : new Error("Failed to fetch wallet");
      }
    }


 



async makeWalletPayment(userId: string, appointmentId: string): Promise<{ message: string }> {
  try {
    const walletUser = await this._walletRepo.findOne({ userId });
    if (!walletUser) {
      throw new Error("Wallet not found or balance is zero");
    }

    const appointment = await this._appointmentRepo.findById(appointmentId);
    if (!appointment) {
      throw new Error("No appointment Found");
    }

    
    const doctorId = appointment.doctorId instanceof mongoose.Types.ObjectId
      ? appointment.doctorId
      : new mongoose.Types.ObjectId(appointment.doctorId._id ?? appointment.doctorId);

    const patientId = appointment.userId instanceof mongoose.Types.ObjectId
      ? appointment.userId
      : new mongoose.Types.ObjectId((appointment.userId as any)._id ?? appointment.userId);

    let walletDoctor = await this._walletRepo.findOne({ userId: doctorId });
    if (!walletDoctor) {
      walletDoctor = await this._walletRepo.create({
        userId: doctorId,
        role: "doctor",
      });
      if (!walletDoctor) {
        throw new Error("Failed to create Doctor wallet");
      }
    }

    const doctorProfile = await this._doctorProfileRepo.findOne({doctorId: appointment.doctorId});

    if(doctorProfile?.specialization !== "Neurologist"){
       throw new Error("You can only book Neurologist using wallet");
    }
    

    if(appointment.fee && appointment.fee > 500){
       throw new Error("Wallet payment can be made for appointment amount less than or equal to 500");
    }

    if (appointment.fee && walletUser.balance < appointment.fee) {
      throw new Error("Wallet doesn't have sufficient Balance");
    }

    const updateAppointment = await this._appointmentRepo.updateById(appointmentId, {
      status: "confirmed",
      payment: "paid",
      method: "wallet",
    });
    if (!updateAppointment) {
      throw new Error("Failed to update appointment");
    }

    
    const walletHistoryUser = await this._walletHistoryRepo.create({
      walletId: walletUser._id as mongoose.Types.ObjectId,
      appointmentId: new mongoose.Types.ObjectId(appointmentId),
      amount: appointment.fee,
      type: "debit",
      source: "consultation",
      transactionId: appointment?.transactionId,
    });
    if (!walletHistoryUser) {
      throw new Error("failed to create Wallet History for user");
    }

    const createPayment = await this._paymentRepo.create({
      appointmentId: new mongoose.Types.ObjectId(appointmentId),
      doctorId,
      userId: patientId,
      amount: appointment.fee,
      currency: "INR",
      status: "paid",
      paymentMethod: "wallet",
      razorpayOrderId: Math.floor(100000 + Math.random() * 900000).toString(),
    });
    if (!createPayment) {
      throw new Error("Failed to create Payment");
    }

    if (appointment.fee) {
      const amount = Math.floor(appointment.fee - appointment.fee / 10);
      const walletHistoryDoctor = await this._walletHistoryRepo.create({
        walletId: walletDoctor._id as mongoose.Types.ObjectId,
        appointmentId: new mongoose.Types.ObjectId(appointmentId),
        amount,
        type: "credit",
        source: "consultation",
        transactionId: appointment?.transactionId,
      });
      if (!walletHistoryDoctor) {
        throw new Error("failed to create Wallet History for doctor");
      }

      await this._walletRepo.updateById(walletDoctor._id as mongoose.Types.ObjectId, {
        $inc: { balance: amount },
      });
    }

    if (walletUser._id && appointment?.fee) {
      await this._walletRepo.updateById(walletUser._id as mongoose.Types.ObjectId, {
        $inc: { balance: -appointment.fee, expense: appointment.fee },
      });
    }

   
    const existing = await this._chatRepo.findByAppointmentId(appointmentId);
    if (!existing) {
      await this._chatRepo.createChat({
        appointmentId: new mongoose.Types.ObjectId(appointmentId),
        participants: [patientId, doctorId],
        isActive: true,
        doctorId,
        userId: patientId,
      });
    }

    return { message: "Wallet Payment made successfully" };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Something went wrong");
    }
  }
}


    
}

