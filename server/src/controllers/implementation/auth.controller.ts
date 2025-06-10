

import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/implementation/auth.services";
import { IAuthService } from "../../services/interface/IAuthService";
import  jwt  from "jsonwebtoken";
import {
  signupSchema,
  loginSchema,
  verifyOtpSchema,
  verifyForgotPasswordSchema,
  verifyNewPasswordSchema,
} from "../../validations/auth.schema";
import { IAuthController } from "../interface/IAuthController";
import passport from "passport";

export class AuthController implements IAuthController {
  constructor(private authService: IAuthService) {}



  async googleAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const userObj = req.user as any;
    const { user, accessToken, refreshToken } = await this.authService.googleAuth(userObj);

    const redirectUrl = new URL(`${process.env.CLIENT_URL}/auth/google/callback`); //"http://localhost:3000/auth/google/callback"
    redirectUrl.searchParams.set("accessToken", accessToken);
    redirectUrl.searchParams.set("refreshToken", refreshToken);
    redirectUrl.searchParams.set("user", JSON.stringify(user));

    res.redirect(redirectUrl.toString());
  } catch (error) {
    console.error("Google auth error:", error);
    res.redirect(`${process.env.CLIENT_URL}/signup?error=google_auth_failed`);  
  }
}

  
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = signupSchema.parse(req.body);
      const data = await this.authService.signup({
        name: validated.name,
        email: validated.email,
        password: validated.password,
        role: validated.role,
        isBlocked: false,
      });
      res.status(200).json(data);
      return;
    } catch (error: any) {
      if (error?.statusCode) {
        res.status(error.statusCode).json({ message: error.message });
        return;
      }
      if (error.name === "ZodError") {
        res
          .status(400)
          .json({ message: error.errors.map((e: any) => e.message).join(", ") });
        return;
      }
      next(error);
    }
  }

  

 async login(req: Request, res: Response, next: NextFunction) {
  try {
    const validated = loginSchema.parse(req.body);
    const { accessToken, refreshToken, user } = await this.authService.login(
      validated.email,
      validated.password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    res.status(200).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
}




async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
  try {
    const { credential } = req.body;
    if (!credential) {
       res.status(400).json({ message: "Missing credential token" });
       return;
    }

    // const { tokens, user } = await this.authService.loginWithGoogle(credential);
     
     const result = await this.authService.loginWithGoogle(credential);
    const tokens = (result as any)?.tokens;
    const user = (result as any)?.user;

    if (!tokens || !user) {
       res.status(500).json({ message: "Failed to retrieve user or tokens" });
       return;
    }

   
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    console.log("tokens ooo: " ,tokens);
    
    res.status(200).json({
    
      tokens,
      user,
    });
    return;
  } catch (error) {
    console.error("Google login error:", error);
    next(error);
  }
}



  

  async verifyOtpAndRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = verifyOtpSchema.parse(req.body);
      const result = await this.authService.verifyOtpAndRegister(
        validated.email,
        validated.otp
      );
      
      console.log("result: ",result);
      res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
     });
    
      res.status(200).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = verifyForgotPasswordSchema.parse(req.body);
      const result = await this.authService.resendOtp(validated.email);
      res.status(200).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = verifyForgotPasswordSchema.parse(req.body);
      const result = await this.authService.forgotPassword(validated.email);
      res.status(200).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }

  async verifyForgotPasswordOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validated = verifyOtpSchema.parse(req.body);
      const result = await this.authService.verifyForgotPasswordOtp(
        validated.email,
        validated.otp
      );
      res.status(200).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }

  async updateNewPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const validated = verifyNewPasswordSchema.parse(req.body);
      const result = await this.authService.updateNewPassword(
        validated.email,
        validated.newPassword,
        validated.reenterNewPassword
      );
      res.status(200).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }



async refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
       res.status(401).json({ message: "Refresh token missing" });
       return;
    }

    const { accessToken, refreshToken: newRefreshToken, user } =
      await this.authService.refreshToken(refreshToken);

    // Set new refresh token in HTTP-only cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

      res.status(200).json({
      accessToken,
      user,
      });
      return;
  } catch (error) {
     res.status(403).json({ message: "Invalid or expired refresh token" });
     return;
  }
}


 async logout(req: Request, res: Response, next: NextFunction){
  try {
    // const { refreshToken } = req.body;

    console.log("entered into logout ");
    console.log("req.cookie: ",req.cookies);
     const refreshToken = req.cookies?.refreshToken;  
   

    if (!refreshToken) {
       res.status(400).json({ message: "Refresh token is required" });
       return;
    }

    await this.authService.logout(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",

    });

     res.json({ message: "Logged out successfully" });
     return;
  } catch (error) {
    next(error);
  }
};



async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    console.log("enter into get me ");
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await this.authService.findUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log("user me : ",user);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error in getMe:", err);
    res.status(500).json({ message: "Server error" });
  }
}



}