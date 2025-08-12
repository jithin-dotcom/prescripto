"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorProfileSchema = exports.objectIdSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.objectIdSchema = zod_1.z
    .string()
    .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
})
    .transform((val) => new mongoose_1.default.Types.ObjectId(val));
exports.doctorProfileSchema = zod_1.z.object({
    doctorId: exports.objectIdSchema,
    educationDetails: zod_1.z.string().min(1, "Education details are required"),
    specialization: zod_1.z.string().min(1, "Specialization is required"),
    registrationNumber: zod_1.z.string().min(1, "Registration number is required"),
    registrationYear: zod_1.z.string().regex(/^\d{4}$/, {
        message: "Registration year must be a 4-digit year",
    }),
    yearOfExperience: zod_1.z
        .number()
        .min(0, "Experience must be at least 0 years"),
    proofDocument: zod_1.z.array(zod_1.z.string()).optional(),
    fee: zod_1.z.number().min(0, "Fee must be a positive number"),
    about: zod_1.z.string().min(1, "About section is required"),
    isApproved: zod_1.z.boolean().optional(),
    profilePhoto: zod_1.z.string().url("Invalid URL").optional(),
});
