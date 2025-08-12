"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    MONGO_URI: zod_1.z.string().min(1, 'MONGO_URI is required !'),
    PORT: zod_1.z.string().optional(),
    JWT_ACCESS_SECRET: zod_1.z.string().min(1, 'JWT_ACCESS_SECRET is required!'),
    JWT_REFRESH_SECRET: zod_1.z.string().min(1, 'JWT_REFRESH_SECRET is required!'),
    NODEMAILER_PASSWORD: zod_1.z.string().min(1, 'NODEMAILER_PASSWORD is required!'),
    NODEMAILER_EMAIL: zod_1.z.string().min(1, 'NODEMAILER_EMAIL is required!'),
    GOOGLE_CLIENT_ID: zod_1.z.string().min(1, ' GOOGLE_CLIENT_ID is required!'),
    GOOGLE_CLIENT_SECRET: zod_1.z.string().min(1, 'GOOGLE_CLIENT_SECRET is required!'),
    GOOGLE_REDIRECT_URI: zod_1.z.string().min(1, 'GOOGLE_REDIRECT_URI is required!'),
    CLIENT_URL: zod_1.z.string().min(1, 'CLIENT_URL is required!'),
    CLOUDINARY_CLOUD_NAME: zod_1.z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required!'),
    CLOUDINARY_API_KEY: zod_1.z.string().min(1, 'CLOUDINARY_API_KEY is required!'),
    CLOUDINARY_API_SECRET: zod_1.z.string().min(1, 'CLOUDINARY_API_SECRET is required!'),
    REDIS_HOST: zod_1.z.string().min(1, 'REDIS_HOST is required!'),
    REDIS_PORT: zod_1.z.string().min(1, 'REDIS_PORT is required!'),
    REDIS_PASSWORD: zod_1.z.string().min(1, 'REDIS_PASSWORD is required!'),
    REDIS_URL: zod_1.z.string().min(1, 'REDIS_PASSWORD is required!'),
});
const env = envSchema.parse(process.env);
exports.default = env;
