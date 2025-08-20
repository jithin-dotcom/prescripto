

import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateTokens } from "../../utils/jwt";
import { IAuthService } from "../interface/IAuthService";
import { ISafeUser, IUser } from "../../types/user.type";
import { sendOtpMail } from "../../utils/mailer";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { IOtpRepository } from "../../repositories/interface/IOtpRepository";
import { verifyGoogleToken } from "../../utils/googleAuth";
import  jwt  from "jsonwebtoken";

import { IRefreshTokenRepository } from "../../repositories/interface/IRefreshTokenRepository";
import mongoose from "mongoose";
import { AuthResult } from "../interface/IAuthService";
import { AppError } from "../../utils/AppError";
import { LoginResponse } from "../../types/loginResponse";
import redisClient from "../../config/redisClient";
import { mapUser } from "../../utils/mapper/authService.mapper";



export class AuthService implements IAuthService {
  constructor(
    private _userRepo: IUserRepository,
    private _otpRepo: IOtpRepository,
    private _refreshTokenRepo: IRefreshTokenRepository,
  ) {}



  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: ISafeUser }> {
    try {
      const user = await this._userRepo.findByEmail(email);
      if (!user) throw new AppError("Invalid credentials");
      if (user.authProvider === "google") throw new AppError("Use Google login for this account");
      if (user.isBlocked === true) throw new AppError("You are Blocked by admin");

      const isMatch = await bcrypt.compare(password, user.password || "");
      if (!isMatch) throw new Error("Invalid credentials");

      const { accessToken, refreshToken } = generateTokens({
        id: user._id,
        email: user.email,
        role: user.role,
      });

      const userId = (user._id as mongoose.Types.ObjectId).toString();
      const sessionId = crypto.randomUUID();

      const redisTokenKey = `refreshToken:${userId}:${sessionId}`;
      const redisLookupKey = `refreshTokenLookup:${refreshToken}`;

      await redisClient.set(redisTokenKey, refreshToken, {
        EX: 7 * 24 * 60 * 60,
      });

      await redisClient.set(redisLookupKey, `${userId}:${sessionId}`, {
        EX: 7 * 24 * 60 * 60,
      });

      
      const cacheKey = `user:${userId}:blocked`;
      await redisClient.setEx(cacheKey, 3600, user.isBlocked.toString()); 

      return { user: mapUser(user), accessToken, refreshToken };
    } catch (error) {
      console.log("Login error:", error);
      if(error instanceof Error){
         throw error;
      }else{
         throw new Error("Something went wrong");
      }
      
    }
  }

  async loginWithGoogle(token: string): Promise<LoginResponse> {
    try {
      const { name, email, picture } = await verifyGoogleToken(token);

      let user = await this._userRepo.findByEmail(email);
      if (user?.isBlocked === true) {
       
        throw new AppError("You are Blocked by Admin",403);
      }

      if (!user) {
        user = await this._userRepo.createUser({
          name,
          email,
          password: undefined,
          role: "user",
          avatar: picture,
          authProvider: "google",
          isBlocked: false,
        });
      }

      const userId = typeof user?._id === "string" ? user._id : String(user?._id ?? "");

      const tokens = generateTokens({
        id: user._id,
        email: user.email,
        role: user.role,
      });

      const sessionId = crypto.randomUUID();

      const redisTokenKey = `refreshToken:${userId}:${sessionId}`;
      const redisLookupKey = `refreshTokenLookup:${tokens.refreshToken}`;

      await redisClient.set(redisTokenKey, tokens.refreshToken, {
        EX: 7 * 24 * 60 * 60,
      });

      await redisClient.set(redisLookupKey, `${userId}:${sessionId}`, {
        EX: 7 * 24 * 60 * 60,
      });

     
      const cacheKey = `user:${userId}:blocked`;
      await redisClient.setEx(cacheKey, 3600, user.isBlocked.toString()); 

      return {
        message: "Google login successful",
        tokens,
        user: {
          id: userId,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      };
    } catch (error) {
      console.error("Error in loginWithGoogle:", error);
      if(error instanceof Error){
         throw error;
      }else{
         throw new Error("Something went wrong");
      }
    }
  }

  async verifyOtpAndRegister(email: string, otp: string): Promise<AuthResult> {
    try {
      const otpRecord = await this._otpRepo.findOtp(email);
      if (!otpRecord || otpRecord.otp !== otp) throw new Error("Invalid or expired OTP");

      const newUser = await this._userRepo.createUser(otpRecord.user);
      await this._otpRepo.deleteOtp(email);

      const tokens = generateTokens({
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      });

      const userId = (newUser._id as mongoose.Types.ObjectId).toString();
      const sessionId = crypto.randomUUID();

      const redisTokenKey = `refreshToken:${userId}:${sessionId}`;
      const redisLookupKey = `refreshTokenLookup:${tokens.refreshToken}`;

      await redisClient.set(redisTokenKey, tokens.refreshToken, {
        EX: 7 * 24 * 60 * 60,
      });

      await redisClient.set(redisLookupKey, `${userId}:${sessionId}`, {
        EX: 7 * 24 * 60 * 60,
      });

      
      const cacheKey = `user:${userId}:blocked`;
      await redisClient.setEx(cacheKey, 3600, newUser.isBlocked.toString()); 

      return { user: newUser, ...tokens };
    } catch (error) {
      console.error("Verify OTP error:", error);
      if(error instanceof Error){
         throw error;
      }else{
         throw new Error("something went wrong");
      }
    }
  }

  async refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string; user: ISafeUser }> {
    try {
      if (!token) throw new Error("Refresh token is required");

      const lookup = await redisClient.get(`refreshTokenLookup:${token}`);
      if (!lookup) throw new Error("Refresh token not found or has been invalidated");

      const [userId, sessionId] = lookup.split(':');

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
          id: string;
          email: string;
          role: string;
        };
      } catch (err) {
        throw new Error("Invalid or expired refresh token");
      }

      const user = await this._userRepo.findById(decoded.id);
      if (!user) throw new Error("User not found");
      if (user.isBlocked) throw new Error("You are Blocked by Admin");

      const newAccessToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_ACCESS_SECRET!,
        { expiresIn: "1h" }
      );

      const newRefreshToken = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
      );

      await redisClient.del(`refreshToken:${userId}:${sessionId}`);
      await redisClient.del(`refreshTokenLookup:${token}`);

      const newSessionId = crypto.randomUUID();

      await redisClient.set(`refreshToken:${userId}:${newSessionId}`, newRefreshToken, {
        EX: 7 * 24 * 60 * 60,
      });

      await redisClient.set(`refreshTokenLookup:${newRefreshToken}`, `${userId}:${newSessionId}`, {
        EX: 7 * 24 * 60 * 60,
      });

    
      const cacheKey = `user:${userId}:blocked`;
      await redisClient.setEx(cacheKey, 3600, user.isBlocked.toString()); 

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: mapUser(user),
      };
    } catch (error) {
      if(error instanceof Error){
        throw error;
      }else{
        throw new Error("Failed to refresh token");
      }
      
    }
  }




