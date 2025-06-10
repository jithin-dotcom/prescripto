
import { IOtp } from "../../types/otp.type";
import { Document } from "mongoose";

export interface IOtpRepository {
    createOtp(email: string, otp: string, user: {name: string, email: string, password: string, role: string}):Promise<void>;
    findOtp(email: string):Promise<(IOtp & Document) | null>;
    deleteOtp(email: string): Promise<void>;
}