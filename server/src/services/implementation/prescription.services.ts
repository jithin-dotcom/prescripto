

import { IPrescription } from "../../models/prescription/IPrescription";
import { IPrescriptionRepository } from "../../repositories/interface/IPrescriptionRepository";
import mongoose from "mongoose";
import { IPrescriptionService } from "../interface/IPrescriptionService";


export class PrescriptionService implements IPrescriptionService{
    constructor(
        private _prescriptionRepo: IPrescriptionRepository,
    ){}

    async createPrescription(data: IPrescription): Promise<IPrescription> {
        try {
            const prescription = await this._prescriptionRepo.create(data);
            if(!prescription){
                throw new Error("Failed to create Prescription");
            }
            return prescription;
            
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }else{
                throw new Error("Something went wrong");
            }
        }
    }


    async getPrescription(appointmentId: string): Promise<IPrescription | null> {
        try {
            if(!appointmentId){
                throw new Error("AppointmentId missing");
            }
            const appId = new mongoose.Types.ObjectId(appointmentId);
            const prescription = await this._prescriptionRepo.getPrescription(appId);
            // if(!prescription){
            //     throw new Error("Prescription not found");
            // }
            return prescription;
        } catch (error) {
            if(error instanceof Error){
                throw error;
            }else{
                throw new Error("Something went wrong");
            }
        }
    }
}