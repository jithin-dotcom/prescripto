


import mongoose, { Schema } from "mongoose";
import { IConcern } from "./IConcern";

const concernSchema = new Schema<IConcern>(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Appointment" },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    doctorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "resolved", "dismissed"], default: "pending" },
  },
  { timestamps: true }
);

export const ConcernModel = mongoose.model<IConcern>("Concern", concernSchema);
