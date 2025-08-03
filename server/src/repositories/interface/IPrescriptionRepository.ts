

import { IPrescription } from "../../models/prescription/IPrescription";
import mongoose from "mongoose";
import { IBaseRepository } from "./IBaseRepository";

export interface IPrescriptionRepository extends IBaseRepository<IPrescription> {

    getPrescription(appointmentId: mongoose.Types.ObjectId): Promise<IPrescription | null>;
    getAllPrescription(patientId: mongoose.Types.ObjectId): Promise<IPrescription[]>;
    updatePrescription(appointmentId: mongoose.Types.ObjectId, data: Partial<IPrescription>): Promise<IPrescription | null>;
}

