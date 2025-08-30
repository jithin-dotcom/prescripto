


import { CallLogDTO } from "./ICallLogService";
import { ICallLog } from "../../../models/VideoCall/ICallLog";
import { IWallet } from "../../../models/wallet/IWallet";
import { WalletDTO } from "./ICallLogService";
import { IWalletHistory } from "../../../models/walletHistory/IWalletHistory";
import { WalletHistoryInputDTO } from "./ICallLogService";
import mongoose from "mongoose";

export const toCallLogDTO = (log: ICallLog): CallLogDTO => ({
  doctorId: log.doctorId,
  patientId: log.patientId,
  appointmentId: log.appointmentId,
  startTime: log.startTime,
  endTime: log.endTime,
  duration: log.duration,
  callType: log.callType,
  callStatus: log.callStatus,
});

export const toCallLogEntity = (dto: CallLogDTO): Partial<ICallLog> => ({
  doctorId: dto.doctorId,
  patientId: dto.patientId,
  appointmentId: dto.appointmentId,
  startTime: dto.startTime,
  endTime: dto.endTime,
  duration: dto.duration,
  callType: dto.callType,
  callStatus: dto.callStatus,
});






export const mapWalletToDTO = (wallet: IWallet): WalletDTO => ({
  id: (wallet._id as mongoose.Types.ObjectId).toString(),
  userId: wallet.userId,
  role: wallet.role,
  balance: wallet.balance,
  expense: wallet.expense,
  createdAt: wallet.createdAt,
  updatedAt: wallet.updatedAt,
});


export const mapWalletToEntity = (dto: Partial<WalletDTO>): Partial<IWallet> => ({
  userId: dto.userId, 
  role: dto.role,
  balance: dto.balance ?? 0,
  expense: dto.expense,
});




export function mapToWalletHistoryEntity(
  input: WalletHistoryInputDTO,
  amount: number,
  transactionId: mongoose.Types.ObjectId
): Partial<IWalletHistory> {
  return {
    walletId: new mongoose.Types.ObjectId(input.walletId),
    appointmentId: new mongoose.Types.ObjectId(input.appointmentId),
    transactionId,
    amount,
    type: "credit",
    source: "consultation",
    status: "success",
  };
}