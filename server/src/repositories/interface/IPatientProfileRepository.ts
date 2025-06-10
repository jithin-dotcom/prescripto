
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import mongoose from "mongoose";
import { IBaseRepository } from "./IBaseRepository";

export interface IPatientProfileRepository extends IBaseRepository<IPatientProfile> {

    findByPatientId(patientId: string | mongoose.Types.ObjectId): Promise<IPatientProfile | null>;
    updateByPatientId(patientId: string | mongoose.Types.ObjectId, data: Partial<IPatientProfile>): Promise<IPatientProfile | null>;
    // deleteByPatientId(patientId: string | mongoose.Types.ObjectId): Promise<void>;

}