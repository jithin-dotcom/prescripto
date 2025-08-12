"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    chatId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    type: {
        type: String,
        enum: ["text", "image"],
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: false });
exports.Message = (0, mongoose_1.model)("Message", messageSchema);
