


import { z } from "zod";


export const concernValidationSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"), 
  doctorId: z.string().min(1, "Doctor ID is required"),
  doctorName: z.string().optional(),
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["pending", "resolved", "dismissed"]).optional(),
});
