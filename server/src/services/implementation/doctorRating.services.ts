


import { IDoctorRating } from "../../models/DoctorRating/IDoctorRating";
import { IDoctorRatingRepository } from "../../repositories/interface/IDoctorRatingRepository";
import mongoose from "mongoose";
import { IData, IDoctorRatingService, IRatingByDoctorPaginated } from "../interface/IDoctorRatingService";
import { IRatingByDoctor } from "../interface/IDoctorRatingService";
import { IDoctorProfileRepository } from "../../repositories/interface/IDoctorProfileRepository";


export class DoctorRatingService implements IDoctorRatingService{
    constructor(
        private _doctorRatingRepo: IDoctorRatingRepository,
        private _doctorProfileRepo: IDoctorProfileRepository,
        
    ){}

    async rateDoctor(data: IData): Promise<void> {
        try {
           console.log("entered into rateDoctor services");
            const {userId, doctorId, appointmentId, rating, review} = data;
            const rated = await this._doctorRatingRepo.findOne({appointmentId});
            if(rated){
               throw new Error("You have already rated this doctor for this appointment");
            }
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
             
            const doctorProfile = await this._doctorProfileRepo.findOne({doctorId});
            if(!doctorProfile){
                throw new Error("Doctor profile not found");
            }
            
            const oldAvg = doctorProfile?.averageRating || 0;
            const oldCount = doctorProfile?.ratingCount || 0;
            const newCount = oldCount + 1;
            const newAvg = parseFloat(((oldAvg * oldCount + rating) / newCount).toFixed(2));

            const updatedDoctor = await this._doctorProfileRepo.updateByDoctorId(doctorId,{averageRating: newAvg, ratingCount: newCount});
            if(!updatedDoctor){
                throw new Error("Failed to update doctor");
            }
            console.log("updated doctor : ",updatedDoctor);

        }catch (error) {
            if(error instanceof Error){
                throw error;
            }else{
                throw new Error("Something went wrong");
            }
        }
    }




async getRatingByDoctor(
  doctorId: string,
  page: number,
  limit: number
): Promise<IRatingByDoctorPaginated & {
  totalReviews: number;
  averageRating: number;
  satisfactionPercent: number;
}> {
  if (!doctorId) throw new Error("Doctor ID is missing");

  const skip = (page - 1) * limit;
  const { ratings, total } = await this._doctorRatingRepo.getDoctorRating(doctorId, skip, limit);
  const stats = await this._doctorRatingRepo.getDoctorRatingStats(doctorId);

  const result: IRatingByDoctor[] = ratings.map((rating) => {
    const patient = rating.patientId as unknown as { name: string };
    return {
      userName: patient.name || "Unknown",
      rating: rating.rating,
      review: rating.review,
      time: rating.createdAt,
    };
  });

  return {
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
    itemsPerPage: limit,
    data: result,
    totalReviews: stats.totalReviews,
    averageRating: stats.averageRating,
    satisfactionPercent: stats.satisfactionPercent,
  };
}


}