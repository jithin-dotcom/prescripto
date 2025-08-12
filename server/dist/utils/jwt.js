"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../config/env.config"));
const generateTokens = (payload) => {
    const accessToken = jsonwebtoken_1.default.sign(payload, env_config_1.default.JWT_ACCESS_SECRET, { expiresIn: "2h" });
    const refreshToken = jsonwebtoken_1.default.sign(payload, env_config_1.default.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const verifyAccessToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_config_1.default.JWT_ACCESS_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, env_config_1.default.JWT_REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
