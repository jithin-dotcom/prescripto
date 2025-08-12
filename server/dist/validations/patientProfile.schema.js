"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientProfileSchema = exports.objectIdSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.objectIdSchema = zod_1.z
    .string()
    .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
})
    .transform((val) => new mongoose_1.default.Types.ObjectId(val));
exports.patientProfileSchema = zod_1.z.object({
    patientId: exports.objectIdSchema,
    dateOfBirth: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format for dateOfBirth",
    }),
    gender: zod_1.z.enum(["male", "female", "others"]),
    houseName: zod_1.z.string().min(1, "House name is required"),
    city: zod_1.z.string().min(1, "City is required"),
    state: zod_1.z.string().min(1, "State is required"),
    country: zod_1.z.string().min(1, "Country is required"),
    pin: zod_1.z
        .number()
        .int()
        .min(100000, "PIN should be at least 6 digits")
        .max(999999, "PIN should be at most 6 digits"),
    profilePhoto: zod_1.z.string().url("Invalid URL").optional(),
});
