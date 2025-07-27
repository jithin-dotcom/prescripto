
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";
import { BaseRepository } from "./base.repositories";
import { WalletHistoryModel } from "../../models/walletHistory/walletHistory.models";
import { IWalletHistoryRepository } from "../interface/IWalletHistoryRepository";

export class WalletHistoryRepository extends BaseRepository<IWalletHistory> implements IWalletHistoryRepository{
    constructor(){
        super(WalletHistoryModel);
    }
}