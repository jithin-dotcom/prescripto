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
exports.WalletService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const walletService_mapper_1 = require("../../utils/mapper/walletService.mapper");
class WalletService {
    constructor(_walletRepo, _walletHistoryRepo, _appointmentRepo, _chatRepo, _paymentRepo) {
        this._walletRepo = _walletRepo;
        this._walletHistoryRepo = _walletHistoryRepo;
        this._appointmentRepo = _appointmentRepo;
        this._chatRepo = _chatRepo;
        this._paymentRepo = _paymentRepo;
    }
    getWallet(userId, role, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let wallet = yield this._walletRepo.findOne({ userId });
                if (!wallet) {
                    wallet = yield this._walletRepo.create({
                        userId: new mongoose_1.default.Types.ObjectId(userId),
                        role,
                        balance: 0,
                    });
                }
                if (!wallet) {
                    throw new Error("Failed to create Wallet");
                }
                const walletId = wallet._id;
                const [walletHistory, totalCount] = yield this._walletHistoryRepo.findPaginated(walletId, page, limit);
                return (0, walletService_mapper_1.mapWalletDTO)(wallet, walletHistory, page, limit, totalCount);
            }
            catch (error) {
                throw error instanceof Error ? error : new Error("Failed to fetch wallet");
            }
        });
    }
    makeWalletPayment(userId, appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const walletUser = yield this._walletRepo.findOne({ userId });
                if (!walletUser) {
                    throw new Error("Wallet not found or balance is zero");
                }
                const appointment = yield this._appointmentRepo.findById(appointmentId);
                if (!appointment) {
                    throw new Error("No appointment Found");
                }
                const doctorId = appointment.doctorId instanceof mongoose_1.default.Types.ObjectId
                    ? appointment.doctorId
                    : new mongoose_1.default.Types.ObjectId((_a = appointment.doctorId._id) !== null && _a !== void 0 ? _a : appointment.doctorId);
                const patientId = appointment.userId instanceof mongoose_1.default.Types.ObjectId
                    ? appointment.userId
                    : new mongoose_1.default.Types.ObjectId((_b = appointment.userId._id) !== null && _b !== void 0 ? _b : appointment.userId);
                let walletDoctor = yield this._walletRepo.findOne({ userId: doctorId });
                if (!walletDoctor) {
                    walletDoctor = yield this._walletRepo.create({
                        userId: doctorId,
                        role: "doctor",
                    });
                    if (!walletDoctor) {
                        throw new Error("Failed to create Doctor wallet");
                    }
                }
                if (appointment.fee && walletUser.balance < appointment.fee) {
                    throw new Error("Wallet doesn't have sufficient Balance");
                }
                const updateAppointment = yield this._appointmentRepo.updateById(appointmentId, {
                    status: "confirmed",
                    payment: "paid",
                    method: "wallet",
                });
                if (!updateAppointment) {
                    throw new Error("Failed to update appointment");
                }
                const walletHistoryUser = yield this._walletHistoryRepo.create({
                    walletId: walletUser._id,
                    appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                    amount: appointment.fee,
                    type: "debit",
                    source: "consultation",
                    transactionId: appointment === null || appointment === void 0 ? void 0 : appointment.transactionId,
                });
                if (!walletHistoryUser) {
                    throw new Error("failed to create Wallet History for user");
                }
                const createPayment = yield this._paymentRepo.create({
                    appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                    doctorId,
                    userId: patientId,
                    amount: appointment.fee,
                    currency: "INR",
                    status: "paid",
                    paymentMethod: "wallet",
                    razorpayOrderId: Math.floor(100000 + Math.random() * 900000).toString(),
                });
                if (!createPayment) {
                    throw new Error("Failed to create Payment");
                }
                if (appointment.fee) {
                    const amount = Math.floor(appointment.fee - appointment.fee / 10);
                    const walletHistoryDoctor = yield this._walletHistoryRepo.create({
                        walletId: walletDoctor._id,
                        appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                        amount,
                        type: "credit",
                        source: "consultation",
                        transactionId: appointment === null || appointment === void 0 ? void 0 : appointment.transactionId,
                    });
                    if (!walletHistoryDoctor) {
                        throw new Error("failed to create Wallet History for doctor");
                    }
                    yield this._walletRepo.updateById(walletDoctor._id, {
                        $inc: { balance: amount },
                    });
                }
                if (walletUser._id && (appointment === null || appointment === void 0 ? void 0 : appointment.fee)) {
                    yield this._walletRepo.updateById(walletUser._id, {
                        $inc: { balance: -appointment.fee, expense: appointment.fee },
                    });
                }
                const existing = yield this._chatRepo.findByAppointmentId(appointmentId);
                if (!existing) {
                    yield this._chatRepo.createChat({
                        appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                        participants: [patientId, doctorId],
                        isActive: true,
                        doctorId,
                        userId: patientId,
                    });
                }
                return { message: "Wallet Payment made successfully" };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw error;
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        });
    }
}
exports.WalletService = WalletService;
