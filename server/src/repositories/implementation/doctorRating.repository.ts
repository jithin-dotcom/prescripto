

import { IDoctorRating } from "../../models/DoctorRating/IDoctorRating";
import { DoctorRatingModel } from "../../models/DoctorRating/doctorRating.models";
import { IDoctorRatingRepository } from "../interface/IDoctorRatingRepository";
import { BaseRepository } from "./base.repositories";




export class DoctorRatingRepository extends BaseRepository<IDoctorRating> implements IDoctorRatingRepository{
    constructor(){
        super(DoctorRatingModel);
    }
    
    

async getDoctorRating(
  doctorId: string,
  skip: number,
  limit: number
): Promise<{ ratings: IDoctorRating[]; total: number }> {
  const [ratings, total] = await Promise.all([
    this.model
      .find({ doctorId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }) 
      .populate("patientId"),
    this.model.countDocuments({ doctorId }),
  ]);

  return { ratings, total };
}



async getDoctorRatingStats(doctorId: string): Promise<{
  totalReviews: number;
  averageRating: number;
  satisfactionPercent: number;
}> {
  const ratings = await this.model.find({ doctorId }).select("rating");

  const totalReviews = ratings.length;
  const averageRating =
    totalReviews === 0
      ? 0
      : ratings.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

  const fiveStarCount = ratings.filter((r) => r.rating === 5).length;

  return {
    totalReviews,
    averageRating: Number(averageRating.toFixed(1)),
    satisfactionPercent:
      totalReviews === 0 ? 0 : Math.round((fiveStarCount / totalReviews) * 100),
  };
}


}