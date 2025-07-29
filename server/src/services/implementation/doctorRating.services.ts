


import { IDoctorRating } from "../../models/DoctorRating/IDoctorRating";
import { IDoctorRatingRepository } from "../../repositories/interface/IDoctorRatingRepository";
import mongoose from "mongoose";
import { IData, IDoctorRatingService } from "../interface/IDoctorRatingService";


export class DoctorRatingService implements IDoctorRatingService{
    constructor(
        private _doctorRatingRepo: IDoctorRatingRepository,
    ){}

    async rateDoctor(data: IData): Promise<void> {
        try {
            const {userId, doctorId, appointmentId, rating, review} = data;
            const createRating = await this._doctorRatingRepo.create({
                 patientId: new mongoose.Types.ObjectId(userId),
                 doctorId: new mongoose.Types.ObjectId(doctorId),
                 appointmentId: new mongoose.Types.ObjectId(appointmentId),
                 rating,
                 review,
            })
            if(!createRating){
                throw new Error("Failed to create Rating");
            }

        }catch (error) {
            if(error instanceof Error){
                throw error;
            }else{
                throw new Error("Something went wrong");
            }
        }
    }
}