


import mongoose, { Schema } from "mongoose";
import { IConcern } from "./IConcern";

const concernSchema = new Schema<IConcern>(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Appointment" },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    doctorName: { type: String},
    doctorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "resolved", "rejected"], default: "pending" },
    reason: {type: String},
  },
  { timestamps: true }
);

export const ConcernModel = mongoose.model<IConcern>("Concern", concernSchema);
