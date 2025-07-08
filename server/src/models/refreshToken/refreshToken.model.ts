


import mongoose,{ Schema, model, Types } from "mongoose";
import { IRefreshToken } from "./IRefreshToken";

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: "7d" },
  },
  { timestamps: true }
);

export const RefreshTokenModel = model("RefreshToken", RefreshTokenSchema);

