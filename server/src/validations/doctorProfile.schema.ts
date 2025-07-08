import { z } from "zod";
import mongoose from "mongoose";


export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  })
  .transform((val) => new mongoose.Types.ObjectId(val));

export const doctorProfileSchema = z.object({
  doctorId: objectIdSchema,
  educationDetails: z.string().min(1, "Education details are required"),
  specialization: z.string().min(1, "Specialization is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  registrationYear: z.string().regex(/^\d{4}$/, {
    message: "Registration year must be a 4-digit year",
  }),
  yearOfExperience: z
    .number()
    .min(0, "Experience must be at least 0 years"),
  proofDocument: z.array(z.string()).optional(), 
  fee: z.number().min(0, "Fee must be a positive number"),
  about: z.string().min(1, "About section is required"),
  isApproved: z.boolean().optional(), 
  profilePhoto: z.string().url("Invalid URL").optional(), 
});
