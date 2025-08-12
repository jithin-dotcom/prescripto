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
exports.ChatService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chatService_mapper_1 = require("../../utils/mapper/chatService.mapper");
class ChatService {
    constructor(_chatRepo, _messageRepo) {
        this._chatRepo = _chatRepo;
        this._messageRepo = _messageRepo;
    }
    createChat(appointmentId, participants) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!appointmentId || participants.length < 2) {
                    throw new Error("Invalid appointment ID or participants");
                }
                const existing = yield this._chatRepo.findByAppointmentId(appointmentId);
                if (existing) {
                    throw new Error("Chat already exists for this appointment");
                }
                const chat = yield this._chatRepo.createChat({
                    appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                    participants: participants.map((id) => new mongoose_1.default.Types.ObjectId(id)),
                    isActive: true,
                    doctorId: new mongoose_1.default.Types.ObjectId(participants[0]),
                    userId: new mongoose_1.default.Types.ObjectId(participants[1]),
                });
                // return chat;
                return (0, chatService_mapper_1.mapToChatDTO)(chat);
            }
            catch (error) {
                console.error("Error creating chat:", error);
                throw error;
            }
        });
    }
    deactivateChat(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._chatRepo.deactivateChat(appointmentId);
                if (!result) {
                    throw new Error("Chat not found or could not be deactivated");
                }
            }
            catch (error) {
                console.error("Error deactivating chat:", error);
                throw error;
            }
        });
    }
    getChatByAppointmentId(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._chatRepo.findByAppointmentId(appointmentId);
                if (!result) {
                    return null;
                }
                return (0, chatService_mapper_1.mapToChatDTO)(result);
            }
            catch (error) {
                console.error("Error fetching chat:", error);
                throw error;
            }
        });
    }
    getChatById(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // return await this._chatRepo.findByAppointmentId(appointmentId);
                const result = yield this._chatRepo.findById(chatId);
                return result ? (0, chatService_mapper_1.mapToChatDTO)(result) : null;
            }
            catch (error) {
                console.error("Error fetching chat:", error);
                throw error;
            }
        });
    }
    createMessage(chatId, senderId, content, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!chatId || !senderId || !content.trim()) {
                    throw new Error("Invalid message data");
                }
                const message = yield this._messageRepo.createMessage({
                    chatId: new mongoose_1.default.Types.ObjectId(chatId),
                    sender: new mongoose_1.default.Types.ObjectId(senderId),
                    content,
                    type,
                    timestamp: new Date(),
                    read: false,
                });
                const updateChat = yield this._chatRepo.updateById(chatId, { lastMessage: {
                        content,
                    } });
                return message;
            }
            catch (error) {
                console.error("Error creating message:", error);
                throw error;
            }
        });
    }
    getMessagesByChatId(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._messageRepo.getMessagesByChatId(chatId);
                return (0, chatService_mapper_1.mapMessagesClean)(result);
            }
            catch (error) {
                console.error("Error fetching messages:", error);
                throw error;
            }
        });
    }
    getUserChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._chatRepo.getChatsByUser(userId);
                console.log("result getUserChat : ", result);
                return result;
            }
            catch (error) {
                console.error("Error fetching user chats:", error);
                throw error;
            }
        });
    }
    markMessagesAsRead(chatId, readerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._messageRepo.markAsRead(chatId, readerId);
            }
            catch (error) {
                console.error("Error marking messages as read:", error);
                throw error;
            }
        });
    }
    getReadMessages(chatId, readerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._messageRepo.getReadMessages(chatId, readerId);
                return (0, chatService_mapper_1.mapMessagesClean)(result);
            }
            catch (error) {
                console.error("Error fetching read messages:", error);
                throw error;
            }
        });
    }
}
exports.ChatService = ChatService;
