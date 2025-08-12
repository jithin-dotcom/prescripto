"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const { combine, timestamp, printf, colorize, errors } = winston_1.default.format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} | ${level} | ${stack || message}`;
});
const logger = winston_1.default.createLogger({
    level: "info",
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
    transports: [
        new winston_1.default.transports.Console({
            format: combine(colorize(), logFormat),
        }),
        new winston_1.default.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston_1.default.transports.File({
            filename: "logs/combined.log",
        }),
    ],
});
exports.default = logger;
