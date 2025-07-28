


import mongoose, { Schema } from "mongoose";
import { IDoctorRating } from "./IDoctorRating";



const DoctorRatingSchema = new Schema<IDoctorRating>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String },
  },
  { timestamps: true }
);

export const DoctorRatingModel = mongoose.model<IDoctorRating>("DoctorRating", DoctorRatingSchema);
