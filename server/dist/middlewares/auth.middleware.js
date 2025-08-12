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
exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repositories_1 = require("../repositories/implementation/user.repositories");
const patientProfile_repositories_1 = require("../repositories/implementation/patientProfile.repositories");
const doctorProfile_repositories_1 = require("../repositories/implementation/doctorProfile.repositories");
const user_service_1 = require("../services/implementation/user.service");
const statusCode_enum_1 = require("../constants/statusCode.enum");
const redisClient_1 = __importDefault(require("../config/redisClient"));
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || "your-secret-key";
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const userRepo = new user_repositories_1.UserRepository();
        const doctorProfileRepo = new doctorProfile_repositories_1.DoctorProfileRepository();
        const patientProfileRepo = new patientProfile_repositories_1.PatientProfileRepository();
        const userService = new user_service_1.UserService(userRepo, patientProfileRepo, doctorProfileRepo);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(statusCode_enum_1.StatusCode.UNAUTHORIZED).json({ message: "Access token missing or invalid" });
            return;
        }
        const token = authHeader.split(" ")[1].trim();
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        const blacklistKey = `blacklist:accessToken:${decoded.id}`;
        if (yield redisClient_1.default.get(blacklistKey)) {
            res.status(statusCode_enum_1.StatusCode.FORBIDDEN).json({ message: "Access denied, user blocked by admin" });
            return;
        }
        const cacheKey = `user:${decoded.id}:blocked`;
        const cachedStatus = yield redisClient_1.default.get(cacheKey);
        let isBlocked = false;
        if (cachedStatus !== null) {
            isBlocked = cachedStatus === "true";
        }
        else {
            const user = yield userService.getUserById(decoded.id);
            if (!user) {
                res.status(statusCode_enum_1.StatusCode.FORBIDDEN).json({ message: "User not found" });
                return;
            }
            isBlocked = user.isBlocked;
            yield redisClient_1.default.setEx(cacheKey, 3600, isBlocked.toString()); // Cache for 1 hour
        }
        if (isBlocked) {
            yield redisClient_1.default.setEx(`blacklist:accessToken:${decoded.id}`, 3600, "true"); // Match access token expiry
            res.status(statusCode_enum_1.StatusCode.FORBIDDEN).json({ message: "Access denied, user blocked by admin" });
            return;
        }
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    }
    catch (error) {
        console.log(error);
        res.status(statusCode_enum_1.StatusCode.UNAUTHORIZED).json({ message: "Invalid or expired token" });
        return;
    }
});
exports.verifyAccessToken = verifyAccessToken;
