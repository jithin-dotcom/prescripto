
import { z } from "zod";
import mongoose from "mongoose";


export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const patientProfileSchema = z.object({
  patientId: objectIdSchema,
  dateOfBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format for dateOfBirth",
    }),
  gender: z.enum(["male", "female", "others"]),
  houseName: z.string().min(1, "House name is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pin: z
    .number()
    .int()
    .min(100000, "PIN should be at least 6 digits")
    .max(999999, "PIN should be at most 6 digits"),
  profilePhoto: z.string().url("Invalid URL").optional(),
});
