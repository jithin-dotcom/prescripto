

import { IBaseRepository } from "./IBaseRepository";
import { IWallet } from "../../models/wallet/IWallet";
import mongoose from "mongoose";

export interface IWalletRepository extends IBaseRepository<IWallet> {
    create(data:Partial<IWallet>): Promise<IWallet>;
}