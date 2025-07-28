

import { IWalletServiceResponse, IWalletHistoryServiceResponse, IWalletService } from "../interface/IWalletService";
import { IWallet } from "../../models/wallet/IWallet";
import { IWalletHistory } from "../../models/walletHistory/IWalletHistory";
import { IWalletRepository } from "../../repositories/interface/IWalletRepository";
import { IWalletHistoryRepository } from "../../repositories/interface/IWalletHistoryRepository";
import mongoose from "mongoose";


export class WalletService implements IWalletService {

    constructor(
        private _walletRepo: IWalletRepository,
        private _walletHistoryRepo: IWalletHistoryRepository,
    ){}


    // async getWallet(userId: string, role: "user" | "doctor"): Promise<IWalletServiceResponse> {
    //     try {
    //         let wallet = await this._walletRepo.findOne({userId});
    //         if(!wallet){
    //             wallet = await this._walletRepo.create({
    //                 userId: new mongoose.Types.ObjectId(userId),
    //                 role,
    //                 balance: 0,
    //             })
    //         }
    //         if(!wallet ){
    //             throw new Error("Failed to create Wallet")
    //         }

    //         const walletId = wallet._id;

    //         const walletHistory = await this._walletHistoryRepo.findAll({walletId});
    //         if(!walletHistory){
    //             throw new Error("Wallet History not found");
    //         }

    //         return {
    //             userId: wallet.userId,
    //             role,
    //             balance: wallet.balance,
    //             history: walletHistory,
    //         }


    //     } catch (error) {
    //         if(error instanceof Error){
    //             throw error;
    //         }else{
    //             throw new Error("Fail to fetch wallet");
    //         }
    //     }
    // }





    async getWallet(
  userId: string,
  role: "user" | "doctor",
  page: number,
  limit: number
): Promise<IWalletServiceResponse> {
  try {
    let wallet = await this._walletRepo.findOne({ userId });

    if (!wallet) {
      wallet = await this._walletRepo.create({
        userId: new mongoose.Types.ObjectId(userId),
        role,
        balance: 0,
      });
    }

    if (!wallet) {
      throw new Error("Failed to create Wallet");
    }

    const walletId = wallet._id;

    const [walletHistory, totalCount] = await this._walletHistoryRepo.findPaginated(
      walletId as mongoose.Types.ObjectId,
      page,
      limit
    );

    return {
      userId: wallet.userId,
      role,
      balance: wallet.balance,
      history: walletHistory,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalTransactions: totalCount
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error("Failed to fetch wallet");
  }
}



    
}

