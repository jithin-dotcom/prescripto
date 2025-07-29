
import { z } from "zod";

export const doctorRatingSchema = z.object({
    userId: z.string().min(1, "userId is missing"),
    doctorId: z.string().min(1, "doctorId is missing"),
    appointmentId: z.string().min(1, "appointmentId is missing"),
    rating: z.number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
    review: z.string().optional(),
})