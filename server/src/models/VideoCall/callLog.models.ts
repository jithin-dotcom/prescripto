


import mongoose, { Schema } from "mongoose";
import { ICallLog } from "./ICallLog";


const callLogSchema: Schema = new Schema(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    callType: { type: String, enum: ["video", "audio"], default: "video" },
    callStatus: {
      type: String,
      enum: ["completed", "dropped", "cancelled"],
      default: "completed",
    },
  },
  { timestamps: true }
);

export const CallLogModel = mongoose.model<ICallLog>("CallLog", callLogSchema);
