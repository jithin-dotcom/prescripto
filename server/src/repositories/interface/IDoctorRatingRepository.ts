

import { IDoctorRating } from "../../models/DoctorRating/IDoctorRating";
import { IBaseRepository } from "./IBaseRepository";


export interface IDoctorRatingRepository extends IBaseRepository<IDoctorRating> {
    // getDoctorRating(doctorId:string): Promise<IDoctorRating[]>;
    getDoctorRating(
  doctorId: string,
  skip: number,
  limit: number
): Promise<{ ratings: IDoctorRating[]; total: number }> 


getDoctorRatingStats(doctorId: string): Promise<{
  totalReviews: number;
  averageRating: number;
  satisfactionPercent: number;
}> 
}