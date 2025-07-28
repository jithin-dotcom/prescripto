

import { IBaseRepository } from "./IBaseRepository";
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";
import mongoose from "mongoose";

export interface IWalletHistoryRepository extends IBaseRepository<IWalletHistory> {
    create(data: Partial<IWalletHistory>): Promise<IWalletHistory>;
    findPaginated(walletId: mongoose.Types.ObjectId, page: number, limit: number): Promise<[IWalletHistory[], number]>;

}