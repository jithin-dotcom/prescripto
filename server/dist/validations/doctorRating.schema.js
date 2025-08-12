"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRatingSchema = void 0;
const zod_1 = require("zod");
exports.doctorRatingSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "userId is missing"),
    doctorId: zod_1.z.string().min(1, "doctorId is missing"),
    appointmentId: zod_1.z.string().min(1, "appointmentId is missing"),
    rating: zod_1.z.number({
        required_error: "Rating is required",
        invalid_type_error: "Rating must be a number",
    })
        .min(1, "Rating must be at least 1")
        .max(5, "Rating cannot be more than 5"),
    review: zod_1.z.string().optional(),
});
