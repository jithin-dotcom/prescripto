

import { OtpModel } from "../../models/otp.models";
import { IOtp } from "../../types/otp.type";
import { IOtpRepository } from "../interface/IOtpRepository";
import { Document } from "mongoose";


export class OtpRepository implements IOtpRepository{
  async createOtp(email: string, otp: string, user: { name: string; email: string; password: string; role: string }): Promise<void> {
   
    await OtpModel.findOneAndDelete({ email }); 
    await OtpModel.create({email, otp, user});
  }

  async findOtp(email: string): Promise<(IOtp & Document) | null> {
    return await OtpModel.findOne({ email });
  }

  async deleteOtp(email: string): Promise<void> {
    await OtpModel.deleteOne({ email });
  }
}
