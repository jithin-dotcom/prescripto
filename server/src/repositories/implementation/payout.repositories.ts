

import { IPayout } from "../../models/payout/IPayout";
import { BaseRepository } from "./base.repositories";
import { PayoutModel } from "../../models/payout/payout.models";
import mongoose from "mongoose";
import { IPayoutRepository } from "../interface/IPayoutRepository";

export class PayoutRepository extends BaseRepository<IPayout> implements IPayoutRepository{
    constructor(){
        super(PayoutModel);
    }
    
   

     async getAllPayout(skip: number, limit: number): Promise<{ payouts: IPayout[] | [], total: number }> {
        const [payouts, total] = await Promise.all([
            this.model.find().populate("doctorId").skip(skip).limit(limit).exec(),
            this.model.countDocuments().exec()
        ]);
        return { payouts, total };
    }



    async getDoctorPayout(doctorId: string, skip: number, limit: number): Promise<{ payouts: IPayout[] | [], total: number }> {
        const [payouts, total] = await Promise.all([
            this.model.find({ doctorId: new mongoose.Types.ObjectId(doctorId) })
                .populate("doctorId")
                .skip(skip)
                .limit(limit)
                .exec(),
            this.model.countDocuments({ doctorId: new mongoose.Types.ObjectId(doctorId) }).exec()
        ]);
        return { payouts, total };
    }


}




 // async getAllPayout(): Promise<IPayout[] | []> {
    //      return await this.model.find().populate("doctorId");
    // }