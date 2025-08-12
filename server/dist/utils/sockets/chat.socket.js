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
exports.chatSocketHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chat_services_1 = require("../../services/implementation/chat.services");
const chat_repositories_1 = require("../../repositories/implementation/chat.repositories");
const message_repositories_1 = require("../../repositories/implementation/message.repositories");
const onlineUsers = new Map();
const chatSocketHandler = (io, socket) => {
    const user = socket.data.user;
    if (!user || !user.id || !user.role) {
        console.error("Socket connection rejected: User not authenticated.");
        socket.disconnect();
        return;
    }
    const chatService = new chat_services_1.ChatService(new chat_repositories_1.ChatRepository(), new message_repositories_1.MessageRepository());
    onlineUsers.set(user.id, socket.id);
    socket.broadcast.emit("user-online", user.id);
    socket.on("get-online-users", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("online users : ", onlineUsers);
        socket.emit("online-users", Array.from(onlineUsers.keys()));
    }));
    socket.on("joinRoom", (_a) => __awaiter(void 0, [_a], void 0, function* ({ appointmentId }) {
        if (!appointmentId || !mongoose_1.default.Types.ObjectId.isValid(appointmentId)) {
            socket.emit("error", { message: "Invalid appointment ID." });
            return;
        }
        try {
            socket.join(appointmentId);
            const chat = yield chatService.getChatByAppointmentId(appointmentId);
            if (chat) {
                yield chatService.markMessagesAsRead(chat._id.toString(), user.id);
                const updatedMessages = yield chatService.getReadMessages(chat._id.toString(), user.id);
                io.to(appointmentId).emit("messagesRead", {
                    chatId: chat._id,
                    readerId: user.id,
                    messageIds: updatedMessages.map((msg) => msg._id),
                });
            }
        }
        catch (error) {
            console.error("joinRoom error:", error);
            socket.emit("error", { message: "Failed to join chat room." });
        }
    }));
    socket.on("sendMessage", (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { appointmentId, content, type, doctorId, userId } = data;
            if (!appointmentId || !content || !type || !doctorId || !userId) {
                console.warn(" Missing required fields:", { appointmentId, content, type, doctorId, userId });
                socket.emit("error", { message: "Missing required fields" });
                return;
            }
            if (type === "image" && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(content)) {
                console.error("Invalid image URL format:", content);
                socket.emit("error", { message: "Invalid image URL format." });
                return;
            }
            let chat = yield chatService.getChatByAppointmentId(appointmentId);
            if (!chat) {
                chat = yield chatService.createChat(appointmentId, [userId, doctorId]);
            }
            if (!chat) {
                throw new Error("Failed to create chat");
            }
            const message = yield chatService.createMessage(chat._id.toString(), user.id, content, type);
            io.to(appointmentId).emit("receiveMessage", message);
        }
        catch (error) {
            console.error("sendMessage error:", error);
            socket.emit("error", { message: "Internal server error" });
        }
    }));
    socket.on("markAsRead", (_a) => __awaiter(void 0, [_a], void 0, function* ({ chatId }) {
        if (!chatId || !mongoose_1.default.Types.ObjectId.isValid(chatId)) {
            socket.emit("error", { message: "Invalid chat ID." });
            return;
        }
        try {
            const chat = yield chatService.getChatById(chatId);
            if (!chat) {
                socket.emit("error", { message: "Chat not found." });
                return;
            }
            yield chatService.markMessagesAsRead(chatId, user.id);
            const updatedMessages = yield chatService.getReadMessages(chatId, user.id);
            io.to(chat.appointmentId.toString()).emit("messagesRead", {
                chatId,
                readerId: user.id,
                messageIds: updatedMessages.map((msg) => msg._id),
            });
        }
        catch (error) {
            console.error("markAsRead error:", error);
            socket.emit("error", { message: "Failed to mark messages as read." });
        }
    }));
    socket.on("endChat", (_a) => __awaiter(void 0, [_a], void 0, function* ({ appointmentId }) {
        try {
            if (!mongoose_1.default.Types.ObjectId.isValid(appointmentId)) {
                socket.emit("error", { message: "Invalid appointment ID." });
                return;
            }
            yield chatService.deactivateChat(appointmentId);
            io.to(appointmentId).emit("chatEnded");
        }
        catch (error) {
            console.error("Error ending chat:", error);
            socket.emit("error", { message: "Failed to end chat." });
        }
    }));
    socket.on("typing", ({ appointmentId, senderId }) => {
        socket.to(appointmentId).emit("typing", { senderId });
    });
    socket.on("stopTyping", ({ appointmentId, senderId }) => {
        socket.to(appointmentId).emit("stopTyping", { senderId });
    });
    socket.on("disconnect", (reason) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`User ${user.id} disconnected`);
        console.log(`User ${user.id} disconnected. Reason: ${reason}`);
        onlineUsers.delete(user.id);
        socket.broadcast.emit("user-offline", user.id);
    }));
};
exports.chatSocketHandler = chatSocketHandler;
