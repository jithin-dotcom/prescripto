
import { IRatingByDoctorDTO } from "../../services/interface/IDoctorRatingService"; 
import { IDoctorRating } from "../../models/DoctorRating/IDoctorRating";

export const mapDoctorRatings = (ratings: IDoctorRating[]): IRatingByDoctorDTO[] => {
  return ratings.map((rating) => {
    const patient = rating.patientId as unknown as { name: string };
    return {
      userName: patient?.name || "Unknown",
      rating: rating.rating,
      review: rating.review,
      time: rating.createdAt,
    };
  });
};
