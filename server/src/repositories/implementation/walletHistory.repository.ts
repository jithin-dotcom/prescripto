
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";
import { BaseRepository } from "./base.repositories";
import { WalletHistoryModel } from "../../models/walletHistory/walletHistory.models";
import { IWalletHistoryRepository } from "../interface/IWalletHistoryRepository";
import mongoose from "mongoose";

export class WalletHistoryRepository extends BaseRepository<IWalletHistory> implements IWalletHistoryRepository{
    constructor(){
        super(WalletHistoryModel);
    }

    async findPaginated(walletId: mongoose.Types.ObjectId, page: number, limit: number): Promise<[IWalletHistory[], number]> {
  const skip = (page - 1) * limit;

  const [transactions, total] = await Promise.all([
    this.model.find({ walletId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    this.model.countDocuments({ walletId }),
  ]);

  return [transactions, total];
}




}