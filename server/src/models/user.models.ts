

import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../types/user.type";

export interface IUserDocument extends IUser,Document {};


const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, 
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      required: true,
    },
    isVerified: { type: Boolean, default: false },
    googleId: { type: String, unique: true, sparse: true }, 
    authProvider: { type: String, enum: ["local", "google"], default: "local" }, 
    refreshToken: { type: String, required: false},
    photo: {type: String , required: false},
    isBlocked: { type: Boolean, default: false },
    signature: { type: String},
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);