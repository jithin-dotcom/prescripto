

import { IPrescription } from "../../models/prescription/IPrescription";
import { PrescriptionModel } from "../../models/prescription/prescription.models";
import { IPrescriptionRepository } from "../interface/IPrescriptionRepository";
import { BaseRepository } from "./base.repositories";
import mongoose from "mongoose";


export class PrescriptionRepository extends BaseRepository<IPrescription> implements IPrescriptionRepository {
     constructor(){
        super(PrescriptionModel);
     }

     async getPrescription(appointmentId: mongoose.Types.ObjectId) {
         return await this.model.findOne({appointmentId})
                                .populate("appointmentId")
                                .populate("patientId")
                                .populate("doctorId")
                                                     
     }

     async getAllPrescription(patientId: mongoose.Types.ObjectId) {
        return await this.model.find({patientId})
                               .populate("appointmentId")
                               .populate("doctorId")
                               .populate("patientId")
     }
}