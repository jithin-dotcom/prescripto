
import { BaseRepository } from "./base.repositories";
import { PatientProfileModel } from "../../models/patient/patientProfile.models";
import { IPatientProfile } from "../../models/patient/IPatientProfile";
import { Document } from "mongoose";
import { IPatientProfileRepository } from "../interface/IPatientProfileRepository";
import mongoose, {FilterQuery} from "mongoose";

export class PatientProfileRepository extends BaseRepository<IPatientProfile & Document> implements IPatientProfileRepository {
  constructor() {
    super(PatientProfileModel);
  }


  async findByPatientId(patientId: string | mongoose.Types.ObjectId) {
    const id = typeof patientId === "string" ? new mongoose.Types.ObjectId(patientId) : patientId;
    return await this.model.findOne({ patientId: id });
  }
  
  async updateByPatientId(patientId: string | mongoose.Types.ObjectId, data: Partial<IPatientProfile>) {
    const id = typeof patientId === "string" ? new mongoose.Types.ObjectId(patientId) : patientId;
    return await this.model.findOneAndUpdate({ patientId: id }, data, { new: true });
  }

  


}
