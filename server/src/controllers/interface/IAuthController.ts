

import { Request, Response, NextFunction } from "express";


export interface IResult {
   tokens: {
     accessToken: string;
     refreshToken: string;
   }
   user: {
      id: string;
      name: string;
      email: string;
      role: string;
      avatar: string;
   }, 
}

export interface IAuthController {
  signup(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  loginWithGoogle(req: Request, res: Response, next: NextFunction): Promise<void>;
  googleAuth(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyOtpAndRegister(req: Request, res: Response, next: NextFunction): Promise<void>;
  resendOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
  forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  verifyForgotPasswordOtp(req: Request, res: Response, next: NextFunction): Promise<void>;
  updateNewPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
  refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
  getMe(req: Request, res: Response, next: NextFunction): Promise<void>;
}


