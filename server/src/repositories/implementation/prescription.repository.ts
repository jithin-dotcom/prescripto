

import { IPatientHistoryPopulated, IPrescription, IPrescriptionDocPopulated } from "../../models/prescription/IPrescription";
import { PrescriptionModel } from "../../models/prescription/prescription.models";
import { IPrescriptionRepository } from "../interface/IPrescriptionRepository";
import { BaseRepository } from "./base.repositories";

import mongoose from "mongoose";


export class PrescriptionRepository extends BaseRepository<IPrescription> implements IPrescriptionRepository {
     constructor(){
        super(PrescriptionModel);
     }



async getPrescription(
  appointmentId: mongoose.Types.ObjectId
): Promise<IPrescriptionDocPopulated | null> {
  return this.model
    .findOne({ appointmentId })
    .populate("appointmentId")
    .populate("patientId")
    .populate("doctorId")
    .lean<IPrescriptionDocPopulated>()
    .exec();
}



   async getAllPrescription(patientId: mongoose.Types.ObjectId) {
      return await this.model.find({patientId})
                               .populate("appointmentId")
                               .populate("doctorId")
                               .populate("patientId")
                               .exec()
   }

   async updatePrescription(appointmentId: mongoose.Types.ObjectId, data: IPrescription) {
      return await this.model.findOneAndUpdate({ appointmentId }, data, { new: true });
   }

   // async getPatientHistory(patientId: string | mongoose.Types.ObjectId): Promise<(IPatientHistoryPopulated | null)[]> {
   //    console.log("patientId repo : ",patientId);
   //    return await this.model.find({patientId})
   //                           .populate("patientId")
   //                           .populate("appointmentId")
   //                           .lean<IPatientHistoryPopulated[]>()
   //                           .exec()
   // }



   async getPatientHistory(
  patientId: string | mongoose.Types.ObjectId,
  page: number,
  limit: number
): Promise<{ histories: (IPatientHistoryPopulated | null)[]; total: number }> {
  
  const skip = (page - 1) * limit;

  const [histories, total] = await Promise.all([
    this.model
      .find({ patientId })
      .populate("patientId")
      .populate("appointmentId")
      .skip(skip)
      .limit(limit)
      .sort({createdAt: -1})
      .lean<IPatientHistoryPopulated[]>()
      .exec(),
    this.model.countDocuments({ patientId })
  ]);

  return { histories, total };
}

   
     
}