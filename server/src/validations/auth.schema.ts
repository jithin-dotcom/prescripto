
import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["user", "doctor", "admin"], {
    required_error: "Role is required",
    invalid_type_error: "Invalid role",
  }),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const verifyForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const verifyNewPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(6),
  reenterNewPassword: z.string().min(6),
});
