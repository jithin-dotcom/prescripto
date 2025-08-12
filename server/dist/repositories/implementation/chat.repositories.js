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
exports.ChatRepository = void 0;
const chat_models_1 = require("../../models/chat/chat.models");
const base_repositories_1 = require("./base.repositories");
class ChatRepository extends base_repositories_1.BaseRepository {
    constructor() {
        super(chat_models_1.Chat);
    }
    findByAppointmentId(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ appointmentId });
        });
    }
    findByDoctorId(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ doctorId });
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOne({ userId });
        });
    }
    createChat(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(data);
        });
    }
    deactivateChat(appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOneAndUpdate({ appointmentId }, { isActive: false });
        });
    }
    getChatsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find({ participants: userId })
                .populate("appointmentId")
                .populate("userId", "name photo")
                .populate("doctorId", "name photo")
                .sort({ "lastMessage.timestamp": -1 });
        });
    }
}
exports.ChatRepository = ChatRepository;
