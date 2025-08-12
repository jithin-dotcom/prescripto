"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const lastMessageSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });
const chatSchema = new mongoose_1.Schema({
    appointmentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
        unique: true,
    },
    doctorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    participants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    isActive: {
        type: Boolean,
        default: true,
    },
    lastMessage: {
        type: lastMessageSchema,
        require: false,
    },
}, { timestamps: true });
exports.Chat = (0, mongoose_1.model)("Chat", chatSchema);
