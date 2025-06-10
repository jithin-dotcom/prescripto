


import mongoose, { Schema, Document } from "mongoose";

interface IOtpDocument extends Document {
  email: string;
  otp: string;
  createdAt: Date;
  user: {
    name: string;
    email: string;
    password: string;
    role: "user" | "doctor" | "admin";
  };
}

const otpSchema = new Schema<IOtpDocument>({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, 
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "doctor", "admin"],
      required: true,
    },
  },
});

export const OtpModel = mongoose.model<IOtpDocument>("Otp", otpSchema);
