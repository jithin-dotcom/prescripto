

import { z } from "zod";

export const appointmentSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  doctorId: z.string().min(1, "Doctor ID is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  transactionId: z.string().optional(), 
});
