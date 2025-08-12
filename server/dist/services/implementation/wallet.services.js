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
                return {
                    userId: wallet.userId,
                    role,
                    balance: wallet.balance,
                    history: walletHistory,
                    page,
                    totalPages: Math.ceil(totalCount / limit),
                    totalTransactions: totalCount
                };
            }
            catch (error) {
                throw error instanceof Error ? error : new Error("Failed to fetch wallet");
            }
        });
    }
    makeWalletPayment(userId, appointmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            try {
                const walletUser = yield this._walletRepo.findOne({ userId });
                if (!walletUser) {
                    throw new Error("Wallet not found or balance is zero");
                }
                const appointment = yield this._appointmentRepo.findById(appointmentId);
                if (!appointment) {
                    throw new Error("No appointment Found");
                }
                let walletDoctor = yield this._walletRepo.findOne({ userId: appointment.doctorId });
                const doctorIdRaw = typeof appointment.doctorId === "string"
                    ? appointment.doctorId
                    : (_b = (_a = appointment.doctorId._id) === null || _a === void 0 ? void 0 : _a.toString) === null || _b === void 0 ? void 0 : _b.call(_a);
                if (!doctorIdRaw) {
                    throw new Error("Invalid doctorId");
                }
                if (!walletDoctor) {
                    walletDoctor = yield this._walletRepo.create({
                        userId: new mongoose_1.default.Types.ObjectId(doctorIdRaw),
                        role: "doctor",
                    });
                    if (!walletDoctor) {
                        throw new Error("Failed to create Doctor wallet");
                    }
                }
                if (appointment.fee && walletUser.balance < (appointment === null || appointment === void 0 ? void 0 : appointment.fee)) {
                    throw new Error("Wallet don't have  sufficient Balance");
                }
                const updateAppointment = yield this._appointmentRepo.updateById(appointmentId, { status: "confirmed", payment: "paid" });
                if (!updateAppointment) {
                    throw new Error("Failed to update appointment");
                }
                const walletHistoryUser = yield this._walletHistoryRepo.create({
                    walletId: walletUser === null || walletUser === void 0 ? void 0 : walletUser._id,
                    appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                    amount: appointment === null || appointment === void 0 ? void 0 : appointment.fee,
                    type: "debit",
                    source: "consultation",
                    transactionId: appointment === null || appointment === void 0 ? void 0 : appointment.transactionId,
                });
                if (!walletHistoryUser) {
                    throw new Error("failed to create Wallet History");
                }
                const DoctorId = new mongoose_1.default.Types.ObjectId(typeof appointment.doctorId === "string" ? appointment.doctorId : appointment.doctorId._id);
                const createPayment = yield this._paymentRepo.create({
                    appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                    doctorId: DoctorId,
                    userId: appointment.userId,
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
                    const amount = Math.floor(appointment.fee - (appointment.fee / 10));
                    const walletHistoryDoctor = yield this._walletHistoryRepo.create({
                        walletId: walletDoctor === null || walletDoctor === void 0 ? void 0 : walletDoctor._id,
                        appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                        amount: amount,
                        type: "credit",
                        source: "consultation",
                        transactionId: appointment === null || appointment === void 0 ? void 0 : appointment.transactionId,
                    });
                    if (!walletHistoryDoctor) {
                        throw new Error("failed to create Wallet History");
                    }
                }
                if (walletDoctor._id && (appointment === null || appointment === void 0 ? void 0 : appointment.fee)) {
                    const amount = Math.floor(appointment.fee - (appointment.fee / 10));
                    yield this._walletRepo.updateById(walletDoctor === null || walletDoctor === void 0 ? void 0 : walletDoctor._id, { $inc: { balance: amount } });
                }
                let updatedWallet = null;
                if (walletUser._id && (appointment === null || appointment === void 0 ? void 0 : appointment.fee)) {
                    updatedWallet = yield this._walletRepo.updateById(walletUser === null || walletUser === void 0 ? void 0 : walletUser._id, { $inc: { balance: -appointment.fee } });
                }
                const existing = yield this._chatRepo.findByAppointmentId(appointmentId);
                if (!existing) {
                    const chat = yield this._chatRepo.createChat({
                        appointmentId: new mongoose_1.default.Types.ObjectId(appointmentId),
                        participants: [new mongoose_1.default.Types.ObjectId(appointment.userId), new mongoose_1.default.Types.ObjectId((_c = appointment.doctorId._id) !== null && _c !== void 0 ? _c : appointment.doctorId)],
                        isActive: true,
                        doctorId: new mongoose_1.default.Types.ObjectId((_d = appointment.doctorId._id) !== null && _d !== void 0 ? _d : appointment.doctorId),
                        userId: new mongoose_1.default.Types.ObjectId(appointment.userId),
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
