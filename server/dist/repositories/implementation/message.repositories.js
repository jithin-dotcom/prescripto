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
exports.MessageRepository = void 0;
const message_models_1 = require("../../models/message/message.models");
const base_repositories_1 = require("./base.repositories");
class MessageRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(message_models_1.Message);
    }
    createMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(data);
        });
    }
    getMessagesByChatId(chatId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ chatId }).sort({ timestamp: 1 });
        });
    }
    markAsRead(chatId, readerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.updateMany({ chatId, read: false, sender: { $ne: readerId } }, { read: true });
        });
    }
    getReadMessages(chatId, readerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ chatId, sender: { $ne: readerId }, read: true });
        });
    }
}
exports.MessageRepository = MessageRepository;
