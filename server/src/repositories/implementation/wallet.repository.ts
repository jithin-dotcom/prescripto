

import { IWallet } from "../../models/wallet/IWallet";
import { BaseRepository } from "./base.repositories";
import { WalletModel } from "../../models/wallet/wallet.models";
import { IWalletRepository } from "../interface/IWalletRepository";


export class WalletRepository extends BaseRepository<IWallet> implements IWalletRepository {
    constructor(){
        super(WalletModel);
    }


    
     
} 