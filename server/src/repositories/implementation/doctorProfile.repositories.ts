
import { BaseRepository } from "./base.repositories";
import { DoctorProfileModel } from "../../models/doctor/doctorProfile.models";
import { IDoctorProfile } from "../../models/doctor/IDoctorProfile";
import mongoose, { Document } from "mongoose";
import { IDoctorProfileRepository } from "../interface/IDoctorProfileRepository";
import { IDoctorProfileDashboard } from "../../models/doctor/IDoctorProfile";

export class DoctorProfileRepository extends BaseRepository<IDoctorProfile & Document> implements IDoctorProfileRepository {
  constructor() {
    super(DoctorProfileModel);
  }

 
  async findByDoctorId(doctorId: string) {
    const id = typeof doctorId === "string" ? new mongoose.Types.ObjectId(doctorId) : doctorId;
    return await this.model.findOne({ doctorId: id });
  }

  async updateByDoctorId(doctorId: string | mongoose.Types.ObjectId, data: Partial<IDoctorProfile>) {
    const id = typeof doctorId === "string" ? new mongoose.Types.ObjectId(doctorId) : doctorId;
    return await this.model.findOneAndUpdate({ doctorId: id }, data, { new: true });
  }

   

}
