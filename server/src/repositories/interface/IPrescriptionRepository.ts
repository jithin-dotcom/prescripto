

import { IPrescription, IPrescriptionDocPopulated, IPatientHistoryPopulated} from "../../models/prescription/IPrescription";
import mongoose from "mongoose";
import { IBaseRepository } from "./IBaseRepository";

export interface IPrescriptionRepository extends IBaseRepository<IPrescription> {

    getAllPrescription(patientId: mongoose.Types.ObjectId): Promise<IPrescription[]>;
    updatePrescription(appointmentId: mongoose.Types.ObjectId, data: Partial<IPrescription>): Promise<IPrescription | null>;
    getPrescription(
      appointmentId: mongoose.Types.ObjectId
    ): Promise<IPrescriptionDocPopulated | null>;
    // getPatientHistory(patientId: string | mongoose.Types.ObjectId): Promise<(IPatientHistoryPopulated | null)[]>; 

    getPatientHistory(
      patientId: string | mongoose.Types.ObjectId,
      page: number,
      limit: number
    ): Promise<{ histories: (IPatientHistoryPopulated | null)[]; total: number }>
}

