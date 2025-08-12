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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jwt_1 = require("../../utils/jwt");
const mailer_1 = require("../../utils/mailer");
const googleAuth_1 = require("../../utils/googleAuth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../../utils/AppError");
const redisClient_1 = __importDefault(require("../../config/redisClient"));
class AuthService {
    constructor(_userRepo, _otpRepo, _refreshTokenRepo) {
        this._userRepo = _userRepo;
        this._otpRepo = _otpRepo;
        this._refreshTokenRepo = _refreshTokenRepo;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepo.findByEmail(email);
                if (!user)
                    throw new AppError_1.AppError("Invalid credentials");
                if (user.authProvider === "google")
                    throw new AppError_1.AppError("Use Google login for this account");
                if (user.isBlocked === true)
                    throw new AppError_1.AppError("You are Blocked by admin");
                const isMatch = yield bcrypt_1.default.compare(password, user.password || "");
                if (!isMatch)
                    throw new Error("Invalid credentials");
                const { accessToken, refreshToken } = (0, jwt_1.generateTokens)({
                    id: user._id,
                    email: user.email,
                    role: user.role,
                });
                const userId = user._id.toString();
                const sessionId = crypto_1.default.randomUUID();
                const redisTokenKey = `refreshToken:${userId}:${sessionId}`;
                const redisLookupKey = `refreshTokenLookup:${refreshToken}`;
                yield redisClient_1.default.set(redisTokenKey, refreshToken, {
                    EX: 7 * 24 * 60 * 60,
                });
                yield redisClient_1.default.set(redisLookupKey, `${userId}:${sessionId}`, {
                    EX: 7 * 24 * 60 * 60,
                });
                // Cache block status
                const cacheKey = `user:${userId}:blocked`;
                yield redisClient_1.default.setEx(cacheKey, 3600, user.isBlocked.toString()); // Cache for 1 hour
                return { user, accessToken, refreshToken };
            }
            catch (error) {
                console.log("Login error:", error);
                throw error;
            }
        });
    }
    loginWithGoogle(token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { name, email, picture } = yield (0, googleAuth_1.verifyGoogleToken)(token);
                let user = yield this._userRepo.findByEmail(email);
                if ((user === null || user === void 0 ? void 0 : user.isBlocked) === true) {
                    throw new Error("You are Blocked by Admin");
                }
                if (!user) {
                    user = yield this._userRepo.createUser({
                        name,
                        email,
                        password: undefined,
                        role: "user",
                        avatar: picture,
                        authProvider: "google",
                        isBlocked: false,
                    });
                }
                const userId = typeof (user === null || user === void 0 ? void 0 : user._id) === "string" ? user._id : String((_a = user === null || user === void 0 ? void 0 : user._id) !== null && _a !== void 0 ? _a : "");
                const tokens = (0, jwt_1.generateTokens)({
                    id: user._id,
                    email: user.email,
                    role: user.role,
                });
                const sessionId = crypto_1.default.randomUUID();
                const redisTokenKey = `refreshToken:${userId}:${sessionId}`;
                const redisLookupKey = `refreshTokenLookup:${tokens.refreshToken}`;
                yield redisClient_1.default.set(redisTokenKey, tokens.refreshToken, {
                    EX: 7 * 24 * 60 * 60,
                });
                yield redisClient_1.default.set(redisLookupKey, `${userId}:${sessionId}`, {
                    EX: 7 * 24 * 60 * 60,
                });
                const cacheKey = `user:${userId}:blocked`;
                yield redisClient_1.default.setEx(cacheKey, 3600, user.isBlocked.toString()); // Cache for 1 hour
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
            catch (error) {
                console.error("Error in loginWithGoogle:", error);
                throw new Error(error.message || "Something went wrong during Google login.");
            }
        });
    }
    verifyOtpAndRegister(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpRecord = yield this._otpRepo.findOtp(email);
                if (!otpRecord || otpRecord.otp !== otp)
                    throw new Error("Invalid or expired OTP");
                const newUser = yield this._userRepo.createUser(otpRecord.user);
                yield this._otpRepo.deleteOtp(email);
                const tokens = (0, jwt_1.generateTokens)({
                    id: newUser._id,
                    email: newUser.email,
                    role: newUser.role,
                });
                const userId = newUser._id.toString();
                const sessionId = crypto_1.default.randomUUID();
                const redisTokenKey = `refreshToken:${userId}:${sessionId}`;
                const redisLookupKey = `refreshTokenLookup:${tokens.refreshToken}`;
                yield redisClient_1.default.set(redisTokenKey, tokens.refreshToken, {
                    EX: 7 * 24 * 60 * 60,
                });
                yield redisClient_1.default.set(redisLookupKey, `${userId}:${sessionId}`, {
                    EX: 7 * 24 * 60 * 60,
                });
                // Cache block status
                const cacheKey = `user:${userId}:blocked`;
                yield redisClient_1.default.setEx(cacheKey, 3600, newUser.isBlocked.toString()); // Cache for 1 hour
                return Object.assign({ user: newUser }, tokens);
            }
            catch (error) {
                console.error("Verify OTP error:", error);
                throw error;
            }
        });
    }
    refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token)
                    throw new Error("Refresh token is required");
                const lookup = yield redisClient_1.default.get(`refreshTokenLookup:${token}`);
                if (!lookup)
                    throw new Error("Refresh token not found or has been invalidated");
                const [userId, sessionId] = lookup.split(':');
                let decoded;
                try {
                    decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
                }
                catch (err) {
                    throw new Error("Invalid or expired refresh token");
                }
                const user = yield this._userRepo.findById(decoded.id);
                if (!user)
                    throw new Error("User not found");
                if (user.isBlocked)
                    throw new Error("You are Blocked by Admin");
                const newAccessToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: "1h" });
                const newRefreshToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
                yield redisClient_1.default.del(`refreshToken:${userId}:${sessionId}`);
                yield redisClient_1.default.del(`refreshTokenLookup:${token}`);
                const newSessionId = crypto_1.default.randomUUID();
                yield redisClient_1.default.set(`refreshToken:${userId}:${newSessionId}`, newRefreshToken, {
                    EX: 7 * 24 * 60 * 60,
                });
                yield redisClient_1.default.set(`refreshTokenLookup:${newRefreshToken}`, `${userId}:${newSessionId}`, {
                    EX: 7 * 24 * 60 * 60,
                });
                // Cache block status
                const cacheKey = `user:${userId}:blocked`;
                yield redisClient_1.default.setEx(cacheKey, 3600, user.isBlocked.toString()); // Cache for 1 hour
                return {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                    user,
                };
            }
            catch (error) {
                throw new Error(error.message || "Failed to refresh token");
            }
        });
    }
    googleAuth(userObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user, tokens } = userObj;
                return {
                    user,
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                };
            }
            catch (error) {
                console.log(error);
                throw new Error("Failed to process Google authentication");
            }
        });
    }
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this._userRepo.findByEmail(user.email);
                if (existingUser) {
                    const error = new Error("User already exists");
                    error.statusCode = 409;
                    throw error;
                }
                if (!user.password) {
                    throw new Error("Password is required for signup");
                }
                const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                yield this._otpRepo.createOtp(user.email, otp, {
                    name: user.name,
                    email: user.email,
                    password: hashedPassword,
                    role: user.role,
                });
                yield (0, mailer_1.sendOtpMail)(user.email, otp);
                return { message: "OTP sent to your email" };
            }
            catch (error) {
                console.error("Signup error:", error);
                throw error;
            }
        });
    }
    resendOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpRecord = yield this._otpRepo.findOtp(email);
                if (!otpRecord)
                    throw new Error("No OTP request found");
                const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                yield this._otpRepo.createOtp(email, newOtp, otpRecord.user);
                yield (0, mailer_1.sendOtpMail)(email, newOtp);
                return { message: "OTP resent successfully" };
            }
            catch (error) {
                console.error("Resend OTP error:", error);
                throw error;
            }
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this._userRepo.findByEmail(email);
                if (!user)
                    throw new Error("User not found");
                if (user.isBlocked)
                    throw new Error(" You are Blocked by Admin");
                if (user.authProvider === "google")
                    throw new Error("Google account users cannot reset password this way");
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                if (!user.password) {
                    throw new Error("Password not set for user");
                }
                yield this._otpRepo.createOtp(email, otp, {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                });
                yield (0, mailer_1.sendOtpMail)(email, otp);
                return { message: "OTP sent to email" };
            }
            catch (error) {
                console.error("Forgot password error:", error);
                throw error;
            }
        });
    }
    verifyForgotPasswordOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpRecord = yield this._otpRepo.findOtp(email);
                if (!otpRecord || otpRecord.otp !== otp)
                    throw new Error("Invalid or expired OTP");
                return { message: "Enter new password" };
            }
            catch (error) {
                console.error("OTP verification failed:", error);
                throw error;
            }
        });
    }
    updateNewPassword(email, newPassword, reenterNewPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !newPassword || !reenterNewPassword)
                    throw new Error("Missing fields");
                if (newPassword !== reenterNewPassword)
                    throw new Error("Passwords do not match");
                const otpRecord = yield this._otpRepo.findOtp(email);
                if (!otpRecord)
                    throw new Error("OTP verification needed");
                const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
                yield this._userRepo.updatePasswordByEmail(email, hashedPassword);
                yield this._otpRepo.deleteOtp(email);
                return { message: "Password updated successfully" };
            }
            catch (error) {
                console.error("Update password error:", error);
                throw error;
            }
        });
    }
    logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lookup = yield redisClient_1.default.get(`refreshTokenLookup:${refreshToken}`);
                if (lookup) {
                    const [userId, sessionId] = lookup.split(':');
                    yield redisClient_1.default.del(`refreshToken:${userId}:${sessionId}`);
                    yield redisClient_1.default.del(`refreshTokenLookup:${refreshToken}`);
                    console.log(` Logged out user ${userId} (session: ${sessionId}) from Redis`);
                }
                else {
                    console.warn(' Refresh token not found in Redis (may already be expired)');
                }
            }
            catch (error) {
                console.error(' Redis logout error:', error);
                throw error;
            }
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._userRepo.findById(userId);
        });
    }
}
exports.AuthService = AuthService;
// async  refreshToken(token: string): Promise<{ accessToken: string; refreshToken: string; user: any }> {
//   if (!token) throw new Error("Refresh token is required");
//   const lookup = await redisClient.get(`refreshTokenLookup:${token}`);
//   if (!lookup) throw new Error("Refresh token not found or has been invalidated");
//   const [userId, sessionId] = lookup.split(':');
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
//   const userRepo = new UserRepository(); 
//   const user = await userRepo.findById(decoded.id);
//   if (!user) throw new Error("User not found");
//   if (user.isBlocked) throw new Error("You are Blocked by Admin");
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
//   await redisClient.del(`refreshToken:${userId}:${sessionId}`);
//   await redisClient.del(`refreshTokenLookup:${token}`);
//   const newSessionId = crypto.randomUUID();
//   await redisClient.set(`refreshToken:${userId}:${newSessionId}`, newRefreshToken, {
//     EX: 7 * 24 * 60 * 60,
//   });
//   await redisClient.set(`refreshTokenLookup:${newRefreshToken}`, `${userId}:${newSessionId}`, {
//     EX: 7 * 24 * 60 * 60,
//   });
//   return {
//     accessToken: newAccessToken,
//     refreshToken: newRefreshToken,
//     user,
//   };
// }
