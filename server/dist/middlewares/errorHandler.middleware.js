"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const AppError_1 = require("../utils/AppError");
const errorHandler = (err, req, res, next) => {
    logger_1.default.error(err);
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    const statusCode = 500;
    const message = err instanceof Error ? err.message : "Something went wrong";
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandler = errorHandler;
