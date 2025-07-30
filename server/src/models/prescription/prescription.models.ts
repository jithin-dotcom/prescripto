


import mongoose, { Schema } from "mongoose";
import { IPrescription } from "./IPrescription";


const PrescriptionSchema = new Schema<IPrescription>(
  {
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true, 
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    medicines: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true }, 
        duration: { type: String, required: true }, 
        instructions: { type: String },
      },
    ],
    followUpDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const PrescriptionModel =  mongoose.model<IPrescription>("Prescription", PrescriptionSchema);
