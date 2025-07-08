

import { Request, Response, NextFunction } from "express";

import { IAuthService } from "../../services/interface/IAuthService";

import {
  signupSchema,
  loginSchema,
  verifyOtpSchema,
  verifyForgotPasswordSchema,
  verifyNewPasswordSchema,
} from "../../validations/auth.schema";
import { IAuthController } from "../interface/IAuthController";


export class AuthController implements IAuthController {
  constructor(private _authService: IAuthService) {}

  async googleAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const userObj = req.user as any;
    const { user, accessToken, refreshToken } = await this._authService.googleAuth(userObj);

    const redirectUrl = new URL(`${process.env.CLIENT_URL}/auth/google/callback`);
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
      const data = await this._authService.signup({
        name: validated.name,
        email: validated.email,
        password: validated.password,
        role: validated.role,
        isBlocked: false,
      });
      res.status(200).json(data);
      return;
    }catch (error: any) {
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
    const { accessToken, refreshToken, user } = await this._authService.login(
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
    console.log("error in controller : ",error);
  }
}


async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
  try {
    const { credential } = req.body;
    if (!credential) {
       res.status(400).json({ message: "Missing credential token" });
       return;
    }
 
    const result = await this._authService.loginWithGoogle(credential);
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
      const result = await this._authService.verifyOtpAndRegister(
        validated.email,
        validated.otp
      );
      
      res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
     });
    
      res.status(200).json(result);
      return;
    }catch (error) {
      next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = verifyForgotPasswordSchema.parse(req.body);
      const result = await this._authService.resendOtp(validated.email);
      res.status(200).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = verifyForgotPasswordSchema.parse(req.body);
      const result = await this._authService.forgotPassword(validated.email);
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
      const result = await this._authService.verifyForgotPasswordOtp(
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
      const result = await this._authService.updateNewPassword(
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
      await this._authService.refreshToken(refreshToken);

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
   
    const refreshToken = req.cookies?.refreshToken;  
   
    if (!refreshToken) {
       res.status(400).json({ message: "Refresh token is required" });
       return;
    }

    await this._authService.logout(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",

    });

     res.json({ message: "Logged out successfully" });
     return;
  }catch (error) {
    next(error);
  }
};



async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
 
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const user = await this._authService.findUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
   
    res.status(200).json(user);
  } catch (err) {
    console.error("Error in getMe:", err);
    res.status(500).json({ message: "Server error" });
  }
}

}