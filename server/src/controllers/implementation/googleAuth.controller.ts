

import { Request, Response } from "express";
import { GoogleAuthService } from "../../services/implementation/googleAuth.services";
import { UserRepository } from "../../repositories/implementation/user.repositories";

const userRepo = new UserRepository();
const googleService = new GoogleAuthService(userRepo);

export class GoogleAuthController {
  static login(req: Request, res: Response) {
    const url = googleService.getGoogleAuthURL();
    res.redirect(url);
  }

  static async callback(req: Request, res: Response) {
    try {
      const code = req.query.code as string;
      const result = await googleService.handleGoogleCallback(code);

      // Redirect to frontend with tokens as query params or set cookie
      return res.redirect(
        `${process.env.FRONTEND_URL}/auth-success?accessToken=${result.accessToken}&refreshToken=${result.refreshToken}`
      );
    } catch (err) {
      console.error("Google Auth Error:", err);
      return res.status(500).json({ message: "Google authentication failed" });
    }
  }
}
