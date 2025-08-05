

import mongoose,{ Schema} from "mongoose";
import { IPayout } from "./IPayout";

const PayoutSchema = new Schema<IPayout>(
    {
       doctorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
       },
       amount: {
          type: Number,
          require: true,
       },
       status: {
          type: String,
          enum: ["pending", "approved", "rejected", "processed", "failed"],
          default: "pending",
       },
       requestedAt: {
          type: Date,
          required: true,
          default: Date.now,
       },
       approvedAt: {
          type: Date,
       },
       payoutId: {
          type: String,
       },
       reason: {
          type: String,
       }

    },
    {timestamps: true},
) 

export const PayoutModel = mongoose.model<IPayout>("Payout", PayoutSchema);