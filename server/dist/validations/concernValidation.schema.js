"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concernValidationSchema = void 0;
const zod_1 = require("zod");
exports.concernValidationSchema = zod_1.z.object({
    appointmentId: zod_1.z.string().min(1, "Appointment ID is required"),
    doctorId: zod_1.z.string().min(1, "Doctor ID is required"),
    doctorName: zod_1.z.string().optional(),
    userId: zod_1.z.string().min(1, "User ID is required"),
    title: zod_1.z.string().min(1, "Title is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    status: zod_1.z.enum(["pending", "resolved", "dismissed"]).optional(),
});
