

import { IBaseRepository } from "./IBaseRepository";
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";

export interface IWalletHistoryRepository extends IBaseRepository<IWalletHistory> {
    create(data: Partial<IWalletHistory>): Promise<IWalletHistory>;
}