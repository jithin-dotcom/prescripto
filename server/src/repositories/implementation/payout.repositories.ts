

import { IPayout } from "../../models/payout/IPayout";
import { BaseRepository } from "./base.repositories";
import { PayoutModel } from "../../models/payout/payout.models";
import mongoose from "mongoose";
import { IPayoutRepository } from "../interface/IPayoutRepository";

export class PayoutRepository extends BaseRepository<IPayout> implements IPayoutRepository{
    constructor(){
        super(PayoutModel);
    }
    
    async getAllPayout(): Promise<IPayout[] | []> {
         return await this.model.find().populate("doctorId");
    }
}
