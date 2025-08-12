"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNewPasswordSchema = exports.verifyForgotPasswordSchema = exports.verifyOtpSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum(["user", "doctor", "admin"], {
        required_error: "Role is required",
        invalid_type_error: "Invalid role",
    }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.verifyOtpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    otp: zod_1.z.string().length(6),
});
exports.verifyForgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
exports.verifyNewPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    newPassword: zod_1.z.string().min(6),
    reenterNewPassword: zod_1.z.string().min(6),
});
