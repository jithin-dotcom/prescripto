


import mongoose from "mongoose";
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";


 

export interface IWalletServiceResponse {
  userId: mongoose.Types.ObjectId;
  role: "user" | "doctor";
  balance: number;
  expense: number;
  history: IWalletHistory[];
  page: number;
  totalPages: number;
  totalTransactions: number;
}



export interface IWalletHistoryServiceResponse  {
  walletId: mongoose.Types.ObjectId;
  appointmentId: mongoose.Types.ObjectId;
  transactionId?: mongoose.Types.ObjectId;
  amount: number;
  type: 'credit' | 'debit';
  source: 'refund' | 'consultation' | 'admin_adjustment';
  status: 'success' | 'pending' | 'failed';
  createdAt: Date;

}

export interface IWalletService {
    
getWallet(
   userId: string,
   role: "user" | "doctor",
   page: number,
   limit: number
): Promise<WalletDTO>;


makeWalletPayment(userId: string, appointmentId: string): Promise<{message: string}>

}



export interface WalletHistoryDTO {
  appointmentId?: string;
  transactionId?: string;
  amount: number;
  type: "credit" | "debit";
  source: "refund" | "consultation" | "admin_adjustment" | "cancel appointment" | "payout";
  status: "success" | "pending" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface WalletDTO {
  userId: string;
  role: "user" | "doctor";
  balance: number;
  expense: number;
  history: WalletHistoryDTO[];
  page: number;
  totalPages: number;
  totalTransactions: number;
}