async googleAuth(userObj: any): Promise<{ user: any; accessToken: string; refreshToken: string}> {
  try {
    const { user, tokens } = userObj;
    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to process Google authentication");
  }
}



async signup(user: IUser): Promise<{ message: string }> {
   try {
      const existingUser = await this._userRepo.findByEmail(user.email);
      if (existingUser) {
        const error = new Error("User already exists");
        (error as any).statusCode = 409;
        throw error;
      }
      if (!user.password) {
         throw new Error("Password is required for signup");
      }
      
      const hashedPassword = await bcrypt.hash(user.password, 10); 
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await this._otpRepo.createOtp(user.email, otp, {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      });

      await sendOtpMail(user.email, otp);
      return { message: "OTP sent to your email" };
    } catch (error) {
      console.error("Signup error:", error);
      if(error instanceof Error){
         throw error;
      }else{
         throw new Error("Failed to sign up");
      }
    }
  }




  async resendOtp(email: string): Promise<{ message: string }> {
    try {
      const otpRecord = await this._otpRepo.findOtp(email);
      if (!otpRecord) throw new Error("No OTP request found");

      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await this._otpRepo.createOtp(email, newOtp, otpRecord.user);
      await sendOtpMail(email, newOtp);

      return { message: "OTP resent successfully" };
    } catch (error) {
      console.error("Resend OTP error:", error);
      if(error instanceof Error){
         throw error;
      }else{
         throw new Error("Failed to resend OTP");
      }
      
    }
  }


  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const user = await this._userRepo.findByEmail(email);
      if (!user) throw new Error("User not found");
      if(user.isBlocked) throw new Error(" You are Blocked by Admin");
      if (user.authProvider === "google") throw new Error("Google account users cannot reset password this way");

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      if (!user.password) {
         throw new Error("Password not set for user");
      }

      await this._otpRepo.createOtp(email, otp, {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });

      await sendOtpMail(email, otp);
      return { message: "OTP sent to email" };
    } catch (error) {
      console.error("Forgot password error:", error);
      if(error instanceof Error){
         throw error;
      }else{
         throw new Error("Something went wrong");
      }
    }
  }


  async verifyForgotPasswordOtp(email: string, otp: string): Promise<{message: string}> {
    try {
      const otpRecord = await this._otpRepo.findOtp(email);
      if (!otpRecord || otpRecord.otp !== otp)
        throw new Error("Invalid or expired OTP");

      return { message: "Enter new password" };
    } catch (error) {
      console.error("OTP verification failed:", error);
      if(error instanceof Error){
        throw error;
      }else{
         throw new Error("Something went wrong");
      }

    }
  }


  async updateNewPassword(
    email: string,
    newPassword: string,
    reenterNewPassword: string
  ): Promise<object> {
    try {
      if (!email || !newPassword || !reenterNewPassword)
        throw new Error("Missing fields");

      if (newPassword !== reenterNewPassword)
        throw new Error("Passwords do not match");

      const otpRecord = await this._otpRepo.findOtp(email);
      if (!otpRecord) throw new Error("OTP verification needed");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this._userRepo.updatePasswordByEmail(email, hashedPassword);
      await this._otpRepo.deleteOtp(email);

      return { message: "Password updated successfully" };
    } catch (error) {
      console.error("Update password error:", error);
      if(error instanceof Error){
         throw error;
      }else{
         throw new Error("Something went wrong");
      }
    }
  }




async logout(refreshToken: string): Promise<void> {
  try {
   
    const lookup = await redisClient.get(`refreshTokenLookup:${refreshToken}`);

    if (lookup) {
      const [userId, sessionId] = lookup.split(':');

      await redisClient.del(`refreshToken:${userId}:${sessionId}`);

      await redisClient.del(`refreshTokenLookup:${refreshToken}`);

      console.log(` Logged out user ${userId} (session: ${sessionId}) from Redis`);
    } else {
      console.warn(' Refresh token not found in Redis (may already be expired)');
    }
  }catch (error) {
    console.error(' Redis logout error:', error);
    if(error instanceof Error){
       throw error;
    }else{
       throw new Error("Failed to log out");
    }
  }
}


 async findUserById(userId: string) {
     return await this._userRepo.findById(userId);
 }


}
































































































































