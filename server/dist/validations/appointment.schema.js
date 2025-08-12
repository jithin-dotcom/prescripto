"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentSchema = void 0;
const zod_1 = require("zod");
exports.appointmentSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User ID is required"),
    doctorId: zod_1.z.string().min(1, "Doctor ID is required"),
    date: zod_1.z.string().min(1, "Date is required"),
    time: zod_1.z.string().min(1, "Time is required"),
    fees: zod_1.z.number().optional(),
    transactionId: zod_1.z.string().optional(),
});
