

import { ICallLog } from "../../models/VideoCall/ICallLog";
import { ICallLogRepository } from "../../repositories/interface/ICallLogRepository";
import { IAppointmentRepository } from "../../repositories/interface/IAppointmentRepository";
import { IWallet } from "../../models/wallet/IWallet";
import { IWalletRepository } from "../../repositories/interface/IWalletRepository";
import { IWalletHistoryRepository } from "../../repositories/interface/IWalletHistoryRepository";

import { ICallLogService, IWalletHistoryDTO } from "../interface/ICallLogService";
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";
import { mapWalletHistoryToDTO } from "../../utils/mapper/callLogService.mapper";
import { CallLogDTO, WalletDTO, WalletHistoryInputDTO } from "../../utils/reverseMapper/callLogService/ICallLogService";
import { toCallLogEntity, mapWalletToEntity, mapWalletToDTO, mapToWalletHistoryEntity } from "../../utils/reverseMapper/callLogService/callLogService";
import mongoose from "mongoose";

export class CallLogService implements ICallLogService {
  constructor(
    private _callLogRepo: ICallLogRepository,
    private _appointmentRepo: IAppointmentRepository,
    private _walletRepo: IWalletRepository,
    private _WalletHistoryRepo: IWalletHistoryRepository,
  ) {}

 

  async logCall(data: CallLogDTO): Promise<void> {
    try {
      const appointmentId = data.appointmentId;
      if (!appointmentId) {
        throw new Error("AppointmentId missing");
      }

      
      if (data.callStatus === "completed") {
        await this._appointmentRepo.updateById(appointmentId, {
          status: "completed",
        });
      }

      
      const entity = toCallLogEntity(data);
      await this._callLogRepo.createLog(entity);
    } catch (error) {
      throw error;
    }
  }




  async paymentDoctor(data: Partial<WalletDTO>): Promise<WalletDTO> {
  try {
    const userId = data.userId;
    if (!userId) {
      throw new Error("UserId required for creating Wallet");
    }

    let existingWallet = await this._walletRepo.findOne({ userId });

    if (!existingWallet) {
      const entity = mapWalletToEntity(data); 
      existingWallet = await this._walletRepo.create(entity);
    }

    return mapWalletToDTO(existingWallet);
  } catch (error) {
    console.log("error in paymentDoctor : ", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Something went wrong in creating Wallet");
    }
  }
}


  


  async doctorPaymentHistory(data: WalletHistoryInputDTO): Promise<IWalletHistoryDTO> {
  try {
    const appointmentId = data.appointmentId;
    if (!appointmentId) throw new Error("AppointmentId required for PaymentHistory");
    if (!data.walletId) throw new Error("WalletId required for PaymentHistory");

    const appointment = await this._appointmentRepo.findById(appointmentId);
    if (!appointment) throw new Error("No appointment exists");
    if (appointment.payment !== "paid") throw new Error("Payment is not done");

    let amount = 0;
    if (appointment.fee) {
      amount = appointment.fee - Math.floor(appointment.fee / 10);
    }

   
    const walletHistoryEntity = mapToWalletHistoryEntity(
      data,
      amount,
      appointment.transactionId as mongoose.Types.ObjectId,
    );

    const walletHistory = await this._WalletHistoryRepo.create(walletHistoryEntity);

    if (!walletHistory) throw new Error("Failed to create Wallet History");

    const updatedBalance = await this._walletRepo.updateById(data.walletId, {
      $inc: { balance: amount },
    });

    if (!updatedBalance) throw new Error("Failed to update Wallet Balance");

    return mapWalletHistoryToDTO(walletHistory);
  } catch (error) {
    console.log("error in doctorPaymentHistory : ", error);
    if (error instanceof Error) throw error;
    throw new Error("Something went wrong in creating Wallet history");
  }
}
  
}
