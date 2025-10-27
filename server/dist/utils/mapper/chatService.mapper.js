"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToChatDTO = mapToChatDTO;
exports.mapMessagesClean = mapMessagesClean;
function mapToChatDTO(chat) {
    var _a, _b;
    return {
        _id: chat._id.toString(),
        appointmentId: chat.appointmentId.toString(),
        doctorId: chat.doctorId.toString(),
        userId: chat.userId.toString(),
        participants: chat.participants.map(p => p.toString()),
        isActive: chat.isActive,
        createdAt: chat.createdAt,
        lastMessage: {
            content: (_a = chat.lastMessage) === null || _a === void 0 ? void 0 : _a.content,
            timestamp: (_b = chat.lastMessage) === null || _b === void 0 ? void 0 : _b.timestamp,
        }
    };
}
function mapMessagesClean(messages) {
    return messages.map(msg => ({
        _id: msg._id.toString(),
        chatId: msg.chatId.toString(),
        sender: msg.sender.toString(),
        type: msg.type,
        content: msg.content,
        read: msg.read,
        timestamp: msg.timestamp
    }));
}
