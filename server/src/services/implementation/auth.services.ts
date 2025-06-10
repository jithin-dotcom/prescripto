

import bcrypt from "bcrypt";
import { UserRepository } from "../../repositories/implementation/user.repositories";
import { generateTokens } from "../../utils/jwt";
// import { generateRefreshToken } from "../../utils/jwt";
import { IAuthService } from "../interface/IAuthService";
import { IUser } from "../../types/user.type";
import { sendOtpMail } from "../../utils/mailer";
import { OtpRepository } from "../../repositories/implementation/otp.repositories";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { IOtpRepository } from "../../repositories/interface/IOtpRepository";
import { verifyGoogleToken } from "../../utils/googleAuth";
import { string } from "zod"
import  jwt  from "jsonwebtoken";
import { Document } from "mongoose";
import { IRefreshTokenRepository } from "../../repositories/interface/IRefreshTokenRepository";
import mongoose from "mongoose";
import { AuthResult } from "../interface/IAuthService";
import { AppError } from "../../utils/AppError";

interface LoginResponse {
  message: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    id: string ;
    name: string;
    email: string;
    role: "user" | "doctor" | "admin";
    avatar?: string;
  };
}


interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "doctor" | "admin";
  avatar?: string;
}



export class AuthService implements IAuthService {
  constructor(
    private userRepo: IUserRepository,
    private otpRepo: IOtpRepository,
    private refreshTokenRepo: IRefreshTokenRepository,
  ) {}


  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: Document }> {
  try {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new AppError("Invalid credentials");
    if (user.authProvider === "google") throw new AppError("Use Google login for this account");
    if(user.isBlocked === true) throw new AppError("You are Blocked by admin");

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) throw new Error("Invalid credentials");

    const { accessToken, refreshToken } = generateTokens({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    
    console.log("access login:",accessToken);
    console.log("refresh login:",refreshToken);
    const userId = (user._id as mongoose.Types.ObjectId).toString();
    await this.refreshTokenRepo.create({ userId, token: refreshToken });

    return { user, accessToken, refreshToken };
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
}





  async loginWithGoogle(token: string): Promise<LoginResponse> {
    const { name, email, picture } = await verifyGoogleToken(token);

    let user= await this.userRepo.findByEmail(email);
    if(user?.isBlocked === true) throw new Error("You are Blocked by Admin");
    if (!user) {
      user = await this.userRepo.createUser({
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
    let tokens = generateTokens({
        id: user._id,
        email: user.email,
        role: user.role,
      });

     
      await this.refreshTokenRepo.create({
         userId,
         token: tokens.refreshToken,
      });

      console.log(tokens.accessToken);
     
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
      const existingUser = await this.userRepo.findByEmail(user.email);
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

      await this.otpRepo.createOtp(user.email, otp, {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      });

      await sendOtpMail(user.email, otp);
      return { message: "OTP sent to your email" };
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  async verifyOtpAndRegister(email: string, otp: string): Promise<AuthResult> {
    try {
      const otpRecord = await this.otpRepo.findOtp(email);
      if (!otpRecord || otpRecord.otp !== otp)
        throw new Error("Invalid or expired OTP");

      const newUser = await this.userRepo.createUser(otpRecord.user);
      await this.otpRepo.deleteOtp(email);

      const tokens = generateTokens({
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      });

      console.log("refresh login:",tokens.refreshToken);
      const userId = (newUser._id as mongoose.Types.ObjectId).toString();
      await this.refreshTokenRepo.create({ userId, token: tokens.refreshToken });

      return { user: newUser, ...tokens };
    } catch (error) {
      console.error("Verify OTP error:", error);
      throw error;
    }
  }

  async resendOtp(email: string): Promise<{ message: string }> {
    try {
      const otpRecord = await this.otpRepo.findOtp(email);
      if (!otpRecord) throw new Error("No OTP request found");

      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await this.otpRepo.createOtp(email, newOtp, otpRecord.user);
      await sendOtpMail(email, newOtp);

      return { message: "OTP resent successfully" };
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) throw new Error("User not found");
      if(user.isBlocked) throw new Error(" You are Blocked by Admin");
      if (user.authProvider === "google") throw new Error("Google account users cannot reset password this way");

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      if (!user.password) {
         throw new Error("Password not set for user");
      }

      await this.otpRepo.createOtp(email, otp, {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });

      await sendOtpMail(email, otp);
      return { message: "OTP sent to email" };
    } catch (error) {
      console.error("Forgot password error:", error);
      throw error;
    }
  }

  async verifyForgotPasswordOtp(email: string, otp: string): Promise<object> {
    try {
      const otpRecord = await this.otpRepo.findOtp(email);
      if (!otpRecord || otpRecord.otp !== otp)
        throw new Error("Invalid or expired OTP");

      return { message: "Enter new password" };
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw error;
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

      const otpRecord = await this.otpRepo.findOtp(email);
      if (!otpRecord) throw new Error("OTP verification needed");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.userRepo.updatePasswordByEmail(email, hashedPassword);
      await this.otpRepo.deleteOtp(email);

      return { message: "Password updated successfully" };
    } catch (error) {
      console.error("Update password error:", error);
      throw error;
    }
  }



async refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string; user: any }> {
  console.log("entered into refreshToken");
  if (!token) throw new Error("Refresh token is required");

  // Check if token exists in DB
  const storedToken = await this.refreshTokenRepo.findByToken(token);
  if (!storedToken) throw new Error("Refresh token not found or has been invalidated");

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };

    const user = await this.userRepo.findById(decoded.id);
    if (!user) throw new Error("User not found");
    if(user.isBlocked) throw new Error("You are Blocked by Admin");

   
    await this.refreshTokenRepo.deleteByToken(token);

 
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

   
    const userId = (user._id as mongoose.Types.ObjectId).toString();
    console.log("new refresh: ",newRefreshToken);
   
    await this.refreshTokenRepo.create({
      userId,
      token: newRefreshToken,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    };
  } catch (err) {
    console.error("Refresh token verification failed:", err);
    throw new Error("Invalid or expired refresh token");
  }
}


  async logout(refreshToken: string) {
    await this.refreshTokenRepo.deleteByToken(refreshToken);
  }


  async findUserById(userId: string) {
     return await this.userRepo.findById(userId);
}


}


