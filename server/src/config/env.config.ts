import dotenv from 'dotenv';
dotenv.config();

import {z} from 'zod';

const envSchema = z.object({
    MONGO_URI : z.string().min(1,'MONGO_URI is required !'),
    PORT : z.string().optional(),
    JWT_ACCESS_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required!'),
    JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required!'),
    NODEMAILER_PASSWORD: z.string().min(1,'NODEMAILER_PASSWORD is required!'),
    NODEMAILER_EMAIL: z.string().min(1,'NODEMAILER_EMAIL is required!'),
    GOOGLE_CLIENT_ID: z.string().min(1,' GOOGLE_CLIENT_ID is required!'),
    GOOGLE_CLIENT_SECRET: z.string().min(1,'GOOGLE_CLIENT_SECRET is required!'),
    GOOGLE_REDIRECT_URI: z.string().min(1,'GOOGLE_REDIRECT_URI is required!'),
    CLIENT_URL: z.string().min(1, 'CLIENT_URL is required!'),
    CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required!'),
    CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required!'),
    CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required!'),
    REDIS_HOST: z.string().min(1, 'REDIS_HOST is required!'),
    REDIS_PORT: z.string().min(1, 'REDIS_PORT is required!'),
    REDIS_PASSWORD: z.string().min(1, 'REDIS_PASSWORD is required!'),
    REDIS_URL: z.string().min(1, 'REDIS_PASSWORD is required!'),
})

const env = envSchema.parse(process.env);

export default env;