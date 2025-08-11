

import { IBaseRepository } from "./IBaseRepository";
import mongoose from "mongoose";
import { IPayout } from "../../models/payout/IPayout";
import { IPayoutDocPopulated } from "../../services/interface/IPaymentService";

export interface IPayoutRepository extends IBaseRepository<IPayout> {
   
    getAllPayout(
      skip: number,
      limit: number
    ): Promise<{ payouts: IPayoutDocPopulated[]; total: number }>

    getDoctorPayout(
        doctorId: string, 
        skip: number, 
        limit: number
    ): Promise<{ payouts: IPayoutDocPopulated[] | [], total: number }>;
}