

import { Request, Response, NextFunction } from "express";
import { IAuthService } from "../../services/interface/IAuthService";
import { StatusCode } from "../../constants/statusCode.enum";
import { StatusMessage } from "../../constants/statusMessage";


import {
  signupSchema,
  loginSchema,
  verifyOtpSchema,
  verifyForgotPasswordSchema,
  verifyNewPasswordSchema,
} from "../../validations/auth.schema";
import { IAuthController } from "../interface/IAuthController";

import { IResult } from "../interface/IAuthController";


export class AuthController implements IAuthController {
  constructor(private _authService: IAuthService) {}

  async googleAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const userObj = req.user ;
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
    });

    res.status(StatusCode.OK).json(data);
  } catch (error: any) {
    if (error?.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }
    if (error.name === "ZodError") {
      res.status(StatusCode.BAD_REQUEST).json({
        message: error.errors.map((e: any) => e.message).join(", "),
      });
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

    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,          
      sameSite: (isProduction ? "none" : "lax") as "none" | "lax" | "strict" | boolean | undefined, 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
   
    res.status(StatusCode.OK).json({ accessToken, user });
  } catch (error) {
    next(error);
    
  }
}


async loginWithGoogle(req: Request, res: Response, next: NextFunction) {
  try {
    const { credential } = req.body;
    if (!credential) {
       res.status(StatusCode.BAD_REQUEST).json({ message: "Missing credential token" });
       return;
    }
 
    const result = await this._authService.loginWithGoogle(credential);
    
    
    const tokens = (result as IResult)?.tokens;
    const user = (result as IResult)?.user;

    if (!tokens || !user) {
       res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve user or tokens" });
       return;
    }


    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,          
      sameSite: (isProduction ? "none" : "lax") as "none" | "lax" | "strict" | boolean | undefined, 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
    
    res.status(StatusCode.OK).json({
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
      
      const isProduction = process.env.NODE_ENV === "production";

      const cookieOptions = {
        httpOnly: true,
        secure: isProduction,          
        sameSite: (isProduction ? "none" : "lax") as "none" | "lax" | "strict" | boolean | undefined, 
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("refreshToken", result.refreshToken, cookieOptions);
    
      res.status(StatusCode.OK).json(result);
      
    }catch (error) {
      next(error);
    }
  }

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = verifyForgotPasswordSchema.parse(req.body);
      const result = await this._authService.resendOtp(validated.email);
      res.status(StatusCode.OK).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = verifyForgotPasswordSchema.parse(req.body);
      const result = await this._authService.forgotPassword(validated.email);
      res.status(StatusCode.OK).json(result);
      
    }catch (error) {
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
      res.status(StatusCode.OK).json(result);
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
      res.status(StatusCode.OK).json(result);
      return;
    } catch (error) {
      next(error);
    }
  }


async refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken) {
       res.status(StatusCode.UNAUTHORIZED).json({ message: "Refresh token missing" });
       return;
    }

    const { accessToken, refreshToken: newRefreshToken, user } =
      await this._authService.refreshToken(refreshToken);


    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions = {
       httpOnly: true,
       secure: isProduction,          
       sameSite: (isProduction ? "none" : "lax") as "none" | "lax" | "strict" | boolean | undefined, 
       maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("refreshToken", newRefreshToken, cookieOptions);

      res.status(StatusCode.OK).json({
      accessToken,
      user,
      });
      
  } catch (error) {
     next(error);
  }
}


 async logout(req: Request, res: Response, next: NextFunction){
  try {
   
    const refreshToken = req.cookies?.refreshToken;  
   
    if (!refreshToken) {
       res.status(StatusCode.BAD_REQUEST).json({ message: "Refresh token is required" });
       return;
    }

    await this._authService.logout(refreshToken);

    const isProduction = process.env.NODE_ENV === "production";

    const cookieOptions = {
      httpOnly: true,
      secure: isProduction,          
      sameSite: (isProduction ? "none" : "lax") as "none" | "lax" | "strict" | boolean | undefined, 
    };

    res.clearCookie("refreshToken", cookieOptions);

     res.json({ message: "Logged out successfully" });
     
  }catch (error) {
    next(error);
  }
};



async getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
 
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(StatusCode.UNAUTHORIZED).json({ message: StatusMessage.UNAUTHORIZED});
      return;
    }

    const user = await this._authService.findUserById(userId);
    if (!user) {
      res.status(StatusCode.NOT_FOUND).json({ message: StatusMessage.NOT_FOUND });
      return;
    }
   
    res.status(StatusCode.OK).json(user);
  } catch (err) {
    next(err)
  }
}

}