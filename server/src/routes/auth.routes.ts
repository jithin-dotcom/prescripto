


import { Router } from "express";
import { AuthController } from "../controllers/implementation/auth.controller";
import { AuthService } from "../services/implementation/auth.services";
import { UserRepository } from "../repositories/implementation/user.repositories";
import { OtpRepository } from "../repositories/implementation/otp.repositories";
import { RefreshTokenRepository } from "../repositories/implementation/refreshToken.repositories";
import passport from "passport";
import "../config/passport";
import { authRateLimiter } from "../middlewares/rateLimiter.middlewarw";
import { verifyAccessToken as authMiddleware} from "../middlewares/auth.middleware";




const router = Router();
const userRepository = new UserRepository();
const otpRepository = new OtpRepository();
const refreshTokenRepository = new RefreshTokenRepository();
const authService = new AuthService(userRepository, otpRepository, refreshTokenRepository);
const authController = new AuthController(authService);




router.use(passport.initialize());

router.post("/signup",authController.signup.bind(authController));
router.post("/login",authController.login.bind(authController));
router.post("/verify-otp", authController.verifyOtpAndRegister.bind(authController));
router.post("/resend-otp", authController.resendOtp.bind(authController));
router.post("/forgot-password", authController.forgotPassword.bind(authController));
router.post("/forgotPassword-otp", authController.verifyForgotPasswordOtp.bind(authController));
router.post("/update-password", authController.updateNewPassword.bind(authController));
router.post("/refresh-token",authController.refreshToken.bind(authController));

router.post("/logout",authController.logout.bind(authController));

router.get("/me",authMiddleware,authController.getMe.bind(authController));



router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => authController.googleAuth(req, res, next)
);

router.post("/google-login", authController.loginWithGoogle.bind(authController));



export default router;
