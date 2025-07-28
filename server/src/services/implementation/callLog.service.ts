

import { ICallLog } from "../../models/VideoCall/ICallLog";
import { ICallLogRepository } from "../../repositories/interface/ICallLogRepository";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IWallet } from "../../models/wallet/IWallet";
// import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";
import { IWalletRepository } from "../../repositories/interface/IWalletRepository";
import { IWalletHistoryRepository } from "../../repositories/interface/IWalletHistoryRepository";
import mongoose from "mongoose";
import { ICallLogService } from "../interface/ICallLogService";
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";

export class CallLogService implements ICallLogService {
  constructor(
    private _callLogRepo: ICallLogRepository,
    private _appointmentRepo: IAppointmentRepository,
    private _walletRepo: IWalletRepository,
    private _WalletHistoryRepo: IWalletHistoryRepository,
  ) {}

  async logCall(data: Partial<ICallLog>): Promise<ICallLog> {
    try {
      const appointmentId = data.appointmentId;
      if(!appointmentId){
        throw new Error("AppointmentId missing");
      }
      if(data.callStatus === "completed"){
         await this._appointmentRepo.updateById(appointmentId,{status:"completed"});
      }

      return await this._callLogRepo.createLog(data);
    } catch (error) {
      throw error
    }
    
  }

  async paymentDoctor(data: Partial<IWallet>): Promise<IWallet> {
     try {
       const userId = data.userId;
       if(!userId){
         throw new Error("UserId required  for creating Wallet");
       }
       let existingWallet = await this._walletRepo.findOne({userId});
       if(!existingWallet){
         existingWallet =  await this._walletRepo.create(data);
       }
       return existingWallet;
     }catch (error) {
       console.log("error in paymentDoctor : ", error);
        if(error instanceof Error){
           throw error;
        }else{
           throw new Error("Something went wrong in creating Wallet");
        }
     }
  } 
  
  async doctorPaymentHistory(data: Partial<IWalletHistory>): Promise<IWalletHistory> {
      try {
        const appointmentId = data.appointmentId;
        if(!appointmentId){
          throw new Error("AppointmentId  required for PaymentHistory");
        }
        if (!data.walletId) {
          throw new Error("WalletId required for PaymentHistory");
        }
        const appointment = await this._appointmentRepo.findById(appointmentId);
        if(!appointment){
          throw new Error("No appointment exists");
        }
        if(appointment.payment !== "paid"){
           throw new Error("Payment is not done");
        }
        let amount = 0;
        if(appointment.fee){
            amount = appointment.fee - Math.floor(appointment.fee/10);
        }
        
        console.log("amount : ", amount);
        const walletHistory = await this._WalletHistoryRepo.create(
          {
            walletId: data.walletId, 
            appointmentId, 
            amount, 
            type: "credit",
            source: "consultation",
            transactionId: appointment.transactionId,
          }
        );
       
        if(!walletHistory){
          throw new Error("Failed to create Wallet History");
        }
        const updatedBalance = await this._walletRepo.updateById(data.walletId,{$inc:{balance: amount }});
        if(!updatedBalance){
          throw new Error("Failed to update Wallet Balance");
        }
        return walletHistory;
      }catch (error) {
        console.log("error in doctorPaymentHistory : ", error);
        if(error instanceof Error){
           throw error;
        }else{
          throw new Error("Something went wrong in creating Wallet history")
        }
      }
  }
  
}
