

import { IPayout } from "../../models/payout/IPayout";
import { BaseRepository } from "./base.repositories";
import { PayoutModel } from "../../models/payout/payout.models";
import mongoose from "mongoose";
import { IPayoutRepository } from "../interface/IPayoutRepository";
import { IPayoutDocPopulated } from "../../services/interface/IPaymentService";

export class PayoutRepository extends BaseRepository<IPayout> implements IPayoutRepository{
    constructor(){
        super(PayoutModel);
    }
    
   
 async getAllPayout(
  skip: number,
  limit: number
): Promise<{ payouts: IPayoutDocPopulated[]; total: number }> {
  const [payouts, total] = await Promise.all([
    this.model
      .find()
      .populate("doctorId")
      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit)
      .lean<IPayoutDocPopulated[]>()
      .exec(),
    this.model.countDocuments().exec()
  ]);
  return { payouts, total };
}


async getDoctorPayout(doctorId: string, skip: number, limit: number): Promise<{ payouts: IPayoutDocPopulated[] | [], total: number }> {
    const [payouts, total] = await Promise.all([
        this.model.find({ doctorId: new mongoose.Types.ObjectId(doctorId) })
            .populate("doctorId")
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .lean<IPayoutDocPopulated[]>()
            .exec(),
        this.model.countDocuments({ doctorId: new mongoose.Types.ObjectId(doctorId) }).exec()
    ]);
    return { payouts, total };
}

}


