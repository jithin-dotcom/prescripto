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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const statusCode_enum_1 = require("../../constants/statusCode.enum");
const statusMessage_1 = require("../../constants/statusMessage");
class ChatController {
    constructor(_chatService) {
        this._chatService = _chatService;
    }
    getChatMessages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { appointmentId } = req.params;
                const chat = yield this._chatService.getChatByAppointmentId(appointmentId);
                if (!chat) {
                    res.status(statusCode_enum_1.StatusCode.NOT_FOUND).json({ message: "Chat not found in controller" });
                    return;
                }
                const messages = yield this._chatService.getMessagesByChatId(chat._id.toString());
                res.status(statusCode_enum_1.StatusCode.OK).json({ chatId: chat._id, messages });
            }
            catch (err) {
                console.error("Error fetching chat messages:", err);
                res.status(500).json({ message: statusMessage_1.StatusMessage.INTERNAL_SERVER_ERROR });
            }
        });
    }
    ;
    getUserChats(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                console.log("entered into getUserChat controller");
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                console.log("user Id : ", userId);
                if (!userId) {
                    res.status(statusCode_enum_1.StatusCode.UNAUTHORIZED).json({ message: statusMessage_1.StatusMessage.UNAUTHORIZED });
                    return;
                }
                const chats = yield this._chatService.getUserChats(userId);
                res.status(statusCode_enum_1.StatusCode.OK).json({ chats });
            }
            catch (error) {
                console.error("Error getting chats:", error);
                res.status(statusCode_enum_1.StatusCode.INTERNAL_SERVER_ERROR).json({ message: statusMessage_1.StatusMessage.INTERNAL_SERVER_ERROR });
            }
        });
    }
    ;
}
exports.ChatController = ChatController;
