"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
const auth_schema_1 = require("../../validations/auth.schema");
class AuthController {
    constructor(_authService) {
        this._authService = _authService;
    }
    googleAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userObj = req.user;
                const { user, accessToken, refreshToken } = yield this._authService.googleAuth(userObj);
                const redirectUrl = new URL(`${process.env.CLIENT_URL}/auth/google/callback`);
                redirectUrl.searchParams.set("accessToken", accessToken);
                redirectUrl.searchParams.set("refreshToken", refreshToken);
                redirectUrl.searchParams.set("user", JSON.stringify(user));
                res.redirect(redirectUrl.toString());
            }
            catch (error) {
                console.error("Google auth error:", error);
                res.redirect(`${process.env.CLIENT_URL}/signup?error=google_auth_failed`);
            }
        });
    }
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validated = auth_schema_1.signupSchema.parse(req.body);
                const data = yield this._authService.signup({
                    name: validated.name,
                    email: validated.email,
                    password: validated.password,
                    role: validated.role,
                    isBlocked: false,
                });
                res.status(statusCode_enum_1.StatusCode.OK).json(data);
                return;
            }
            catch (error) {
                if (error === null || error === void 0 ? void 0 : error.statusCode) {
                    res.status(error.statusCode).json({ message: error.message });
                    return;
                }
                if (error.name === "ZodError") {
                    res
                        .status(statusCode_enum_1.StatusCode.BAD_REQUEST)
                        .json({ message: error.errors.map((e) => e.message).join(", ") });
                    return;
                }
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validated = auth_schema_1.loginSchema.parse(req.body);
                const { accessToken, refreshToken, user } = yield this._authService.login(validated.email, validated.password);
                const isProduction = process.env.NODE_ENV === "production";
                const cookieOptions = {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: (isProduction ? "none" : "lax"),
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                };
                res.cookie("refreshToken", refreshToken, cookieOptions);
                res.status(statusCode_enum_1.StatusCode.OK).json({ accessToken, user });
            }
            catch (error) {
                next(error);
            }
        });
    }
    loginWithGoogle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { credential } = req.body;
                if (!credential) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: "Missing credential token" });
                    return;
                }
                const result = yield this._authService.loginWithGoogle(credential);
                const tokens = result === null || result === void 0 ? void 0 : result.tokens;
                const user = result === null || result === void 0 ? void 0 : result.user;
                if (!tokens || !user) {
                    res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Failed to retrieve user or tokens" });
                    return;
                }
                const isProduction = process.env.NODE_ENV === "production";
                const cookieOptions = {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: (isProduction ? "none" : "lax"),
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                };
                res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    tokens,
                    user,
                });
                return;
            }
            catch (error) {
                console.error("Google login error:", error);
                next(error);
            }
        });
    }
    verifyOtpAndRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validated = auth_schema_1.verifyOtpSchema.parse(req.body);
                const result = yield this._authService.verifyOtpAndRegister(validated.email, validated.otp);
                const isProduction = process.env.NODE_ENV === "production";
                const cookieOptions = {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: (isProduction ? "none" : "lax"),
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                };
                res.cookie("refreshToken", result.refreshToken, cookieOptions);
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    resendOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validated = auth_schema_1.verifyForgotPasswordSchema.parse(req.body);
                const result = yield this._authService.resendOtp(validated.email);
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validated = auth_schema_1.verifyForgotPasswordSchema.parse(req.body);
                const result = yield this._authService.forgotPassword(validated.email);
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    verifyForgotPasswordOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validated = auth_schema_1.verifyOtpSchema.parse(req.body);
                const result = yield this._authService.verifyForgotPasswordOtp(validated.email, validated.otp);
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateNewPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validated = auth_schema_1.verifyNewPasswordSchema.parse(req.body);
                const result = yield this._authService.updateNewPassword(validated.email, validated.newPassword, validated.reenterNewPassword);
                res.status(statusCode_enum_1.StatusCode.OK).json(result);
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    refreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
                if (!refreshToken) {
                    res.status(statusCode_enum_1.StatusCode.UNAUTHORIZED).json({ message: "Refresh token missing" });
                    return;
                }
                const { accessToken, refreshToken: newRefreshToken, user } = yield this._authService.refreshToken(refreshToken);
                const isProduction = process.env.NODE_ENV === "production";
                const cookieOptions = {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: (isProduction ? "none" : "lax"),
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                };
                res.cookie("refreshToken", newRefreshToken, cookieOptions);
                res.status(statusCode_enum_1.StatusCode.OK).json({
                    accessToken,
                    user,
                });
                return;
            }
            catch (error) {
                res.status(statusCode_enum_1.StatusCode.FORBIDDEN).json({ message: "Invalid or expired refresh token" });
                return;
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
                if (!refreshToken) {
                    res.status(statusCode_enum_1.StatusCode.BAD_REQUEST).json({ message: "Refresh token is required" });
                    return;
                }
                yield this._authService.logout(refreshToken);
                const isProduction = process.env.NODE_ENV === "production";
                const cookieOptions = {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: (isProduction ? "none" : "lax"),
                };
                res.clearCookie("refreshToken", cookieOptions);
                res.json({ message: "Logged out successfully" });
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    getMe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(statusCode_enum_1.StatusCode.UNAUTHORIZED).json({ message: statusMessage_1.StatusMessage.UNAUTHORIZED });
                    return;
                }
                const user = yield this._authService.findUserById(userId);
                if (!user) {
                    res.status(statusCode_enum_1.StatusCode.NOT_FOUND).json({ message: statusMessage_1.StatusMessage.NOT_FOUND });
                    return;
                }
                res.status(statusCode_enum_1.StatusCode.OK).json(user);
            }
            catch (err) {
                res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ message: statusMessage_1.StatusMessage.INTERNAL_SERVER_ERROR });
            }
        });
    }
}
exports.AuthController = AuthController;
