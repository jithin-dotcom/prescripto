

import bcrypt from "bcrypt";
import crypto from "crypto";
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
import { LoginResponse } from "../../types/loginResponse";
import redisClient from "../../config/redisClient";

// interface LoginResponse {
//   message: string;
//   tokens: {
//     accessToken: string;
//     refreshToken: string;
//   };
//   user: {
//     id: string ;
//     name: string;
//     email: string;
//     role: "user" | "doctor" | "admin";
//     avatar?: string;
//   };
// }


// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: "user" | "doctor" | "admin";
//   avatar?: string;
// }



export class AuthService implements IAuthService {
  constructor(
    private _userRepo: IUserRepository,
    private _otpRepo: IOtpRepository,
    private _refreshTokenRepo: IRefreshTokenRepository,
  ) {}


  async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string; user: Document }> {
  try {
    const user = await this._userRepo.findByEmail(email);
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

    
    // console.log("access login:",accessToken);
    // console.log("refresh login:",refreshToken);
    const userId = (user._id as mongoose.Types.ObjectId).toString();
    // await this._refreshTokenRepo.create({ userId, token: refreshToken });

    
    // ✅ Generate a unique session ID (per device/browser)
    const sessionId = crypto.randomUUID(); // node >= v14.17

    // ✅ Store token in Redis using sessionId
    const redisTokenKey = `refreshToken:${userId}:${sessionId}`;
    const redisLookupKey = `refreshTokenLookup:${refreshToken}`;

    await redisClient.set(redisTokenKey, refreshToken, {
      EX: 7 * 24 * 60 * 60, // 7 days
    });

    await redisClient.set(redisLookupKey, `${userId}:${sessionId}`, {
      EX: 7 * 24 * 60 * 60,
    });
      
    // const redisKey = `refreshToken:${userId}`;
    // await redisClient.set(redisKey, refreshToken, {
    //   EX: 7 * 24 * 60 * 60, 
    // });
    // // Create a reverse lookup for logout
    // await redisClient.set(`refreshTokenLookup:${refreshToken}`, userId, {
    //   EX: 7 * 24 * 60 * 60,
    // });

    return { user, accessToken, refreshToken };
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
}





  // async loginWithGoogle(token: string): Promise<LoginResponse> {
  //   const { name, email, picture } = await verifyGoogleToken(token);

  //   let user= await this._userRepo.findByEmail(email);
  //   if(user?.isBlocked === true) throw new Error("You are Blocked by Admin");
  //   if (!user) {
  //     user = await this._userRepo.createUser({
  //       name,
  //       email,
  //       password: undefined,
  //       role: "user",
  //       avatar: picture,
  //       authProvider: "google",
  //       isBlocked: false,
  //     });
  //   }

  //   const userId = typeof user?._id === "string" ? user._id : String(user?._id ?? "");
  //   let tokens = generateTokens({
  //       id: user._id,
  //       email: user.email,
  //       role: user.role,
  //     });

     
  //     await this._refreshTokenRepo.create({
  //        userId,
  //        token: tokens.refreshToken,
  //     });

  //     // console.log(tokens.accessToken);
     
  //   return {
  //   message: "Google login successful",
  //   tokens,
  //   user: {
  //     id: userId,
  //     name: user.name,
  //     email: user.email,
  //     role: user.role,
  //     avatar: user.avatar,
  //   },
  // };
  
  // }


  async loginWithGoogle(token: string): Promise<LoginResponse> {
  try {
    const { name, email, picture } = await verifyGoogleToken(token);

    let user = await this._userRepo.findByEmail(email);
    if (user?.isBlocked === true) {
      throw new Error("You are Blocked by Admin");
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

    // await this._refreshTokenRepo.create({
    //   userId,
    //   token: tokens.refreshToken,
    // });

        // ✅ Generate unique session ID (multi-device support)
    const sessionId = crypto.randomUUID();

    // ✅ Store token in Redis
    const redisTokenKey = `refreshToken:${userId}:${sessionId}`;
    const redisLookupKey = `refreshTokenLookup:${tokens.refreshToken}`;

    await redisClient.set(redisTokenKey, tokens.refreshToken, {
      EX: 7 * 24 * 60 * 60,
    });

    await redisClient.set(redisLookupKey, `${userId}:${sessionId}`, {
      EX: 7 * 24 * 60 * 60,
    });
        
    // const redisKey = `refreshToken:${userId}`;
    // await redisClient.set(redisKey, tokens.refreshToken, {
    //   EX: 7 * 24 * 60 * 60, 
    // });
    
    // await redisClient.set(`refreshTokenLookup:${tokens.refreshToken}`, userId, {
    //   EX: 7 * 24 * 60 * 60,
    // });

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
  } catch (error: any) {
    console.error("Error in loginWithGoogle:", error);
    throw new Error(error.message || "Something went wrong during Google login.");
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
      throw error;
    }
  }

  async verifyOtpAndRegister(email: string, otp: string): Promise<AuthResult> {
    try {
      const otpRecord = await this._otpRepo.findOtp(email);
      if (!otpRecord || otpRecord.otp !== otp)
        throw new Error("Invalid or expired OTP");

      const newUser = await this._userRepo.createUser(otpRecord.user);
      await this._otpRepo.deleteOtp(email);

      const tokens = generateTokens({
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      });

      // console.log("refresh login:",tokens.refreshToken);
      const userId = (newUser._id as mongoose.Types.ObjectId).toString();
      // await this._refreshTokenRepo.create({ userId, token: tokens.refreshToken });

          // ✅ Generate unique session ID (multi-device support)
    const sessionId = crypto.randomUUID();

    // ✅ Store token in Redis
    const redisTokenKey = `refreshToken:${userId}:${sessionId}`;
    const redisLookupKey = `refreshTokenLookup:${tokens.refreshToken}`;

    await redisClient.set(redisTokenKey, tokens.refreshToken, {
      EX: 7 * 24 * 60 * 60,
    });

    await redisClient.set(redisLookupKey, `${userId}:${sessionId}`, {
      EX: 7 * 24 * 60 * 60,
    });

      // const redisKey = `refreshToken:${userId}`;
      // await redisClient.set(redisKey, tokens.refreshToken, {
      //    EX: 7 * 24 * 60 * 60, 
      // });

      // // Create a reverse lookup for logout
      // await redisClient.set(`refreshTokenLookup:${tokens.refreshToken}`, userId, {
      //   EX: 7 * 24 * 60 * 60,
      // });


      return { user: newUser, ...tokens };
    } catch (error) {
      console.error("Verify OTP error:", error);
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  async verifyForgotPasswordOtp(email: string, otp: string): Promise<object> {
    try {
      const otpRecord = await this._otpRepo.findOtp(email);
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

      const otpRecord = await this._otpRepo.findOtp(email);
      if (!otpRecord) throw new Error("OTP verification needed");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this._userRepo.updatePasswordByEmail(email, hashedPassword);
      await this._otpRepo.deleteOtp(email);

      return { message: "Password updated successfully" };
    } catch (error) {
      console.error("Update password error:", error);
      throw error;
    }
  }



// async refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string; user: any }> {
//   // console.log("entered into refreshToken");
//   if (!token) throw new Error("Refresh token is required");

//   // Check if token exists in DB
//   const storedToken = await this._refreshTokenRepo.findByToken(token);
//   // console.log("stored token : ",storedToken);
//   if (!storedToken) throw new Error("Refresh token not found or has been invalidated");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
//       id: string;
//       email: string;
//       role: string;
//     };

//     const user = await this._userRepo.findById(decoded.id);
//     if (!user) throw new Error("User not found");
//     if(user.isBlocked) throw new Error("You are Blocked by Admin");

   
//     // await this._refreshTokenRepo.deleteByToken(token);

 
//     const accessToken = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_ACCESS_SECRET!,
//       { expiresIn: "15m" }
//     );

//     const newRefreshToken = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_REFRESH_SECRET!,
//       { expiresIn: "7d" }
//     );

   
//     const userId = (user._id as mongoose.Types.ObjectId).toString();
//     // console.log("new refresh: ",newRefreshToken);
   
//     await this._refreshTokenRepo.create({
//       userId,
//       token: newRefreshToken,
//     });

//     await this._refreshTokenRepo.deleteByToken(token);

//     return {
//       accessToken,
//       refreshToken: newRefreshToken,
//       user,
//     };
//   } catch (err) {
//     console.error("Refresh token verification failed:", err);
//     throw new Error("Invalid or expired refresh token");
//   }
// }




// async refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string; user: any }> {
//   if (!token) throw new Error("Refresh token is required");

//   // Step 1: Get userId from token lookup key
//   const userId = await redisClient.get(`refreshTokenLookup:${token}`);
//   if (!userId) throw new Error("Refresh token not found or has been invalidated");

//   // Step 2: Verify token
//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
//       id: string;
//       email: string;
//       role: string;
//     };
//   } catch (err) {
//     throw new Error("Invalid or expired refresh token");
//   }

//   // Step 3: Fetch user by ID
//   const userRepo = new UserRepository(); // or inject if using DI
//   const user = await userRepo.findById(decoded.id);
//   if (!user) throw new Error("User not found");
//   if (user.isBlocked) throw new Error("You are Blocked by Admin");

//   // Step 4: Generate new tokens
//   const newAccessToken = jwt.sign(
//     { id: user._id, email: user.email, role: user.role },
//     process.env.JWT_ACCESS_SECRET!,
//     { expiresIn: "15m" }
//   );

//   const newRefreshToken = jwt.sign(
//     { id: user._id, email: user.email, role: user.role },
//     process.env.JWT_REFRESH_SECRET!,
//     { expiresIn: "7d" }
//   );

//   // Step 5: Delete old tokens from Redis
//   await redisClient.del(`refreshToken:${userId}`);
//   await redisClient.del(`refreshTokenLookup:${token}`);

//   // Step 6: Store new tokens in Redis
//   await redisClient.set(`refreshToken:${userId}`, newRefreshToken, {
//     EX: 7 * 24 * 60 * 60, // 7 days
//   });
//   await redisClient.set(`refreshTokenLookup:${newRefreshToken}`, userId, {
//     EX: 7 * 24 * 60 * 60,
//   });

//   return {
//     accessToken: newAccessToken,
//     refreshToken: newRefreshToken,
//     user,
//   };
// }




async  refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string; user: any }> {
  if (!token) throw new Error("Refresh token is required");

  // Step 1: Get userId and sessionId from lookup key
  const lookup = await redisClient.get(`refreshTokenLookup:${token}`);
  if (!lookup) throw new Error("Refresh token not found or has been invalidated");

  const [userId, sessionId] = lookup.split(':');

  // Step 2: Verify token
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

  // Step 3: Fetch user by ID
  const userRepo = new UserRepository(); // or inject via DI
  const user = await userRepo.findById(decoded.id);
  if (!user) throw new Error("User not found");
  if (user.isBlocked) throw new Error("You are Blocked by Admin");

  // Step 4: Generate new tokens
  const newAccessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "15m" }
  );

  const newRefreshToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" }
  );

  // Step 5: Delete old token from Redis (session-specific)
  await redisClient.del(`refreshToken:${userId}:${sessionId}`);
  await redisClient.del(`refreshTokenLookup:${token}`);

  // Step 6: Generate a new sessionId
  const newSessionId = crypto.randomUUID();

  // Step 7: Store new tokens in Redis
  await redisClient.set(`refreshToken:${userId}:${newSessionId}`, newRefreshToken, {
    EX: 7 * 24 * 60 * 60,
  });

  await redisClient.set(`refreshTokenLookup:${newRefreshToken}`, `${userId}:${newSessionId}`, {
    EX: 7 * 24 * 60 * 60,
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user,
  };
}

  // async logout(refreshToken: string) {
  //   await this._refreshTokenRepo.deleteByToken(refreshToken);
   
  // }

//   async logout(refreshToken: string): Promise<void> {
//   try {
//     // await this._refreshTokenRepo.deleteByToken(refreshToken);
//     const userId = await redisClient.get(`refreshTokenLookup:${refreshToken}`);

//     if (userId) {
//       await redisClient.del(`refreshToken:${userId}`);
//       await redisClient.del(`refreshTokenLookup:${refreshToken}`);
//       console.log(`✅ Logged out user ${userId} from Redis`);
//     } else {
//       console.warn('⚠️ Refresh token not found in Redis (may already be expired)');
//     }
//   } catch (error) {
//     console.error('❌ Redis logout error:', error);
//     throw error;
//   }
// }


async logout(refreshToken: string): Promise<void> {
  try {
    // Get userId and sessionId from the reverse lookup key
    const lookup = await redisClient.get(`refreshTokenLookup:${refreshToken}`);

    if (lookup) {
      const [userId, sessionId] = lookup.split(':');

      // Delete the session-specific refresh token
      await redisClient.del(`refreshToken:${userId}:${sessionId}`);

      // Delete the reverse lookup key
      await redisClient.del(`refreshTokenLookup:${refreshToken}`);

      console.log(`✅ Logged out user ${userId} (session: ${sessionId}) from Redis`);
    } else {
      console.warn('⚠️ Refresh token not found in Redis (may already be expired)');
    }
  } catch (error) {
    console.error('❌ Redis logout error:', error);
    throw error;
  }
}


  async findUserById(userId: string) {
     return await this._userRepo.findById(userId);
}


}


