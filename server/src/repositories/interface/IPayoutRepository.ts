

import { IBaseRepository } from "./IBaseRepository";
import mongoose from "mongoose";
import { IPayout } from "../../models/payout/IPayout";

export interface IPayoutRepository extends IBaseRepository<IPayout> {
    getAllPayout(): Promise<IPayout[] | []>;
}