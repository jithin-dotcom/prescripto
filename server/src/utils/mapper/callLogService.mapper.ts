




import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";
import { IWalletHistoryDTO } from "../../services/interface/ICallLogService";
import mongoose from "mongoose";

export function mapWalletHistoryToDTO(history: IWalletHistory): IWalletHistoryDTO {
  const {
    _id,
    walletId,
    appointmentId,
    amount,
    type,
    source,
    status,
    transactionId,
    createdAt,
  } = history;

  return {
    _id: (history._id as mongoose.Types.ObjectId).toString(),
    walletId: (walletId as mongoose.Types.ObjectId).toString(),
    appointmentId: (appointmentId as mongoose.Types.ObjectId).toString(),
    amount,
    type,
    source,
    status,
    transactionId: transactionId?.toString(),
    createdAt,
  };
}
