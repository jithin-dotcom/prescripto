"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = void 0;
const mongoose_1 = require("mongoose");
const RefreshTokenSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: "7d" },
}, { timestamps: true });
exports.RefreshTokenModel = (0, mongoose_1.model)("RefreshToken", RefreshTokenSchema);
