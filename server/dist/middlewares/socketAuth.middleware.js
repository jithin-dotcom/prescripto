"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_ACCESS_SECRET || "your jwt secret";
const socketAuthMiddleware = (socket, next) => {
    var _a;
    const token = (_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        console.log("Authentication error: No token provided");
        return next(new Error("Authentication error: No token provided"));
    }
    try {
        const user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log("user : ", user);
        socket.data.user = user;
        next();
    }
    catch (err) {
        console.log("error in catch", err);
        next(new Error("Authentication error: Invalid token"));
    }
};
exports.socketAuthMiddleware = socketAuthMiddleware;
