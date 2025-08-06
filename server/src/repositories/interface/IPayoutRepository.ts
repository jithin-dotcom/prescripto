

import { IBaseRepository } from "./IBaseRepository";
import mongoose from "mongoose";
import { IPayout } from "../../models/payout/IPayout";

export interface IPayoutRepository extends IBaseRepository<IPayout> {
    // getAllPayout(): Promise<IPayout[] | []>;
    getAllPayout(skip: number, limit: number): Promise<{ payouts: IPayout[] | [], total: number }>;
    getDoctorPayout(doctorId: string, skip: number, limit: number): Promise<{ payouts: IPayout[] | [], total: number }>;
}