"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapWalletToEntity = exports.mapWalletToDTO = exports.toCallLogEntity = exports.toCallLogDTO = void 0;
exports.mapToWalletHistoryEntity = mapToWalletHistoryEntity;
const mongoose_1 = __importDefault(require("mongoose"));
const toCallLogDTO = (log) => ({
    doctorId: log.doctorId,
    patientId: log.patientId,
    appointmentId: log.appointmentId,
    startTime: log.startTime,
    endTime: log.endTime,
    duration: log.duration,
    callType: log.callType,
    callStatus: log.callStatus,
});
exports.toCallLogDTO = toCallLogDTO;
const toCallLogEntity = (dto) => ({
    doctorId: dto.doctorId,
    patientId: dto.patientId,
    appointmentId: dto.appointmentId,
    startTime: dto.startTime,
    endTime: dto.endTime,
    duration: dto.duration,
    callType: dto.callType,
    callStatus: dto.callStatus,
});
exports.toCallLogEntity = toCallLogEntity;
const mapWalletToDTO = (wallet) => ({
    id: wallet._id.toString(),
    userId: wallet.userId,
    role: wallet.role,
    balance: wallet.balance,
    expense: wallet.expense,
    createdAt: wallet.createdAt,
    updatedAt: wallet.updatedAt,
});
exports.mapWalletToDTO = mapWalletToDTO;
const mapWalletToEntity = (dto) => {
    var _a;
    return ({
        userId: dto.userId,
        role: dto.role,
        balance: (_a = dto.balance) !== null && _a !== void 0 ? _a : 0,
        expense: dto.expense,
    });
};
exports.mapWalletToEntity = mapWalletToEntity;
function mapToWalletHistoryEntity(input, amount, transactionId) {
    return {
        walletId: new mongoose_1.default.Types.ObjectId(input.walletId),
        appointmentId: new mongoose_1.default.Types.ObjectId(input.appointmentId),
        transactionId,
        amount,
        type: "credit",
        source: "consultation",
        status: "success",
    };
}
