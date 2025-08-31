


import { WalletDTO, WalletHistoryDTO } from "../../services/interface/IWalletService";
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";
import mongoose from "mongoose";

export const mapWalletDTO = (
  wallet: { userId: mongoose.Types.ObjectId; role: "user" | "doctor"; balance: number; expense?: number },
  history: IWalletHistory[],
  page: number,
  limit: number,
  totalCount: number
): WalletDTO => {
  const mappedHistory: WalletHistoryDTO[] = history.map((h) => ({
    appointmentId: h.appointmentId?.toString(),
    transactionId: h.transactionId?.toString(),
    amount: h.amount,
    type: h.type,
    source: h.source,
    status: h.status,
    createdAt: h.createdAt,
    updatedAt: h.updatedAt,
  }));

  return {
    userId: wallet.userId.toString(),
    role: wallet.role,
    balance: wallet.balance,
    expense: wallet.expense || 0,
    history: mappedHistory,
    page,
    totalPages: Math.ceil(totalCount / limit),
    totalTransactions: totalCount,
  };
};
